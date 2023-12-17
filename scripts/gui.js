$(document).ready(function () {

	//Adresová tabulka
	generateAddrTable();
    
	//Speciální registry
	generateSpecRegTable();
	
	//R registry
	generateRTable();

	//P registry
	generatePTable();

	updateTableData();

	fillUpSpecials();

	$("input:not(#gotoInput)" ).change(function() {
		recognizeAndUpdateDataFromInput(this);
	});
});

let gutterFontColor;
let gutterBackColor;


function updateTableData(){
	let dataArray;
	let startAddr = parseInt(document.getElementsByClassName("tableTitle")[17].innerText, 16);
	if (getIndexOfSelectedTable() == 0){
		startAddr = 0;
		dataArray = data;
		$(".scrollBtn").prop('disabled', true);
		for (let i = 0; i < 8; i++) {
			document.getElementsByClassName("tableTitle")[17 + i].innerText = i.toString(16).padStart(3, '0').toUpperCase() + "0";
		}
	}
	else if (getIndexOfSelectedTable() == 1){
		dataArray = prog;
		$(".scrollBtn").prop('disabled', false);
	}
	else {
		dataArray = ext;
		$(".scrollBtn").prop('disabled', false);
	}
	for (let i = 0; i < 0x80; i++) {
		$("#" + i).text(dataArray[i + startAddr].toString(16).padStart(2, '0').toUpperCase());
	}
}

function getIndexOfSelectedTable() {
	switch("30px"){
		case $('#dataTab').css('height'):
			return 0;
		case $('#codeTab').css('height'):
			return 1;
		case $('#extTab').css('height'):
			return 2;
	}
}

function generateAddrTable(){
	let dataElem = $('#dataTable');
    let tableWidth = 17;
    let tableHeight = 9;
	let ids = 0;
	let index = 0;
	let titles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "0000", "0010", "0020", "0030", "0040", "0050", "0060", "0070"];
    for (let i = 0; i < tableHeight; i++) {
		let tr = document.createElement("tr");
		dataElem.append(tr);

		for (let j = 0; j < tableWidth; j++) {
			let td = document.createElement("td");
			if(j == 0 || i == 0) {
				td.classList.add("tableTitle");
				if (!(j == 0 && i == 0)){
					td.textContent = titles[index];
					index++;
				}
			}
			else{
				td.id = ids.toString();
				ids++;
			}
			
			tr.appendChild(td)
		}
	};

	$(".tableTabBtn").on('click', function(event){
		event.stopPropagation();
		event.stopImmediatePropagation();
		$(".tableTabBtn").css("background-color", "#919191");
		$(".tableTabBtn").css("height","25px");
		$(".tableTabBtn").css("font-size","20px");
		this.style.backgroundColor = "#303030"
		this.style.height = "30px";
		this.style.fontSize = "20px";
		updateTableData();
	});
	$(".tableTabBtn")[0].click();
}

function scrollTableTo(address){
	addressText = address.toString(16);
	addressText = addressText.substring(0, addressText.length - 1) + "0";
	address = parseInt(addressText, 16);
	let actualAddress = Math.max(0x0, Math.min(0xff80, address));
	for (let i = 0; i < 8; i++) {
		document.getElementsByClassName('tableTitle')[i + 17].innerHTML = (actualAddress + (i * 0x10)).toString(16).padStart(4, '0').toUpperCase();
	}
	updateTableData();
}

function generateSpecRegTable(){
	let regArray = ["B", "ACC", "PSW", "IP", "IE", "PCON", "DPH", "DPL", "SP"];
	let parent = $(".specContainer");
	for (let i = 0; i < regArray.length; i++) {
		parent.append("<div class='regItem'>" + regArray[i] + "<input title='0x" + eval(regArray[i]).toString(16).padStart(2, '0').toUpperCase() + "' type='text' id='" + regArray[i].toLowerCase() + "' size='3'></div>");
	}
}

