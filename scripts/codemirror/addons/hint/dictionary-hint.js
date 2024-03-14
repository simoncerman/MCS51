var dictionary = [
    "ACALL", "ADD", "ADDC", "AJMP", "ANL",
    "CJNE", "CLR", "CPL", "CALL",
    "DA", "DEC", "DIV", "DJNZ",
    "INC",
    "JB", "JBC", "JC", "JMP", "JNB", "JNC", "JNZ", "JZ",
    "LCALL", "LJMP",
    "MOV", "MOVC", "MOVX", "MUL",
    "NOP",
    "ORL",
    "POP", "PUSH",
    "RET", "RETI", "RL", "RLC", "RR", "RRC",
    "SETB", "SJMP", "SUBB", "SWAP",
    "XCH", "XCHD", "XRL",
    "ORG", "END"
];

// Register our custom Codemirror hint plugin.
CodeMirror.registerHelper('hint', 'dictionaryHint', function (editor) {
    var cur = editor.getCursor();
    var curLine = editor.getLine(cur.line);
    var start = cur.ch;
    var end = start;
    while (end < curLine.length && /[\w$]/.test(curLine.charAt(end))) ++end;
    while (start && /[\w$]/.test(curLine.charAt(start - 1))) --start;
    var curWord = start !== end && curLine.slice(start, end);
    var regex = new RegExp('^' + curWord, 'i');
    return {
        list: (!curWord ? [] : dictionary.filter(function (item) {
            return item.match(regex);
        })).sort(),
        from: CodeMirror.Pos(cur.line, start),
        to: CodeMirror.Pos(cur.line, end)
    }
});

CodeMirror.commands.autocomplete = function (cm) {
    CodeMirror.showHint(cm, CodeMirror.hint.dictionaryHint);
};