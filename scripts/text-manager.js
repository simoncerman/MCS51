let codeText;

function normalizeCode(){
    removeComments();
    removeSpaces();
}

function removeComments(){
    codeText = codeText.replace(/(?:;.*$)/gmi, "");
}

function removeSpaces(){
    codeText = codeText.replace(/(?:^[ \t]*)|(?:(?<=\S+)\s*?(?<=$))/gmi, "")
    codeText = codeText.replace(/(?<=^\s*\w{1,5})(?:[ \t])+(?=(?:\w|@|#|[/]))/gmi, " "); //codeText = codeText.replace(/(?<=^\s*\w{1,5})\s+(?=(?:\w|@|#|[/]))/gmi, " "); //První mezera
    codeText = codeText.replace(/(?<=,)\s*(?=(?:\w|@|#|[/]))/gmi, " "); //Ostatní mezery
    codeText = codeText.replace(/\s*(?=,)/gmi, "");
}

function getCodeText(){
    codeText = getEditorText();
}

function getFirstOperand(instruction) {
    try {
        return instruction.match(/(?<=^\s*\w{2,5}\s+)(?:.*?)(?=(?:,|$))/gmi)[0];
    }
    catch {}
}

function getSecondOperand(instruction) {
    try {
        return instruction.match(/(?<=^\s*\w{2,5}\s+[^\s]+?[\t\f\v ]+)(?:[^\s]*?)(?=(?:,|$))/gmi)[0];
    }
    catch {}
}

function getThirdOperand(instruction) {
    try {
        return instruction.match(/(?<=^\s*\w{2,5}\s+[^\s]+?[\t\f\v ]+[^\s]+?[\t\f\v ]+)(?:[^\s]*?)(?=(?:,|$))/gmi)[0];
    }
    catch {}
}

function ifEmptyLine(line){
    let reg = new RegExp(/^\s*$/, "gmi");
    return reg.test(line);
}

function ifIsLabel(line){
    let reg = new RegExp(/\b[a-z]{1}\w*(?=:$)/, "gmi")
    return reg.test(line);
}

function replaceSpecialAddresses(){
    codeText = codeText.replace(/\bacc\b/gmi, "E0h");
    codeText = codeText.replace(/\bb\b/gmi, "F0h");
    codeText = codeText.replace(/\bpsw\b/gmi, "D0h");
    codeText = codeText.replace(/\bdph\b/gmi, "83h");
    codeText = codeText.replace(/\bdpl\b/gmi, "82h");
    codeText = codeText.replace(/\bsp\b/gmi, "81h");
    codeText = codeText.replace(/\bP0\b(?![.])/gmi, "80h");
    codeText = codeText.replace(/\bP1\b(?![.])/gmi, "90h");
    codeText = codeText.replace(/\bP2\b(?![.])/gmi, "A0h");
    codeText = codeText.replace(/\bP3\b(?![.])/gmi, "B0h");
    codeText = codeText.replace(/\bpcon\b/gmi, "87h");
    codeText = codeText.replace(/\bscon\b/gmi, "98h");
    codeText = codeText.replace(/\btcon\b/gmi, "88h");
    codeText = codeText.replace(/\btmod\b/gmi, "89h");
    codeText = codeText.replace(/\bie\b/gmi, "A8h");
    codeText = codeText.replace(/\bip\b/gmi, "B8h");
    codeText = codeText.replace(/\bsbuf\b/gmi, "99h");
    codeText = codeText.replace(/\bth0\b/gmi, "8Ch");
    codeText = codeText.replace(/\bth1\b/gmi, "8Dh");
    codeText = codeText.replace(/\btl0\b/gmi, "8Ah");
    codeText = codeText.replace(/\btl1\b/gmi, "8Bh");
}

function removeLabels(){
    codeText = codeText.replace(/$\s*\b[a-z]{1}\w*:/gmi, "");
}

function removeEmptyLines(){
    codeText = codeText.replace(/^(?:[\t ]*(?:\r?\n|\r))*/gmi, "");
}