function generateRTable(){
	let parent = $(".rContainer");
	for (let i = 7; i >= 0; i--) {
		parent.append("<div class='regItem'>R" + i + "<input title='0x" + eval("R" + i).toString(16).padStart(2, '0').toUpperCase() + "' type='text' id='r" + i + "' size='3'></div>");
	}
}

function generatePTable(){
	
	let parent = $(".pContainer");
	for (let i = 3; i >= 0; i--) {
		let container = document.createElement('div');
		container.style.display = "flex";
		container.style.flexDirection = "row";

		let input1 = document.createElement('input');
		input1.type = 'text';
		input1.id = 'b' + i;
		input1.size = '3';
		input1.disabled = true;

		let input2 = document.createElement('input');
		input2.type = 'text';
		input2.id = 'p' + i;
		input2.size = '3';
		input2.title = "0x" + eval("P" + i).toString(16).padStart(2, '0').toUpperCase();
		
		container.append("P" + i);
		container.append(input1);
		container.append(input2);

		parent.append(container);
	}
}

function fillUpSpecials(){
	$("#b").val('0x' + data[B].toString(16).padStart(2, '0').toUpperCase());
	$("#acc").val('0x' + data[ACC].toString(16).padStart(2, '0').toUpperCase());
	$("#psw").val('0x' + data[PSW].toString(16).padStart(2, '0').toUpperCase());
	$("#ip").val('0x' + data[IP].toString(16).padStart(2, '0').toUpperCase());
	$("#ie").val('0x' + data[IE].toString(16).padStart(2, '0').toUpperCase());
	$("#pcon").val('0x' + data[PCON].toString(16).padStart(2, '0').toUpperCase());
	$("#dph").val('0x' + data[DPH].toString(16).padStart(2, '0').toUpperCase());
	$("#dpl").val('0x' + data[DPL].toString(16).padStart(2, '0').toUpperCase());
	$("#sp").val('0x' + data[SP].toString(16).padStart(2, '0').toUpperCase());

	for (let i = 0; i < 8; i++) {
		$("#r" + i).val('0x' + data[i].toString(16).padStart(2, '0').toUpperCase());
	}

	$("#tcon").val('0x' + data[TCON].toString(16).padStart(2, '0').toUpperCase());
	$("#tmod").val('0x' + data[TMOD].toString(16).padStart(2, '0').toUpperCase());

	$("#tl0").val('0x' + data[TL0].toString(16).padStart(2, '0').toUpperCase());
	$("#th0").val('0x' + data[TH0].toString(16).padStart(2, '0').toUpperCase());
	$("#tl1").val('0x' + data[TL1].toString(16).padStart(2, '0').toUpperCase());
	$("#th1").val('0x' + data[TH1].toString(16).padStart(2, '0').toUpperCase());

	$("#scon").val('0x' + data[SCON].toString(16).padStart(2, '0').toUpperCase());

	$("#p0").val('0x' + data[P0].toString(16).padStart(2, '0').toUpperCase());
	$("#p1").val('0x' + data[P1].toString(16).padStart(2, '0').toUpperCase());
	$("#p2").val('0x' + data[P2].toString(16).padStart(2, '0').toUpperCase());
	$("#p3").val('0x' + data[P3].toString(16).padStart(2, '0').toUpperCase());
}

function recognizeAndUpdateDataFromInput(element){
	let reg = eval($(element).attr('id').toUpperCase());
	let value = $(element).val();

	if(value == ""){
		setDataValueTo(reg, 0x00);
	}
	else if(value.match(/(?:\b0x[0-9a-f]{1,2}\b)|(?:\b[0-9a-f]{1,2}\b)/i)){
		setDataValueTo(reg, parseInt(value, 16));
	}
	else {
		setDataValueTo(reg, 0xFF);
	}
}

function changeGUIToRun(){
	$('#run').text("RST");
	$('#stop').prop('disabled', false);
	$('#clock').prop('disabled', true);
	editor.setOption("readOnly", true);
}

