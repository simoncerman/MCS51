let labelArray;
let instructionsArray;

let currentByteCount = 0;

let stopDetection = false;

function SyntaxDetection() {
    stopDetection = false;

    labelArray = new Array();
    instructionsArray = new Array();
    currentByteCount = 0;

    let lineArray = codeText.split("\n");
    console.log(lineArray);

    for (let i = 0; i < lineArray.length; i++) {
        if (stopDetection) { break; }
        if (!ifEmptyLine(lineArray[i])) {
            if (!InstructionCreate(lineArray[i], i)) { break; }
        }
    }
}

function InstructionCreate(input, i) {
    let result = SyntaxDetectionSingle(input);
    if (result.result == -2) {
        throwErrorAtLine(i);
        return false;
    }
    else if (result.result == -1) {
        //Label found
        let label = input.substring(0, input.search(":"));
        if (dictionary.includes(label) || specialAdrress.includes(label)) { throwErrorAtLine(i); return false; }
        let intstruct = (input + " ").substring(input.search(":")+1, input.length);
        console.log(intstruct);
        labelArray.push({
            "name": label,
            "refAddr": currentByteCount
        });
        if (ifEmptyLine(intstruct)) { return true }
        return InstructionCreate(intstruct, i);
    }
    else {
        let id = instructions[result.result].id;
        if (id == 124 || id == 125) {
            let first = getFirstOperand(input);
            currentByteCount = retrieveCodeDirect(first)
            return true
        }
        if (id == 126) {
            stopDetection = true;
            return true;
        }
        let instruction = result.output;
        let bytes = instructions[result.result].bytes;
        let cycles = instructions[result.result].cycles;

        instructionsArray.push({
            "id": id,
            "instruction": instruction,
            "line": i,
            "address": currentByteCount,
            "bytes": bytes,
            "cycles": cycles
        });

        currentByteCount += bytes;
    }
    return true;
}

function SyntaxDetectionSingle(instruction) {
    if (ifIsLabel(instruction)) {
        return { "result": -1 }
    }

    for (let i = 0; i < instructions.length; i++) {
        let syntaxRegex = new RegExp(instructions[i].regex, "gmi");
        if (syntaxRegex.test(instruction)) {
            if (instruction.includes("$")) {
                instruction = instruction.replace("$", `${currentByteCount}`);
                console.log(`${instruction}`);
                labelArray.push({
                    "name": `${currentByteCount}`,
                    "refAddr": currentByteCount
                });
            }
            return {
                "result": i,
                "output": instruction
            };
        }
    }
    return { "result": -2 };
}

function translateCode() {
    let actualAddr = 0;

    prog = new Array(0xFFFF).fill(0x0);

    let t1 = performance.now();

    for (let i = 0; i < instructionsArray.length; i++) { 
        actualAddr = instructionsArray[i].address;
        translateCodeSingle(instructionsArray[i], actualAddr);

    }
    updateTableData();
    fillUpSpecials();
    let t2 = performance.now();
    console.log('%cIt took ' + Math.abs(t1 - t2) + ' milis ', 'color: darkgreen');
}

