let currentInstruction;

const delay = ms => new Promise(res => setTimeout(res, ms));

function prepareForExecution() {
    setPCValueTo(0);
    data[SP] = 0x7;
    data[P0] = 0xFF;
    data[P1] = 0xFF;
    data[P2] = 0xFF;
    data[P3] = 0xFF;
}

function checkForBreakPoint(){
    try {
        editor.lineInfo(InstructionFromAddress(programCounter).line).gutterMarkers.breakpoints;
        return true;
    }
    catch {
        return false;
    }
}

const doInstructionStep = async () => {
    TTSetUp();
    currentInstruction = InstructionFromAddress(programCounter);
    let numCycles = doInstructionAction(currentInstruction)
    if(numCycles == undefined)
        incrementTT(0);
    else {
        for (let i = 0; i < numCycles; i++) {
            incrementTT(0);
            timeElapsed += 1;
        }
    }
    incrementTT(1);
    updateInfo();
}

function doInstructionAction(instruction) {
    let first = getFirstOperand(instruction.instruction);
    let second = getSecondOperand(instruction.instruction);
    let third = getThirdOperand(instruction.instruction);


    switch(instruction.id){
        case 0:
            incrementPCby(2);
            num1 = retrieveDirect(first).address;
            incrementSPby(1);
            data[data[SP]] = retrieve8bitsOfPC(false);
            incrementSPby(1);
            data[data[SP]] = retrieve8bitsOfPC(true);
            setPCValueTo(num1);
            return 2;
        case 1:
            incrementPCby(2);
            label = retrieveAddrFromLabel(first);
            incrementSPby(1);
            data[data[SP]] = retrieve8bitsOfPC(false);
            incrementSPby(1);
            data[data[SP]] = retrieve8bitsOfPC(true);
            setPCValueTo(label);
            return 2;
        case 2:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveImmediate(second);
            result = num1 + num2;
            if(result > 0xFF) {                //CY
                setDataValueTo(ACC, result - 0x100);
                setBitInAddr(PSW, CY, 1);
            }
            else {
                setDataValueTo(ACC, result);
                setBitInAddr(PSW, CY, 0);
            }
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            if((detectByteSignedPositive(num1) && detectByteSignedPositive(num2) && !detectByteSignedPositive(result))||
                (!detectByteSignedPositive(num1) && !detectByteSignedPositive(num2) && detectByteSignedPositive(result)))    //OV
                setBitInAddr(PSW, OV, 1);
            else 
                setBitInAddr(PSW, OV, 0);
            if (getNibbleOf(result, true) != 0 && getNibbleOf(result, false) == 0)  //AC
                setBitInAddr(PSW, AC, 1);
            else 
                setBitInAddr(PSW, AC, 0);
            return 1;
        case 3:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveAdRi(second).value;
            result = num1 + num2;
            if(result > 0xFF) {                //CY
                setDataValueTo(ACC, result - 0x100);
                setBitInAddr(PSW, CY, 1);
            }
            else {
                setDataValueTo(ACC, result);
                setBitInAddr(PSW, CY, 0);
            }
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            if((detectByteSignedPositive(num1) && detectByteSignedPositive(num2) && !detectByteSignedPositive(result))||
            (!detectByteSignedPositive(num1) && !detectByteSignedPositive(num2) && detectByteSignedPositive(result)))    //OV
                setBitInAddr(PSW, OV, 1);
            else 
                setBitInAddr(PSW, OV, 0);
            if (getNibbleOf(result, true) != 0 && getNibbleOf(result, false) == 0)  //AC
                setBitInAddr(PSW, AC, 1);
            else 
                setBitInAddr(PSW, AC, 0);
            return 1;
        case 4:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveDirect(second).value;
            result = num1 + num2;
            if(result > 0xFF) {                //CY
                setDataValueTo(ACC, result - 0x100);
                setBitInAddr(PSW, CY, 1);
            }
            else {
                setDataValueTo(ACC, result);
                setBitInAddr(PSW, CY, 0);
            }
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            if((detectByteSignedPositive(num1) && detectByteSignedPositive(num2) && !detectByteSignedPositive(result))||
            (!detectByteSignedPositive(num1) && !detectByteSignedPositive(num2) && detectByteSignedPositive(result)))    //OV
                setBitInAddr(PSW, OV, 1);
            else 
                setBitInAddr(PSW, OV, 0);
            if (getNibbleOf(result, true) != 0 && getNibbleOf(result, false) == 0)  //AC
                setBitInAddr(PSW, AC, 1);
            else 
                setBitInAddr(PSW, AC, 0);
            return 1;
        case 5:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveRn(second).value;
            result = num1 + num2;
            if(result > 0xFF) {                //CY
                setDataValueTo(ACC, result - 0x100);
                setBitInAddr(PSW, CY, 1);
            }
            else {
                setDataValueTo(ACC, result);
                setBitInAddr(PSW, CY, 0);
            }
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            if((detectByteSignedPositive(num1) && detectByteSignedPositive(num2) && !detectByteSignedPositive(result))||
            (!detectByteSignedPositive(num1) && !detectByteSignedPositive(num2) && detectByteSignedPositive(result)))    //OV
                setBitInAddr(PSW, OV, 1);
            else 
                setBitInAddr(PSW, OV, 0);
            if (getNibbleOf(result, true) != 0 && getNibbleOf(result, false) == 0)  //AC
                setBitInAddr(PSW, AC, 1);
            else 
                setBitInAddr(PSW, AC, 0);
            return 1;
        case 6:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveImmediate(second);
            num3 = getBitFromAddr(PSW, CY);
            result = num1 + num2 + num3;
            if(result > 0xFF) {                //CY
                setDataValueTo(ACC, result - 0x100);
                setBitInAddr(PSW, CY, 1);
            }
            else {
                setDataValueTo(ACC, result);
                setBitInAddr(PSW, CY, 0);
            }
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            if((detectByteSignedPositive(num1) && detectByteSignedPositive(num2) && !detectByteSignedPositive(result))||
            (!detectByteSignedPositive(num1) && !detectByteSignedPositive(num2) && detectByteSignedPositive(result)))    //OV
                setBitInAddr(PSW, OV, 1);
            else 
                setBitInAddr(PSW, OV, 0);
            if (getNibbleOf(result, true) != 0 && getNibbleOf(result, false) == 0)  //AC
                setBitInAddr(PSW, AC, 1);
            else 
                setBitInAddr(PSW, AC, 0);
            return 1;
        case 7:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveAdRi(second).value;
            num3 = getBitFromAddr(PSW, CY);
            result = num1 + num2 + num3;
            if(result > 0xFF) {                //CY
                setDataValueTo(ACC, result - 0x100);
                setBitInAddr(PSW, CY, 1);
            }
            else {
                setDataValueTo(ACC, result);
                setBitInAddr(PSW, CY, 0);
            }
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            if((detectByteSignedPositive(num1) && detectByteSignedPositive(num2) && !detectByteSignedPositive(result))||
            (!detectByteSignedPositive(num1) && !detectByteSignedPositive(num2) && detectByteSignedPositive(result)))    //OV
                setBitInAddr(PSW, OV, 1);
            else 
                setBitInAddr(PSW, OV, 0);
            if (getNibbleOf(result, true) != 0 && getNibbleOf(result, false) == 0)  //AC
                setBitInAddr(PSW, AC, 1);
            else 
                setBitInAddr(PSW, AC, 0);
            return 1;
        case 8:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveDirect(second).value;
            num3 = getBitFromAddr(PSW, CY);
            result = num1 + num2 + num3;
            if(result > 0xFF) {                //CY
                setDataValueTo(ACC, result - 0x100);
                setBitInAddr(PSW, CY, 1);
            }
            else {
                setDataValueTo(ACC, result);
                setBitInAddr(PSW, CY, 0);
            }
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            if((detectByteSignedPositive(num1) && detectByteSignedPositive(num2) && !detectByteSignedPositive(result))||
            (!detectByteSignedPositive(num1) && !detectByteSignedPositive(num2) && detectByteSignedPositive(result)))    //OV
                setBitInAddr(PSW, OV, 1);
            else 
                setBitInAddr(PSW, OV, 0);
            if (getNibbleOf(result, true) != 0 && getNibbleOf(result, false) == 0)  //AC
                setBitInAddr(PSW, AC, 1);
            else 
                setBitInAddr(PSW, AC, 0);
            return 1;
        case 9:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveDirect(second).value;
            num3 = getBitFromAddr(PSW, CY);
            result = num1 + num2 + num3;
            if(result > 0xFF) {                //CY
                setDataValueTo(ACC, result - 0x100);
                setBitInAddr(PSW, CY, 1);
            }
            else {
                setDataValueTo(ACC, result);
                setBitInAddr(PSW, CY, 0);
            }
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            if((detectByteSignedPositive(num1) && detectByteSignedPositive(num2) && !detectByteSignedPositive(result))||
            (!detectByteSignedPositive(num1) && !detectByteSignedPositive(num2) && detectByteSignedPositive(result)))    //OV
                setBitInAddr(PSW, OV, 1);
            else 
                setBitInAddr(PSW, OV, 0);
            if (getNibbleOf(result, true) != 0 && getNibbleOf(result, false) == 0)  //AC
                setBitInAddr(PSW, AC, 1);
            else 
                setBitInAddr(PSW, AC, 0);
            return 1;
        case 10:
            incrementPCby(2);
            setPCValueTo(retrieveAddrFromDirect(first));
            return 2
        case 11:
            incrementPCby(2);
            setPCValueTo(retrieveAddrFromLabel(first));
            return 2;
        case 12:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            num2 = retrieveImmediate(second).toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == '0' || num2[i] == '0')
                    result = result + '0';
                else
                    result = result + '1';
            }
            setDataValueTo(ACC, parseInt(result, 2));
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 13:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            num2 = retrieveAdRi(second).value.toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == '0' || num2[i] == '0')
                    result = result + '0';
                else
                    result = result + '1';
            }
            setDataValueTo(ACC, parseInt(result, 2));
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 14:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            num2 = retrieveDirect(second).value.toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == '0' || num2[i] == '0')
                    result = result + '0';
                else
                    result = result + '1';
            }
            setDataValueTo(ACC, parseInt(result, 2));
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 15:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            num2 = retrieveRn(second).value.toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == '0' || num2[i] == '0')
                    result = result + '0';
                else
                    result = result + '1';
            }
            setDataValueTo(ACC, parseInt(result, 2));
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 16:
            incrementPCby(2);
            num1 = retrieveC();
            num2 = retrieveNotBit(second);
            if(num1 == 0 || num2 == 0)
                result = 0;
            else
                result = 1;
            setBitInAddr(PSW, CY, result);
            return 2;
        case 17:
            incrementPCby(2);
            num1 = retrieveC();
            num2 = retrieveBit(second).value;
            if(num1 == 0 || num2 == 0)
                result = 0;
            else
                result = 1;
            setBitInAddr(PSW, CY, result);
            return 2;
        case 18:
            incrementPCby(2);
            num1 = retrieveDirect(first).value.toString(2).padStart(8, '0');
            num2 = getDataValueFrom(ACC).value.toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == '0' || num2[i] == '0')
                    result = result + '0';
                else
                    result = result + '1';
            }
            setDataValueTo(retrieveDirect(first).address, parseInt(result, 2));
            return 1;
        case 19:
            incrementPCby(3);
            num1 = retrieveDirect(first).value.toString(2).padStart(8, '0');
            num2 = retrieveImmediate(second).toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == '0' || num2[i] == '0')
                    result = result + '0';
                else
                    result = result + '1';
            }
            setDataValueTo(retrieveDirect(first).address, parseInt(result, 2));
            return 2;
        case 20:
            incrementPCby(2);
            num1 = retrieveC();
            num2 = retrieveNotSpecialBit(second);
            if(num1 == 0 || num2 == 0)
                result = 0;
            else
                result = 1;
            setBitInAddr(PSW, CY, result);
            return 2;
        case 21:
            incrementPCby(2);
            num1 = retrieveC();
            num2 = retrieveSpecialBit(second).value;
            if(num1 == 0 || num2 == 0)
                result = 0;
            else
                result = 1;
            setBitInAddr(PSW, CY, result);
            return 2;
        case 22:
            incrementPCby(3);
            num1 = retrieveAdRi(first).value;
            num2 = retrieveImmediate(second);
            label = retrieveAddrFromLabel(third);
            if(num1 != num2)
                setPCValueTo(label);
            if(num1 < num2)
                setBitInAddr(PSW, CY, 1);
            else
                setBitInAddr(PSW, CY, 0);
            return 2;
        case 23:
            incrementPCby(3);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveImmediate(second);
            label = retrieveAddrFromLabel(third);
            if(num1 != num2)
                setPCValueTo(label);
            if(num1 < num2)
                setBitInAddr(PSW, CY, 1);
            else
                setBitInAddr(PSW, CY, 0);
            return 2;
        case 24:
            incrementPCby(3);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveDirect(second).value;
            label = retrieveAddrFromLabel(third);
            if(num1 != num2)
                setPCValueTo(label);
            if(num1 < num2)
                setBitInAddr(PSW, CY, 1);
            else
                setBitInAddr(PSW, CY, 0);
            return 2;
        case 25:
            incrementPCby(3);
            num1 = retrieveRn(first).value;
            num2 = retrieveImmediate(second);
            label = retrieveAddrFromLabel(third);
            if(num1 != num2)
                setPCValueTo(label);
            if(num1 < num2)
                setBitInAddr(PSW, CY, 1);
            else
                setBitInAddr(PSW, CY, 0);
            return 2;
        case 26:
            incrementPCby(1);
            setDataValueTo(ACC, 0);
            setBitInAddr(PSW, P, 0);
            return 1;
        case 27:
            debugger;
            incrementPCby(2);
            add = retrieveBit(first).address;
            bit = retrieveBit(first).bit;
            setBitInAddr(add, bit, 0);
            return 1;
        case 28:
            incrementPCby(1);
            setBitInAddr(PSW, CY, 0);
            return 1;
        case 29:
            incrementPCby(2);
            add = retrieveSpecialBit(first).address;
            bit = retrieveSpecialBit(first).bit;
            setBitInAddr(add, bit, 0);
            return 1;
        case 30:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == "1")
                    result = result + "0";
                else
                    result = result + "1";
            }
            setDataValueTo(ACC, parseInt(result, 2));
            return 1;
        case 31:
            incrementPCby(2);
            addr = retrieveBit(first).address;
            bit = retrieveBit(first).bit;
            num1 = retrieveBit(first).value;
            result;
            if(num1 == 1)
                result = 0;
            else
                result = 1;
            setBitInAddr(addr, bit, result);
            return 1;
        case 32:
            incrementPCby(1);
            num1 = retrieveC();
            result;
            if(num1 == 1)
                result = 0;
            else
                result = 1;
            setBitInAddr(PSW, CY, result);
            return 1;
        case 33:
            incrementPCby(2);
            addr = retrieveSpecialBit(first).address;
            bit = retrieveSpecialBit(first).bit;
            num1 = retrieveSpecialBit(first).value;
            result;
            if(num1 == 1)
                result = 0;
            else
                result = 1;
            setBitInAddr(addr, bit, result);
            return 1;
        case 34:
            incrementPCby(1);       //DA A

            return 1;
        case 35:
            incrementPCby(1);
            num1 = retrieveAdRi(first).value;
            num1 -= 1;
            setDataValueTo(retrieveAdRi(first).address, num1);
            return 1;
        case 36:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC);
            num1 -= 1;
            setDataValueTo(ACC, num1);
            return 1;
        case 37:
            incrementPCby(2);
            num1 = retrieveDirect(first).value;
            addr = retrieveDirect(first).address;
            num1 -= 1;
            setDataValueTo(addr, num1);
            return 1;
        case 38:
            incrementPCby(1);
            num1 = retrieveRn(first).value;
            addr = retrieveRn(first).address;
            num1 -= 1;
            setDataValueTo(addr, num1);
            return 1;
        case 39:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC);
            num2 = getDataValueFrom(B);
            num3;
            rmd;
            if(B != 0){
                num3 = Math.floor(num1/num2);
                rmd = num1 % num2;
                setDataValueTo(ACC, num3);
                setDataValueTo(B, rmd);
                setBitInAddr(PSW, OV, 0);
            }
            else{
                setBitInAddr(PSW, OV, 1);
            }
            if(getDataValueFrom(ACC) % 2 != 0)
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 4;
        case 40:
            incrementPCby(3);
            num1 = retrieveDirect(first).value;
            addr = retrieveDirect(first).address;
            label = retrieveAddrFromLabel(second);
            num1 -= 1;
            setDataValueTo(addr, num1);
            if(num1 != 0)
                setPCValueTo(labelArray);
            return 2;
        case 41:
            incrementPCby(2);
            num1 = retrieveRn(first).value;
            addr = retrieveRn(first).address;
            label = retrieveAddrFromLabel(second);
            num1 -= 1;
            setDataValueTo(addr, num1);
            if(num1 != 0)
                setPCValueTo(labelArray);
            return 2;
        case 42:
            incrementPCby(1);
            num1 = retrieveAdRi(first).value;
            num1 += 1;
            setDataValueTo(retrieveAdRi(first).address, num1);
            return 1;
        case 43:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC);
            num1 += 1;
            setDataValueTo(ACC, num1);
            return 1;
        case 44:
            incrementPCby(2);
            num1 = retrieveDirect(first).value;
            addr = retrieveDirect(first).address;
            num1 += 1;
            setDataValueTo(addr, num1);
            return 1;
        case 45:
            incrementPCby(1);
            num1 = getDPTRValue();
            num1 += 1;
            setDPTRValueTo(num1);
            return 2;
        case 46:
            incrementPCby(1);
            num1 = retrieveRn(first).value;
            addr = retrieveRn(first).address;
            num1 += 1;
            setDataValueTo(addr, num1);
            return 1;
        case 47:
            incrementPCby(3);
            num1 = retrieveBit(first).value;
            label = retrieveAddrFromLabel(second);
            if(num1 == 1)
                setPCValueTo(label);
            return 2;
        case 48:
            incrementPCby(3);
            num1 = retrieveSpecialBit(first).value;
            label = retrieveAddrFromLabel(second);
            if(num1 == 1)
                setPCValueTo(label);
            return 2;
        case 49:
            incrementPCby(3);
            num1 = retrieveBit(first).value;
            addr = retrieveBit(first).address;
            bit = retrieveBit(first).bit;
            label = retrieveAddrFromLabel(second);

            if(num1 == 1) {
                setBitInAddr(addr, bit, 0);
                setPCValueTo(label);
            }
            return 2;
        case 50:
            incrementPCby(3);
            num1 = retrieveSpecialBit(first).value;
            addr = retrieveSpecialBit(first).address;
            bit = retrieveSpecialBit(first).bit;
            label = retrieveAddrFromLabel(second);

            if(num1 == 1) {
                setBitInAddr(addr, bit, 0);
                setPCValueTo(label);
            }
            return 2;
        case 51:
            incrementPCby(2);
            num1 = retrieveC();
            label = retrieveAddrFromLabel(first);
            if(num1 == 1)
                setPCValueTo(label);
            return 2;
        case 52:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC);
            num2 = getDPTRValue();
            setPCValueTo(num1 + num2);
            return 2;
        case 53:
            incrementPCby(3);
            num1 = retrieveBit(first).value;
            label = retrieveAddrFromLabel(second);
            if(num1 == 0)
                setPCValueTo(label);
            return 2;
        case 54:
            incrementPCby(3);
            num1 = retrieveSpecialBit(first).value;
            label = retrieveAddrFromLabel(second);
            if(num1 == 0)
                setPCValueTo(label);
            return 2;
        case 55:
            incrementPCby(2);
            num1 = retrieveC();
            label = retrieveAddrFromLabel(first);
            if(num1 == 0)
                setPCValueTo(label);
            return 2;
        case 56:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC);
            label = retrieveAddrFromLabel(first);
            if(num1 != 0)
                setPCValueTo(label);
            return 2;
        case 57:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC);
            label = retrieveAddrFromLabel(first);
            if(num1 == 0)
                setPCValueTo(label);
            return 2;
        case 58:
            incrementPCby(3);
            num1 = retrieveDirect(first).address;
            incrementSPby(1);
            data[data[SP]] = retrieve8bitsOfPC(false);
            incrementSPby(1);
            data[data[SP]] = retrieve8bitsOfPC(true);
            setPCValueTo(num1);
            return 2;
        case 59:
            incrementPCby(3);
            num1 = retrieveDirect(first).address;
            setPCValueTo(num1);
            return 2;
        case 60:
            incrementPCby(2);
            addr = retrieveAdRi(first).address;
            num1 = retrieveImmediate(second);
            setDataValueTo(addr, num1);
            return 1;
        case 61:
            incrementPCby(1);
            addr = retrieveAdRi(first).address;
            num1 = getDataValueFrom(ACC);
            setDataValueTo(addr, num1);
            return 1;
        case 62:
            incrementPCby(2);
            portData = retrieveDirect(second).value;
            edgesData = null;
            if (isPPort(second)){
                edgesData = getPPortEdgesData(second);
            }
            num1 = recalculateDataValue(portData, edgesData);
            addr = retrieveAdRi(first).address;
            setDataValueTo(addr, num1);
            return 2;
        case 63:
            incrementPCby(2);
            num1 = retrieveImmediate(second);
            setDataValueTo(ACC, num1);
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 64:
            incrementPCby(1);
            num1 = retrieveAdRi(second).value;
            setDataValueTo(ACC, num1);
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 65:
            incrementPCby(2);
            edgesData = null;
            portData = retrieveDirect(second).value;
            if (isPPort(second)){
                edgesData = getPPortEdgesData(second);
            }
            num1 = recalculateDataValue(portData, edgesData);

            setDataValueTo(ACC, num1);
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 66:
            incrementPCby(1);
            num1 = retrieveRn(second).value;
            setDataValueTo(ACC, num1);
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 67:
            incrementPCby(2);
            addr = retrieveBit(first).address;
            bit = retrieveBit(first).bit;
            num1 = retrieveC();
            setBitInAddr(addr, bit, num1);
            return 2;
        case 68:
            incrementPCby(2);
            num1 = retrieveBit(second).value;
            setBitInAddr(PSW, CY, num1);
            return 1;
        case 69:
            incrementPCby(3);
            portData = retrieveDirect(second).value;
            edgesData = null;
            if (isPPort(second)){
                edgesData = getPPortEdgesData(second);
            }
            num1 = recalculateDataValue(portData, edgesData);
            addr = retrieveDirect(first).address;
            setDataValueTo(addr, num1);
            if (addr === 153) serialHandler.sendDataPrepare(num1);
            return 2;
        case 70:
            incrementPCby(3);
            addr = retrieveDirect(first).address;
            num1 = retrieveImmediate(second);
            setDataValueTo(addr, num1);
            if (addr === 153) serialHandler.sendDataPrepare(num1);
            return 2;
        case 71:
            incrementPCby(2);
            addr = retrieveDirect(first).address;
            num1 = retrieveAdRi(second).value;
            setDataValueTo(addr, num1);
            return 2;
        case 72:
            incrementPCby(2);
            addr = retrieveDirect(first).address;
            num1 = getDataValueFrom(ACC);
            setDataValueTo(addr, num1);
            if (addr === 153) serialHandler.sendDataPrepare(num1);
            return 1;
        case 73:
            incrementPCby(2);
            addr = retrieveDirect(first).address;
            num1 = retrieveRn(second).value;
            setDataValueTo(addr, num1);
            if (addr === 153) serialHandler.sendDataPrepare(num1);
            return 2;
        case 74:
            incrementPCby(3);
            num1 = retrieveImmediate(second);
            setDPTRValueTo(num1);
            return 2;
        case 75:
            incrementPCby(2);
            addr = retrieveRn(first).address;
            num1 = retrieveImmediate(second);
            setDataValueTo(addr, num1);
            return 1;
        case 76:
            incrementPCby(1);
            addr = retrieveRn(first).address;
            num1 = getDataValueFrom(ACC);
            setDataValueTo(addr, num1);
            return 1;
        case 77:
            incrementPCby(2);
            portData = retrieveDirect(second).value;
            edgesData = null;
            if (isPPort(second)){
                edgesData = getPPortEdgesData(second);
            }
            num1 = recalculateDataValue(portData, edgesData);
            addr = retrieveRn(first).address;
            setDataValueTo(addr, num1);
            return 2;
        case 78:
            incrementPCby(2);
            addr = retrieveSpecialBit(first).address;
            bit = retrieve(first).bit;
            num1 = retrieveC();
            setBitInAddr(addr, bit, num1);
            return 2;
        case 79:
            incrementPCby(2);
            num1 = retrieveSpecialBit(second).value;
            setBitInAddr(PSW, CY, num1);
            return 1;
        case 80:
            incrementPCby(1);
            addr = getDPTRValue() + getDataValueFrom(ACC);
            num1 = getCodeValueFrom(addr);
            setDataValueTo(ACC, num1);
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 2;
        case 81:
            incrementPCby(1);
            addr = getPCValue() + getDataValueFrom(ACC);
            num1 = getCodeValueFrom(addr);
            setDataValueTo(ACC, num1);
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 2;
        case 82:
            incrementPCby(1);
            addr = retrieveAdRi(first).address;
            num1 = retrieveA();
            setExtValueTo(addr, num1);
            return 2;
        case 83:
            incrementPCby(1);
            addr = retrieveDPTR();
            setDataValueTo(ACC, ext[addr]);
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 2;
        case 84:
            incrementPCby(1);                       
            addr = retrieveAdRi(second).address;
            setDataValueTo(ACC, ext[addr]);
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 2;
        case 85:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC);
            num2 = getDataValueFrom(B);
            result = num1 * num2;
            res1 = retrieve8bitsOf(result, false);
            res2 = retrieve8bitsOf(result, true);
            setDataValueTo(ACC, res1);
            setDataValueTo(B, res2);
            setBitInAddr(PSW, CY, 0);
            if(result > 0xFF) 
                setBitInAddr(PSW, OV, 1);
            else
                setBitInAddr(PSW, OV, 0);
            return 4;
        case 86:
            incrementPCby(1);
            
            return 1;
        case 87:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            num2 = retrieveImmediate(second).toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == '1' || num2[i] == '1')
                    result = result + '1';
                else
                    result = result + '0';
            }
            setDataValueTo(ACC, parseInt(result, 2));
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 88:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            num2 = retrieveAdRi(second).value.toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == '1' || num2[i] == '1')
                    result = result + '1';
                else
                    result = result + '0';
            }
            setDataValueTo(ACC, parseInt(result, 2));
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 89:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            num2 = retrieveDirect(second).value.toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == '1' || num2[i] == '1')
                    result = result + '1';
                else
                    result = result + '0';
            }
            setDataValueTo(ACC, parseInt(result, 2));
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 90:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            num2 = retrieveRn(second).value.toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == '1' || num2[i] == '1')
                    result = result + '1';
                else
                    result = result + '0';
            }
            setDataValueTo(ACC, parseInt(result, 2));
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 91:
            incrementPCby(2);
            num1 = retrieveC();
            num2 = retrieveNotBit(second);
            if(num1 == 1 || num2 == 1)
                result = 1;
            else
                result = 0;
            setBitInAddr(PSW, CY, result);
            return 2;
        case 92:
            incrementPCby(2);
            num1 = retrieveC();
            num2 = retrieveBit(second).value;
            if(num1 == 1 || num2 == 1)
                result = 1;
            else
                result = 0;
            setBitInAddr(PSW, CY, result);
            return 2;
        case 93:
            incrementPCby(3);
            num1 = retrieveDirect(first).value.toString(2).padStart(8, '0');
            num2 = retrieveImmediate(second).toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == '1' || num2[i] == '1')
                    result = result + '1';
                else
                    result = result + '0';
            }
            setDataValueTo(retrieveDirect(first).address, parseInt(result, 2));
            return 2;
        case 94:
            incrementPCby(3);
            num1 = retrieveDirect(first).value.toString().padStart(8, '0');
            num2 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == '1' || num2[i] == '1')
                    result = result + '1';
                else
                    result = result + '0';
            }
            setDataValueTo(retrieveDirect(first).address, parseInt(result, 2));
            return 1;
        case 95:
            incrementPCby(2);
            num1 = retrieveC();
            num2 = retrieveNotSpecialBit(second);
            if(num1 == 1 || num2 == 1)
                result = 1;
            else
                result = 0;
            setBitInAddr(PSW, CY, result);
            return 2;
        case 96:
            incrementPCby(2);
            num1 = retrieveC();
            num2 = retrieveSpecialBit(second).value;
            if(num1 == 1 || num2 == 1)
                result = 1;
            else
                result = 0;
            setBitInAddr(PSW, CY, result);
            return 2;
        case 97:
            incrementPCby(2);
            addr1 = getDataValueFrom(SP);
            num1 = getDataValueFrom(addr1);
            addr2 = retrieveDirect(first).address;
            setDataValueTo(addr2, num1);
            decrementSPby(1);
            return 2;
        case 98:
            incrementPCby(2);
            incrementSPby(1);
            num1 = retrieveDirect(first).value;
            addr = getDataValueFrom(SP);
            setDataValueTo(addr, num1);
            return 2;
        case 99:
            incrementPCby(1);
            num1 = getDataValueFrom(getDataValueFrom(SP));
            decrementSPby(1);
            num2 = getDataValueFrom(getDataValueFrom(SP));
            decrementSPby(1);
            setPCValueTo(combineTo16bit(num1, num2));
            return 2;
        case 100:
            incrementPCby(1);
            num1 = getDataValueFrom(getDataValueFrom(SP));
            decrementSPby(1);
            num2 = getDataValueFrom(getDataValueFrom(SP));      //RETI
            decrementSPby(1);
            setPCValueTo(combineTo16bit(num1, num2));
            return 2;
        case 101:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            bit7 = num1.substring(0, 1);
            num1 = num1.substring(1, 8) + bit7;
            setDataValueTo(ACC, parseInt(num1,2));
            return 1;
        case 102:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            bit7 = num1.substring(0, 1);
            num1 = num1.substring(1, 8) + retrieveC();
            setBitInAddr(PSW, CY, parseInt(bit7, 2));
            setDataValueTo(ACC, parseInt(num1,2));
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 103:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            bit0 = num1.substring(7);
            num1 = bit0 + num1.substring(0, 7);
            setDataValueTo(ACC, parseInt(num1,2));
            return 1;
        case 104:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            bit0 = num1.substring(7);
            num1 = retrieveC() + num1.substring(0, 7);
            setBitInAddr(PSW, CY, parseInt(bit0, 2));
            setDataValueTo(ACC, parseInt(num1,2));
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            return 1;
        case 105:
            incrementPCby(2);
            addr = retrieveBit(first).address;
            bit = retrieveBit(first).bit;
            setBitInAddr(addr, bit, 1);
            return 1;
        case 106:
            incrementPCby(1);
            setBitInAddr(PSW, CY, 1);
            return 1;
        case 107:
            incrementPCby(2);
            addr = retrieveSpecialBit(first).address;
            bit = retrieveSpecialBit(first).bit;
            setBitInAddr(addr, bit, 1);
            return 1;
        case 108:
            incrementPCby(2);
            label = retrieveAddrFromLabel(first);
            setPCValueTo(label);
            return 2;
        case 109:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveImmediate(second);
            result = num1 - num2;
            if (result < 0){
                result = 0x100 - Math.abs(result);
                setBitInAddr(PSW, CY, 1);
            }
            else
                setBitInAddr(PSW, CY, 0);           //CY
            setDataValueTo(ACC, result);
            //OVERFLOW
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            if(getNibbleOf(num1, false) < getNibbleOf(num2, false))
                setBitInAddr(PSW, AC, 1);
            else
                setBitInAddr(PSW, AC, 0);
            if((detectByteSignedPositive(num1) && detectByteSignedPositive(num2) && !detectByteSignedPositive(result))||
            (!detectByteSignedPositive(num1) && !detectByteSignedPositive(num2) && detectByteSignedPositive(result)))    //OV
                setBitInAddr(PSW, OV, 1);
            else 
                setBitInAddr(PSW, OV, 0);
            if(getNibbleOf(result, true) != 0 && getNibbleOf(result, false) == 0xF)
                setBitInAddr(PSW, AC, 1);
            else
                setBitInAddr(PSW, AC, 0);
            return 1;
        case 110:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveAdRi(second).value;
            result = num1 - num2;
            if (result < 0){                       
                result = 0x100 - Math.abs(result);
                setBitInAddr(PSW, CY, 1);
            }
            else
                setBitInAddr(PSW, CY, 0);           //CY
            setDataValueTo(ACC, result);
            //OVERFLOW
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            if(getNibbleOf(num1, false) < getNibbleOf(num2, false))
                setBitInAddr(PSW, AC, 1);
            else
                setBitInAddr(PSW, AC, 0);
            if((detectByteSignedPositive(num1) && detectByteSignedPositive(num2) && !detectByteSignedPositive(result))||
            (!detectByteSignedPositive(num1) && !detectByteSignedPositive(num2) && detectByteSignedPositive(result)))    //OV
                setBitInAddr(PSW, OV, 1);
            else 
                setBitInAddr(PSW, OV, 0);
            if(getNibbleOf(result, true) != 0 && getNibbleOf(result, false) == 0xF)
                setBitInAddr(PSW, AC, 1);
            else
                setBitInAddr(PSW, AC, 0);
            return 1;
        case 111:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveDirect(second).value;
            result = num1 - num2;
            if (result < 0){
                result = 0x100 - Math.abs(result);
                setBitInAddr(PSW, CY, 1);
            }
            else
                setBitInAddr(PSW, CY, 0);           //CY
            setDataValueTo(ACC, result);
            //OVERFLOW
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            if(getNibbleOf(num1, false) < getNibbleOf(num2, false))
                setBitInAddr(PSW, AC, 1);
            else
                setBitInAddr(PSW, AC, 0);
            if((detectByteSignedPositive(num1) && detectByteSignedPositive(num2) && !detectByteSignedPositive(result))||
            (!detectByteSignedPositive(num1) && !detectByteSignedPositive(num2) && detectByteSignedPositive(result)))    //OV
                setBitInAddr(PSW, OV, 1);
            else 
                setBitInAddr(PSW, OV, 0);
            if(getNibbleOf(result, true) != 0 && getNibbleOf(result, false) == 0xF)
                setBitInAddr(PSW, AC, 1);
            else
                setBitInAddr(PSW, AC, 0);
            return 1;
        case 112:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveRn(second).value;
            result = num1 - num2;
            if (result < 0){
                result = 0x100 - Math.abs(result);
                setBitInAddr(PSW, CY, 1);
            }
            else
                setBitInAddr(PSW, CY, 0);           //CY
            setDataValueTo(ACC, result);
            //OVERFLOW
            if(getDataValueFrom(ACC) % 2 != 0)      //P
                setBitInAddr(PSW, P, 1);
            else
                setBitInAddr(PSW, P, 0);
            if(getNibbleOf(num1, false) < getNibbleOf(num2, false))
                setBitInAddr(PSW, AC, 1);
            else
                setBitInAddr(PSW, AC, 0);
            if((detectByteSignedPositive(num1) && detectByteSignedPositive(num2) && !detectByteSignedPositive(result))||
            (!detectByteSignedPositive(num1) && !detectByteSignedPositive(num2) && detectByteSignedPositive(result)))    //OV
                setBitInAddr(PSW, OV, 1);
            else 
                setBitInAddr(PSW, OV, 0);
            if(getNibbleOf(result, true) != 0 && getNibbleOf(result, false) == 0xF)
                setBitInAddr(PSW, AC, 1);
            else
                setBitInAddr(PSW, AC, 0);
            return 1;
        case 113:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC);
            hi1 = getNibbleOf(num1, true);
            lo1 = getNibbleOf(num1, false);
            num2 = parseInt(lo1.toString(2) + hi1.toString(2).padStart(4, '0'), 2);
            setDataValueTo(ACC, num2);
            return 1;
        case 114:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveAdRi(second).value;
            addr2 = retrieveAdRi(second).address;
            setDataValueTo(ACC, num2);
            setDataValueTo(addr2, num1);
            return 1;
        case 115:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveDirect(second).value;
            addr2 = retrieveDirect(second).address;
            setDataValueTo(ACC, num2);
            setDataValueTo(addr2, num1);
            return 1;
        case 116:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveRn(second).value;
            addr2 = retrieveRn(second).address;
            setDataValueTo(ACC, num2);
            setDataValueTo(addr2, num1);
            return 1;
        case 117:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC);
            num2 = retrieveAdRi(second).value;
            addr2 = retrieveAdRi(second).address;
            txt1 = getNibbleOf(num1, true).toString(2).padStart(4, '0') + getNibbleOf(num2, false).toString(2).padStart(4, '0');
            txt2 = getNibbleOf(num2, true).toString(2).padStart(4, '0') + getNibbleOf(num1, false).toString(2).padStart(4, '0');
            setDataValueTo(ACC, parseInt(txt1,2));
            setDataValueTo(addr2, parseInt(txt2,2));
            return 1;
        case 118:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            num2 = retrieveImmediate(second).toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == num2[i])
                    result = result + "0";
                else
                result = result + "1";
            }
            setDataValueTo(ACC, parseInt(result, 2));
            return 1;
        case 119:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            num2 = retrieveAdRi(second).value.toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == num2[i])
                    result = result + "0";
                else
                result = result + "1";
            }
            setDataValueTo(ACC, parseInt(result, 2));
            return 1;
        case 120:
            incrementPCby(2);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            num2 = retrieveDirect(second).value.toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == num2[i])
                    result = result + "0";
                else
                result = result + "1";
            }
            setDataValueTo(ACC, parseInt(result, 2));
            return 1;
        case 121:
            incrementPCby(1);
            num1 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            num2 = retrieveRn(second).value.toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == num2[i])
                    result = result + "0";
                else
                result = result + "1";
            }
            setDataValueTo(ACC, parseInt(result, 2));
            return 1;
        case 122:
            incrementPCby(3);
            addr1 = retrieveDirect(first).address;
            num1 = getDataValueFrom(addr1).toString(2).padStart(8, '0');
            num2 = retrieveImmediate(second).toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == num2[i])
                    result = result + "0";
                else
                result = result + "1";
            }
            setDataValueTo(addr1, parseInt(result, 2));
            return 2;
        case 123:
            incrementPCby(3);
            addr1 = retrieveDirect(first).address;
            num1 = getDataValueFrom(addr1).toString(2).padStart(8, '0');
            num2 = getDataValueFrom(ACC).toString(2).padStart(8, '0');
            result = "";
            for (let i = 0; i < 8; i++) {
                if(num1[i] == num2[i])
                    result = result + "0";
                else
                result = result + "1";
            }
            setDataValueTo(addr1, parseInt(result, 2));
            return 1;
    } 
}

