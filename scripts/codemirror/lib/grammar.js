var editor;

function codemirror_grammar_demo(code, theme)
{

    var main_lang, main_mode;
    var lang = "assmbly", grammar = js_grammar, Mode;
    
    // 2. parse the grammar into a Codemirror syntax-highlight mode
    Mode = CodeMirrorGrammar.getMode( grammar );
    Mode.name = lang;
    
    // 3. register the mode with Codemirror
    CodeMirror.defineMode(lang, Mode);
    // main mode
    main_lang = lang; main_mode = Mode;
        
    main_mode.supportGrammarAnnotations = true;
    main_mode.supportCodeFolding = true;
    main_mode.supportCodeMatching = true;
    main_mode.supportAutoCompletion = true;
    main_mode.autocompleter.options =  {prefixMatch:true, caseInsensitiveMatch:false, inContext:true, dynamic:true};
        
    CodeMirror.registerHelper("lint", main_lang, main_mode.linter);
    CodeMirror.registerHelper("fold", main_mode.foldType, main_mode.folder);
        
    CodeMirror.defineOption(main_mode.matchType, false, function( cm, val, old ) {
        if ( old && old != CodeMirror.Init )
        {
            cm.off( "cursorActivity", main_mode.matcher );
            main_mode.matcher.clear( cm );
        }
        if ( val )
        {
            cm.on( "cursorActivity", main_mode.matcher );
            main_mode.matcher( cm );
        }
        });
    
    // use it!
    /*
    var autocomplete_cmd = 'autocomplete_grammar_'+main_lang, togglecomment_cmd = 'togglecomment_grammar_'+main_lang;
    CodeMirror.commands[autocomplete_cmd] = function( cm ) {
        CodeMirror.showHint(cm, main_mode.autocompleter);
    };*/
    /*CodeMirror.commands[togglecomment_cmd] = function( cm ) {
        cm.toggleComment( main_mode.options() )
    };*/
    var opts = {
        mode: main_lang,
        lineNumbers: true,
        theme: theme,
        indentUnit: 4,
        indentWithTabs: false,
        extraKeys: {"Ctrl-Space": "autocomplete"},
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        foldGutter: true,
        // enable syntax validation
        lint: true
    };
    // enable code matching
    opts[main_mode.matchType] = true;
    
    editor = CodeMirror.fromTextArea(code, opts);
    
    //editor.setSize(null, 500);
    return editor;
}