function translateCodeSingle(instruction, memoryAddr) {

    let first = getFirstOperand(instruction.instruction);
    let second = getSecondOperand(instruction.instruction);
    let third = getThirdOperand(instruction.instruction);

    switch (instruction.id) {
        case 0:
            changeCodeHexOnAddress(memoryAddr, 0x11);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            break;
        case 1:
            changeCodeHexOnAddress(memoryAddr, 0x11);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveAddrFromLabel(first));
            break;
        case 2:
            changeCodeHexOnAddress(memoryAddr, 0x24);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeImmediate(second));
            break;
        case 3:
            changeCodeHexOnAddress(memoryAddr, 0x26 + retrieveCodeAdRi(second));
            break;
        case 4:
            changeCodeHexOnAddress(memoryAddr, 0x25);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(second));
            break;
        case 5:
            changeCodeHexOnAddress(memoryAddr, 0x28 + retrieveCodeRn(second));
            break;
        case 6:
            changeCodeHexOnAddress(memoryAddr, 0x34);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeImmediate(second));
            break;
        case 7:
            changeCodeHexOnAddress(memoryAddr, 0x36 + retrieveCodeAdRi(second));
            break;
        case 8:
            changeCodeHexOnAddress(memoryAddr, 0x35);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(second));
            break;
        case 9:
            changeCodeHexOnAddress(memoryAddr, 0x38 + retrieveCodeRn(second));
            break;
        case 10:
            changeCodeHexOnAddress(memoryAddr, 0x1);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            return 2
        case 11:
            changeCodeHexOnAddress(memoryAddr, 0x1);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveAddrFromLabel(first));
            console.log(retrieveAddrFromLabel(first));
            break;
        case 12:
            changeCodeHexOnAddress(memoryAddr, 0x54);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeImmediate(second));
            break;
        case 13:
            changeCodeHexOnAddress(memoryAddr, 0x56 + retrieveCodeAdRi(second));
            break;
        case 14:
            changeCodeHexOnAddress(memoryAddr, 0x55);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(second));
            break;
        case 15:
            changeCodeHexOnAddress(memoryAddr, 0x58 + retrieveCodeRn(second));;
            break;
        case 16:
            changeCodeHexOnAddress(memoryAddr, 0xB0);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeBit(second));
            break;
        case 17:
            changeCodeHexOnAddress(memoryAddr, 0x82);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeBit(second));
            break;
        case 18:
            changeCodeHexOnAddress(memoryAddr, 0x52);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            break;
        case 19:
            changeCodeHexOnAddress(memoryAddr, 0x53);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(second));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveCodeImmediate(third));
            break;
        case 20:
            changeCodeHexOnAddress(memoryAddr, 0xB0);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeSpecialBit(second));
            break;
        case 21:
            changeCodeHexOnAddress(memoryAddr, 0x82);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeSpecialBit(second));
            break;
        case 22:
            changeCodeHexOnAddress(memoryAddr, 0xB6 + retrieveCodeAdRi(first));
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeImmediate(second));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveAddrFromLabel(third));
            break;
        case 23:
            changeCodeHexOnAddress(memoryAddr, 0xB4);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeImmediate(second));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveAddrFromLabel(third));
            break;
        case 24:
            changeCodeHexOnAddress(memoryAddr, 0xB5);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(second));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveAddrFromLabel(third));
            break;
        case 25:
            changeCodeHexOnAddress(memoryAddr, 0xB8 + retrieveCodeRn(first));
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeImmediate(second));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveAddrFromLabel(third));
            break;
        case 26:
            changeCodeHexOnAddress(memoryAddr, 0xE4);
            break;
        case 27:
            changeCodeHexOnAddress(memoryAddr, 0xC2);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeBit(first));
            break;
        case 28:
            changeCodeHexOnAddress(memoryAddr, 0xC3);
            break;
        case 29:
            changeCodeHexOnAddress(memoryAddr, 0xC2);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeSpecialBit(first));
            break;
        case 30:
            changeCodeHexOnAddress(memoryAddr, 0xF4);
            break;
        case 31:
            changeCodeHexOnAddress(memoryAddr, 0xB2);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeBit(first));
            break;
        case 32:
            changeCodeHexOnAddress(memoryAddr, 0xB3);
            break;
        case 33:
            changeCodeHexOnAddress(memoryAddr, 0xB2);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeSpecialBit(first));
            break;
        case 34:
            changeCodeHexOnAddress(memoryAddr, 0xD4);
            break;
        case 35:
            changeCodeHexOnAddress(memoryAddr, 0x16 + retrieveCodeAdRi(first));
            break;
        case 36:
            changeCodeHexOnAddress(memoryAddr, 0x14);
            break;
        case 37:
            changeCodeHexOnAddress(memoryAddr, 0x15);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            break;
        case 38:
            changeCodeHexOnAddress(memoryAddr, 0x18 + retrieveCodeRn(first));
            break;
        case 39:
            changeCodeHexOnAddress(memoryAddr, 0x84);
            break;
        case 40:
            changeCodeHexOnAddress(memoryAddr, 0xD5);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveAddrFromLabel(second));
            break;
        case 41:
            changeCodeHexOnAddress(memoryAddr, 0xD8 + retrieveCodeRn(first));
            changeCodeHexOnAddress(memoryAddr + 1, retrieveAddrFromLabel(second));
            break;
        case 42:
            changeCodeHexOnAddress(memoryAddr, 0x6 + retrieveCodeAdRi(first));
            break;
        case 43:
            changeCodeHexOnAddress(memoryAddr, 0x4);
            break;
        case 44:
            changeCodeHexOnAddress(memoryAddr, 0x5);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            break;
        case 45:
            changeCodeHexOnAddress(memoryAddr, 0xA3);
            break;
        case 46:
            changeCodeHexOnAddress(memoryAddr, 0x8 + retrieveCodeRn(first));
            break;
        case 47:
            changeCodeHexOnAddress(memoryAddr, 0x20);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeBit(first));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveAddrFromLabel(second));
            break;
        case 48:
            changeCodeHexOnAddress(memoryAddr, 0x20);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeSpecialBit(first));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveAddrFromLabel(second));
            break;
        case 49:
            changeCodeHexOnAddress(memoryAddr, 0x10);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeBit(first));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveAddrFromLabel(second));
            break;
        case 50:
            changeCodeHexOnAddress(memoryAddr, 0x10);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeSpecialBit(first));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveAddrFromLabel(second));
            break;
        case 51:
            changeCodeHexOnAddress(memoryAddr, 0x40);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveAddrFromLabel(first));
            break;
        case 52:
            changeCodeHexOnAddress(memoryAddr, 0x73);
            break;
        case 53:
            changeCodeHexOnAddress(memoryAddr, 0x30);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeBit(first));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveAddrFromLabel(second));
            break;
        case 54:
            changeCodeHexOnAddress(memoryAddr, 0x30);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeSpecialBit(first));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveAddrFromLabel(second));
            break;
        case 55:
            changeCodeHexOnAddress(memoryAddr, 0x50);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveAddrFromLabel(first));
            break;
        case 56:
            changeCodeHexOnAddress(memoryAddr, 0x70);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveAddrFromLabel(first));
            break;
        case 57:
            changeCodeHexOnAddress(memoryAddr, 0x60);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveAddrFromLabel(first));
            break;
        case 58:
            num = retrieveCodeDirect(first).toString(2).padStart(16, '0');
            partH = parseInt(num.substring(0, 8), 2);
            partL = parseInt(num.substring(8), 2);
            changeCodeHexOnAddress(memoryAddr, 0x12);
            changeCodeHexOnAddress(memoryAddr + 1, partH);
            changeCodeHexOnAddress(memoryAddr + 2, partL);
            break;
        case 59:
            num = retrieveCodeDirect(first).toString(2).padStart(16, '0');
            partH = parseInt(num.substring(0, 8), 2);
            partL = parseInt(num.substring(8), 2);
            changeCodeHexOnAddress(memoryAddr, 0x2);
            changeCodeHexOnAddress(memoryAddr + 1, partH);
            changeCodeHexOnAddress(memoryAddr + 2, partL);
            break;
        case 60:
            changeCodeHexOnAddress(memoryAddr, 0x76 + retrieveCodeRn(first));
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeImmediate(second));
            break;
        case 61:
            changeCodeHexOnAddress(memoryAddr, 0xF6 + retrieveCodeAdRi(first));
            break;
        case 62:
            changeCodeHexOnAddress(memoryAddr, 0xA6 + retrieveCodeAdRi(first));
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(second));
            break;
        case 63:
            changeCodeHexOnAddress(memoryAddr, 0x74);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeImmediate(second));
            break;
        case 64:
            changeCodeHexOnAddress(memoryAddr, 0xE6 + retrieveCodeAdRi(second));
            break;
        case 65:
            changeCodeHexOnAddress(memoryAddr, 0xE5);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(second));
            break;
        case 66:
            changeCodeHexOnAddress(memoryAddr, 0xE8 + retrieveCodeRn(second));
            break;
        case 67:
            changeCodeHexOnAddress(memoryAddr, 0x92);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeBit(first));
            break;
        case 68:
            changeCodeHexOnAddress(memoryAddr, 0xA2);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeBit(second));
            break;
        case 69:
            changeCodeHexOnAddress(memoryAddr, 0x85);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(second));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveCodeDirect(first));
            break;
        case 70:
            changeCodeHexOnAddress(memoryAddr, 0x75);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveCodeImmediate(second));
            break;
        case 71:
            changeCodeHexOnAddress(memoryAddr, 0x86 + retrieveCodeAdRi(second));
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            break;
        case 72:
            changeCodeHexOnAddress(memoryAddr, 0xF5);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            break;
        case 73:
            changeCodeHexOnAddress(memoryAddr, 0x88 + retrieveCodeRn(second));
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            break;
        case 74:
            num = retrieveCodeImmediate(second).toString(2).padStart(16, '0');
            partH = parseInt(num.substring(0, 8), 2);
            partL = parseInt(num.substring(8), 2);
            changeCodeHexOnAddress(memoryAddr, 0x90);
            changeCodeHexOnAddress(memoryAddr + 1, partH);
            changeCodeHexOnAddress(memoryAddr + 2, partL);
            break;
        case 75:
            changeCodeHexOnAddress(memoryAddr, 0x78 + retrieveCodeRn(first));
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeImmediate(second));
            break;
        case 76:
            changeCodeHexOnAddress(memoryAddr, 0xF8 + retrieveCodeRn(first));
            break;
        case 77:
            changeCodeHexOnAddress(memoryAddr, 0xA8 + retrieveCodeRn(first));
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(second));
            break;
        case 78:
            changeCodeHexOnAddress(memoryAddr, 0x98);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeSpecialBit(first));
            break;
        case 79:
            changeCodeHexOnAddress(memoryAddr, 0xA2);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeSpecialBit(second));
            break;
        case 80:
            changeCodeHexOnAddress(memoryAddr, 0x93);
            break;
        case 81:
            changeCodeHexOnAddress(memoryAddr, 0x83);
            break;
        case 82:
            changeCodeHexOnAddress(memoryAddr, 0xF2 + retrieveCodeAdRi(first));
            break;
        case 83:
            changeCodeHexOnAddress(memoryAddr, 0xE0);
            break;
        case 84:
            changeCodeHexOnAddress(memoryAddr, 0xE2 + retrieveCodeAdRi(second));
            break;
        case 85:
            changeCodeHexOnAddress(memoryAddr, 0xA4);
        case 86:
            changeCodeHexOnAddress(memoryAddr, 0x00);
            break;
        case 87:
            changeCodeHexOnAddress(memoryAddr, 0x44);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeImmediate(second));
            break;
        case 88:
            changeCodeHexOnAddress(memoryAddr, 0x46 + retrieveCodeAdRi(second));
            break;
        case 89:
            changeCodeHexOnAddress(memoryAddr, 0x45);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(second));
            break;
        case 90:
            changeCodeHexOnAddress(memoryAddr, 0x48 + retrieveCodeRn(second));
            break;
        case 91:
            changeCodeHexOnAddress(memoryAddr, 0xA0);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeBit(second));
            break;
        case 92:
            changeCodeHexOnAddress(memoryAddr, 0x72);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeBit(second));
            break;
        case 93:
            changeCodeHexOnAddress(memoryAddr, 0x43);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveCodeImmediate(second));
            break;
        case 94:
            changeCodeHexOnAddress(memoryAddr, 0x42);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            break;
        case 95:
            changeCodeHexOnAddress(memoryAddr, 0xA0);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeSpecialBit(second));
            break;
        case 96:
            changeCodeHexOnAddress(memoryAddr, 0x72);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeSpecialBit(second));
            break;
        case 97:
            changeCodeHexOnAddress(memoryAddr, 0xD0);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            break;
        case 98:
            changeCodeHexOnAddress(memoryAddr, 0xC0);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            break;
        case 99:
            changeCodeHexOnAddress(memoryAddr, 0x22);
            break;
        case 100:
            changeCodeHexOnAddress(memoryAddr, 0x32);
            break;
        case 101:
            changeCodeHexOnAddress(memoryAddr, 0x23);
            break;
        case 102:
            changeCodeHexOnAddress(memoryAddr, 0x33);
            break;
        case 103:
            changeCodeHexOnAddress(memoryAddr, 0x3);
            break;
        case 104:
            changeCodeHexOnAddress(memoryAddr, 0x13);
            break;
        case 105:
            changeCodeHexOnAddress(memoryAddr, 0xD2);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeBit(first));
            break;
        case 106:
            changeCodeHexOnAddress(memoryAddr, 0xD3);
            break;
        case 107:
            changeCodeHexOnAddress(memoryAddr, 0xD2);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeSpecialBit(first));
            break;
        case 108:
            changeCodeHexOnAddress(memoryAddr, 0x80);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveAddrFromLabel(first));
            break;
        case 109:
            changeCodeHexOnAddress(memoryAddr, 0x94);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeImmediate(second));
            break;
        case 110:
            changeCodeHexOnAddress(memoryAddr, 0x96 + retrieveCodeAdRi(second));
            break;
        case 111:
            changeCodeHexOnAddress(memoryAddr, 0x95);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(second));
            break;
        case 112:
            changeCodeHexOnAddress(memoryAddr, 0x98 + retrieveCodeRn(second));
            break;
        case 113:
            changeCodeHexOnAddress(memoryAddr, 0xC4);
            break;
        case 114:
            changeCodeHexOnAddress(memoryAddr, 0x63 + retrieveCodeAdRi(second));
            break;
        case 115:
            changeCodeHexOnAddress(memoryAddr, 0xC5);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(second));
            break;
        case 116:
            changeCodeHexOnAddress(memoryAddr, 0xC8 + retrieveCodeRn(second));
            break;
        case 117:
            changeCodeHexOnAddress(memoryAddr, 0xD6 + retrieveCodeAdRi(second));
            break;
        case 118:
            changeCodeHexOnAddress(memoryAddr, 0x64);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeImmediate(second));
            break;
        case 119:
            changeCodeHexOnAddress(memoryAddr, 0x66 + retrieveCodeAdRi(second));
            break;
        case 120:
            changeCodeHexOnAddress(memoryAddr, 0x65);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(second));
            break;
        case 121:
            changeCodeHexOnAddress(memoryAddr, 0x68 + retrieveCodeRn(second));
            break;
        case 122:
            changeCodeHexOnAddress(memoryAddr, 0x63);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            changeCodeHexOnAddress(memoryAddr + 2, retrieveCodeImmediate(second));
            break;
        case 123:
            changeCodeHexOnAddress(memoryAddr, 0x62);
            changeCodeHexOnAddress(memoryAddr + 1, retrieveCodeDirect(first));
            break;
    }
}

function changeCodeHexOnAddress(addr, value) {
    prog[addr] = value;
}