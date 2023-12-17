// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
      mod(require("../../lib/codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
      define(["../../lib/codemirror"], mod);
    else // Plain browser env
      mod(CodeMirror);
  })(function(CodeMirror) {
    "use strict";
  
    function wordRegexp(words) {
      return new RegExp("^((" + words.join(")|(") + "))\\b", "i");
    }
  
    var commonKeywords = ["a", "ab", "acc", "b", "psw", "ip", "ie", "pcon", "dph", "dpl", "dptr", "sp", "th0", "tl0",
                        "tmod", "tcon", "c", "th1", "tl1", "scon", "sbuf", "tr0", "tr1", "tf0", "tf1", "\\b(?:P[0-3][.][0-7])\\b", "\\b(?:P[0-3])\\b"];
    var commonBuiltins = ["acall", "add", "addc", "ajmp", "anl", "cjne", "clr", "cpl", "da",
                        "dec", "div", "djnz", "inc", "jb", "jbc", "jc", "jmp", "jnb", "jnc", "jnz",
                        "jz", "lcall", "ljmp", "mov", "movc", "movx", "mul", "nop", "orl",
                        "pop", "push", "ret", "reti", "rl", "rlc", "rr", "rrc", "setb", "sjmp",
                        "subb", "swap", "xch", "xchd", "xrl", "call"];
    //CodeMirror.registerHelper("hintWords", "python", commonKeywords.concat(commonBuiltins));
  
    function top(state) {
      return state.scopes[state.scopes.length - 1];
    }
  
    CodeMirror.defineMode("python", function(conf, parserConf) {
        var ERRORCLASS = "error";
    
    
        var hangingIndent = conf.indentUnit;
    
        
        var identifiers = /^[_A-Za-z][_A-Za-z0-9]*/;
        
        var keywords = wordRegexp(commonKeywords);
        var builtins = wordRegexp(commonBuiltins);
        var numbers = /#(?:(?:[0-9]+)|(?:[0-1]+b)|(?:[0-9a-f]+h))\b/i;
        var operators = /\b(?:(?:[0-9]+)|(?:[0-9a-f]+h)|(?:[01]+b))\b/i;
    
        // tokenizers
        function tokenBase(stream, state) {
            var sol = stream.sol() && state.lastToken != "\\"
            if (sol) state.indent = stream.indentation()
            return tokenBaseInner(stream, state);
        }
  
        function tokenBaseInner(stream, state, inFormat) {
            if (!inFormat && stream.match(/^;.*/)) return "comment";
            
            //Value numbers
            if (stream.match(numbers)) {
                stream.eat(/J/i);
                return "number";
            } 
            
            //Operators
            if (stream.match(operators) || stream.match("operator")) 
                return "operator";

            //Keyword
            if (stream.match(keywords) || stream.match("keyword"))
                return "keyword";

            //Buildin
            if (stream.match(builtins) || stream.match(/(\bR[0-7]\b)|(?:@R[0-1])|(?:@DPTR)/i) || stream.match("builtin"))
                return "builtin";

            //Variable-2
            
            //Variable
            
            if (stream.match(identifiers))
                return "variable";
            //Punctuation
            stream.next();
            //return "operator";
        }
        
      function pushPyScope(state) {
        while (top(state).type != "py") state.scopes.pop()
        state.scopes.push({offset: top(state).offset + conf.indentUnit,
                           type: "py",
                           align: null})
      }
  
      function pushBracketScope(stream, state, type) {
        var align = stream.match(/^([\s\[\{\(]|#.*)*$/, false) ? null : stream.column() + 1
        state.scopes.push({offset: state.indent + hangingIndent,
                           type: type,
                           align: align})
      }
      
      /*
      function dedent(stream, state) {
        var indented = stream.indentation();
        while (state.scopes.length > 1 && top(state).offset > indented) {
          if (top(state).type != "py") return true;
          state.scopes.pop();
        }
        return top(state).offset != indented;
      }*/
  
      function tokenLexer(stream, state) {
        if (stream.sol()) state.beginningOfLine = true;
  
        var style = state.tokenize(stream, state);
        var current = stream.current();
  
        // Handle decorators
        /*if (state.beginningOfLine && current == "@")
          return stream.match(identifiers, false) ? "meta" : py3 ? "operator" : ERRORCLASS;*/
  
        if (/\S/.test(current)) state.beginningOfLine = false;
  
        if ((style == "variable" || style == "builtin")
            && state.lastToken == "meta")
          style = "meta";
  
        // Handle scope changes.
        if (current == "pass" || current == "return")
          state.dedent += 1;
  
        if (current == "lambda") state.lambda = true;
        if (current == ":" && !state.lambda && top(state).type == "py")
          pushPyScope(state);
  
        if (current.length == 1 && !/string|comment/.test(style)) {
          var delimiter_index = "[({".indexOf(current);
          if (delimiter_index != -1)
            pushBracketScope(stream, state, "])}".slice(delimiter_index, delimiter_index+1));
  
          delimiter_index = "])}".indexOf(current);
          if (delimiter_index != -1) {
            if (top(state).type == current) state.indent = state.scopes.pop().offset - hangingIndent
            else return ERRORCLASS;
          }
        }
        if (state.dedent > 0 && stream.eol() && top(state).type == "py") {
          if (state.scopes.length > 1) state.scopes.pop();
          state.dedent -= 1;
        }
  
        return style;
      }
  
      var external = {
        startState: function(basecolumn) {
          return {
            tokenize: tokenBase,
            scopes: [{offset: basecolumn || 0, type: "py", align: null}],
            indent: basecolumn || 0,
            lastToken: null,
            lambda: false,
            dedent: 0
          };
        },
  
        token: function(stream, state) {
          var addErr = state.errorToken;
          if (addErr) state.errorToken = false;
          var style = tokenLexer(stream, state);
  
          if (style && style != "comment")
            state.lastToken = (style == "keyword" || style == "punctuation") ? stream.current() : style;
          if (style == "punctuation") style = null;
  
          if (stream.eol() && state.lambda)
            state.lambda = false;
          return addErr ? style + " " + ERRORCLASS : style;
        },
  
        indent: function(state, textAfter) {
          if (state.tokenize != tokenBase)
            return state.tokenize.isString ? CodeMirror.Pass : 0;
  
          var scope = top(state), closing = scope.type == textAfter.charAt(0)
          if (scope.align != null)
            return scope.align - (closing ? 1 : 0)
          else
            return scope.offset - (closing ? hangingIndent : 0)
        },
  
        //electricInput: /^\s*[\}\]\)]$/,
        //closeBrackets: {triples: "'\""},
        lineComment: ";",
        fold: "indent"
      };
      return external;
    });
    
    /*
    CodeMirror.defineMIME("text/x-python", "python");
  
    var words = function(str) { return str.split(" "); };
  
    CodeMirror.defineMIME("text/x-cython", {
      name: "python",
      extra_keywords: words("by cdef cimport cpdef ctypedef enum except "+
                            "extern gil include nogil property public "+
                            "readonly struct union DEF IF ELIF ELSE")
    });
    */
  });