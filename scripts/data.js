let data = new Array(256).fill(0x0);
let prog = new Array(0x10000).fill(0x0);
let ext = new Array(0x10000).fill(0x0);

let programCounter;

const B = 0xF0;
const ACC = 0xE0;
const PSW = 0xD0;
const DPH = 0x83;
const DPL = 0x82;
const SP = 0x81;
const P0 = 0x80;
const P1 = 0x90;
const P2 = 0xA0;
const P3 = 0xB0;
const PCON = 0x87;
const SCON = 0x98;
const TCON = 0x88;
const TMOD = 0x89;
const IE = 0xA8;
const IP = 0xB8;
const SBUF = 0x99;
const TH0 = 0x8C;
const TH1 = 0x8D;
const TL0 = 0x8A;
const TL1 = 0x8B;
const R0 = 0x0;
const R1 = 0x1;
const R2 = 0x2;
const R3 = 0x3;
const R4 = 0x4;
const R5 = 0x5;
const R6 = 0x6;
const R7 = 0x7;

const CY = 0x7;
const AC = 0x6;
const F0 = 0x5;
const RS1 = 0x4;
const RS2 = 0x3;
const OV = 2;
const P = 0;

let isRunning = false;
let isPaused = false;

function setDataValueTo(address, value){
    data[address] = value;
    console.log("Address: " + address + " changed to: " + value);
    updateTableData();
    fillUpSpecials();
}

function getDataValueFrom(address){
    return data[address];
}

function setCodeValueTo(address, value){
    prog[address] = value;
    //console.log("Address: " + address + " changed to: " + value);
    updateTableData();
    fillUpSpecials();
}

function getCodeValueFrom(address){
    return prog[address];
}

function setExtValueTo(address, value){
    ext[address] = value;
    updateTableData();
    fillUpSpecials();
}

function getExtValueFrom(address){
    return ext[address];
}

function getBitFromAddr(addr, bit){
    num = parseInt(data[addr]).toString(2).padStart(8, '0');
    return parseInt(num.substring(num.length - bit - 1, num.length - bit));
}

function setBitInAddr(addr, bit, value){
    text = data[addr].toString(2).padStart(8, '0');
    num = parseInt(text.substring(0, 7 - bit) + value + text.substring( 7 - bit + 1), 2);
    setDataValueTo(addr, num);
}

function incrementInAddr(addr){
    setDataValueTo(addr, getDataValueFrom(addr) + 1)
}

function decrementInAddr(addr){
    setDataValueTo(addr, getDataValueFrom(addr) - 1);
}

function setPCValueTo(value){
    programCounter = value;
    $('#pc').val("0x" + programCounter.toString(16).padStart(4, '0').toUpperCase());
}

function getPCValue(){
    return programCounter;
}

function incrementPCby(num) {
    setPCValueTo(programCounter+num);
}

function decrementPCby(num) {
    setPCValueTo(programCounter-num);
}

function setSPValueTo(value) {
    data[SP] = value;
    updateTableData();
    fillUpSpecials();
}

function incrementSPby(num) {
    setSPValueTo(data[SP] + num);
}

function decrementSPby(num) {
    setSPValueTo(data[SP] - num);
}

function setDPTRValueTo(value) {
    
    text1 = value.toString(2).padStart(16, '0');
    subL = parseInt(text1.substring(8), 2);
    subH = parseInt(text1.substring(0, 8), 2);

    setDataValueTo(DPH, subH);
    setDataValueTo(DPL, subL);

    updateTableData();
    fillUpSpecials();
}

function getDPTRValue(){
    subL = getDataValueFrom(DPL).toString(2).padStart(8, '0');
    subH = getDataValueFrom(DPH).toString(2).padStart(8, '0');
    text1 = subH + subL;
    return parseInt(text1, 2);
}

function combineTo16bit(highValue, lowValue) {
    str1 = highValue.toString(2).padStart(8, '0');
    str2 = lowValue.toString(2).padStart(8, '0');
    result = parseInt(str1 + str2, 2);
    return result;
}

function getNibbleOf(value, higher) {
    text1 = value.toString(2).padStart(8, '0');
    if (higher) {
        return parseInt(text1.substring(0, 4), 2);
    }
    else {
        return parseInt(text1.substring(4), 2);
    }
}

function detectByteSignedPositive(byte) {
    txt1 = byte.toString(2).padStart(8, '0');
    if(txt1[0] == '1')
        return true;
    else
        return false;
}