function changeGUIToReset(){
	$('#run').text("Run");
	$('#stop').prop('disabled', true);
	$('#clock').prop('disabled', false);
	$('.CodeMirror-linenumber').css('background-color', 'rgba(255, 255, 255, 0)');
	$('.CodeMirror-linenumber').css('color', gutterFontColor);
	$("#info").hide();
	editor.setOption("readOnly", false);

	for (let i = 128; i < 256; i++) {
		data[i] = 0;
	}

	updateTableData();
	fillUpSpecials();
	changeGUIToNotPaused();
}

function changeGUIToPaused(){
	$('#stop').text('▶');
}

function changeGUIToNotPaused(){
	$('#stop').text('\u2759\u2759');
}

function throwErrorAtLine(line){
	let errorLine = document.getElementsByClassName(' CodeMirror-line ')[line];
	errorLine.style.backgroundColor = 'darkred';
	errorLine.title = 'Syntax Error';
	console.log("ERROR at line " + line);
}

function clearErrorAtLine(line){
	let errorLine = document.getElementsByClassName(' CodeMirror-line ')[line];
	errorLine.style.backgroundColor = 'transparent';
	errorLine.removeAttribute('title');
}

function updateProgramCounter(){
	$("#pc").val("0x" + programCounter.toString(16).padStart(4, '0').toUpperCase());
}

function getGutterColors(){
	gutterFontColor =  $('.CodeMirror-linenumber').css('color');
	gutterBackColor = $('.CodeMirror').css('background-color');
}

function clearGutter() {
	$('.CodeMirror-linenumber').css('background-color', 'rgba(255, 255, 255, 0)');
	$('.CodeMirror-linenumber').css('color', gutterFontColor);
}

function highlightActiveLine() {
	//$('.CodeMirror-linenumber')[currentInstruction.line].css('background-color', 'red');
	let currentLine = InstructionFromAddress(programCounter).line;
	let errorBit;
	if (document.getElementsByClassName('CodeMirror-linenumber').length == getLineCount())
		errorBit = 0;
	else
		errorBit = 1;
	try {
		document.getElementsByClassName('CodeMirror-linenumber')[currentLine + errorBit].style.color = gutterBackColor;
		document.getElementsByClassName('CodeMirror-linenumber')[currentLine + errorBit].style.backgroundColor = gutterFontColor;
	}
	catch {
		//console.log("Text ouf of range");
	}

	/*document.getElementsByClassName('CodeMirror-linenumber')[currentInstruction.line + errorBit].style.color = gutterBackColor;
	document.getElementsByClassName('CodeMirror-linenumber')[currentInstruction.line + errorBit].style.backgroundColor = gutterFontColor;*/
}

function getClockInterval() {
	return parseInt($('#clock').val());
}

function scrollTableLeft(){
	let startAddr = parseInt(document.getElementsByClassName("tableTitle")[17].innerText, 16);
	scrollTableTo(startAddr - 0x80);
}

function scrollTableRight(){
	let startAddr = parseInt(document.getElementsByClassName("tableTitle")[17].innerText, 16);
	scrollTableTo(startAddr + 0x80);
}

function onGoClick(){
	let address = $("#gotoInput").val();
	if (address.includes("0x")) {
		address = address.substring(2);
	}
	address = "0x" + address.toUpperCase().padStart(4, '0');
	if(!isNaN(address) && (address <= 0xFFFF && address >= 0)) {
		scrollTableTo(parseInt(address, 16));
		$("#gotoInput").val(address);
	}
	else {
		$("#gotoInput").val("0x0000");
	}
}

function updateInfo(){
	let name;

	if(currentInstruction.hasOwnProperty('instruction'))
		name = currentInstruction.instruction;
	else{
		name = "NOP";
		timeElapsed += 1;
	}
	
	$("#info").show();
	$("#info").text("Ins.: " + name + "; Time el.: " + (timeElapsed * getClockInterval()) + "µs");
}