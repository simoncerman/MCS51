function changeEditorFontSize(size) {
    let sizeString = size.toString() + "px";
	document.getElementsByClassName("CodeMirror")[0].style.fontSize = sizeString;
	editor.refresh();
}

function changeEditorFontFamily(fontFamily) {
	$(".CodeMirror pre").css("font-family", fontFamily);
	editor.refresh();
}

function changeEditorTheme(theme){
	editor.setOption("theme", theme);
	getGutterColors();
	editor.refresh();
}

function getLineCount(){
	return editor.lineCount();
}

function getEditorText(){
	return editor.getValue();
}

function setEditorText(content){
	editor.getDoc().setValue(content);
}

function clearEditorText(){
	editor.getDoc().setValue("");
	editor.getDoc().clearHistory();
}

function doEditorUndo(){
	editor.undo();
}

function doEditorRedo(){
	editor.redo();
}

function doEditorSelectAll(){
	editor.execCommand('selectAll');
}

function pI(value){
	return parseInt(value);
}

function doEditorTextSave(){
	$('#saveFile').attr('href', 'data:application/xml;charset=utf-8,' + encodeURIComponent(getEditorText()));
	console.log(getEditorText());
	document.getElementById('saveFile').click();
}

function doEditorTextOpen(path){
	var rawFile = new XMLHttpRequest();
    rawFile.open("GET", path, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
				setEditorText(allText);
            }
        }
    }
    rawFile.send(null);
}
