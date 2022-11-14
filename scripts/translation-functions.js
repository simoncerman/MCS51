
//operandy jsou stringy

function retrieveCodeRn(operand){
    return parseInt(operand.substring(1));
}

function retrieveCodeDirect(operand){
    if(operand.includes("h")){  //Hex
        num = parseInt(operand.substring(0, operand.length - 1), 16);
        return num;
    }
    else if(operand.includes("b")) {    //Binary
        num = parseInt(operand.substring(0, operand.length - 1), 2);
        return num;
    }
    else {  //Dec
        return parseInt(operand);
    }
}

function retrieveCodeImmediate(operand){
    operand = operand.substring(1);
    if(operand.includes("h")){  //Hex
        num = parseInt(operand.substring(0, operand.length - 1), 16);
        return num;
    }
    else if(operand.includes("b")) {    //Binary
        num = parseInt(operand.substring(0, operand.length - 1), 2);
        return num;
    }
    else {  //Dec
        return parseInt(operand);
    }
}

function retrieveCodeAdRi(operand){
    operand = operand.substring(2);
    num = parseInt(operand);
    return num;
}

function retrieveCodeBit(operand){
    if(operand.includes("h"))  //Hex
        num = parseInt(operand.substring(0, operand.length - 1), 16);
    else if(operand.includes("b"))    //Binary
        num = parseInt(operand.substring(0, operand.length - 1), 2);
    else  //Dec
        num = parseInt(operand);

    if (num <= 0x7F) 
        return num;
    else
        return 0;
}

function retrieveCodeSpecialBit(operand){
    if (operand.includes(".")){
        let bit = parseInt(operand.substring(3));
        let port = parseInt(operand.substring(1, 2));
        switch(port){
            case 0: 
                return (0x80+ bit);
            case 1:
                return (0x90+ bit);
            case 2:
                return (0xA0+ bit);
            case 3:
                return (0xB0+ bit);
        }
    }
    if (/TF0/i.test(operand))
        return (0x88+ 5);
    if (/TF1/i.test(operand))
        return (0x88+ 7);
    if (/TR0/i.test(operand))
        return (0x88+ 4);
    if (/TR1/i.test(operand))
        return (0x88+ 6);
    if (/IE0/i.test(operand))
        return (0x88+ 1);
    if (/IE1/i.test(operand))
        return (0x88+ 3);
    if (/IT0/i.test(operand))
        return (0x88+ 0);
    if (/IT1/i.test(operand))
        return (0x88+ 2);
    if (/SM0/i.test(operand))
        return (0x98+ 7);
    if (/SM1/i.test(operand))
        return (0x98+ 6);
    if (/SM2/i.test(operand))
        return (0x98+ 5);
    if (/REN/i.test(operand))
        return (0x98+ 4);
    if (/TB8/i.test(operand))
        return (0x98+ 3);
    if (/RB8/i.test(operand))
        return (0x98+ 2);
    if (/TI/i.test(operand))
        return (0x98+ 1);
    if (/RI/i.test(operand))
        return (0x98+ 0);
    if (/EA/i.test(operand))
        return (0xA8+ 7);
    if (/ES/i.test(operand))
        return (0xA8+ 4);
    if (/ET1/i.test(operand))
        return (0xA8+ 3);
    if (/EX1/i.test(operand))
        return (0xA8+ 2);
    if (/ET0/i.test(operand))
        return (0xA8+ 1);
    if (/EX0/i.test(operand))
        return (0xA8+ 0);
    if (/PX0/i.test(operand))
        return (0xB8+ 0);
    if (/PX1/i.test(operand))
        return (0xB8+ 2);
    if (/PT0/i.test(operand))
        return (0xB8+ 1);
    if (/PT1/i.test(operand))
        return (0xB8+ 3);
    if (/PS/i.test(operand))
        return (0xB8+ 4);
    if (/CY/i.test(operand))
        return (0xD0+ 7);
    if (/AC/i.test(operand))
        return (0xD0+ 6);
    if (/F0/i.test(operand))
        return (0xD0+ 5);
    if (/RS1/i.test(operand))
        return (0xD0+ 4);
    if (/RS0/i.test(operand))
        return (0xD0+ 3);
    if (/OV/i.test(operand))
        return (0xD0+ 2);
    if (/P/i.test(operand))
        return (0xD0+ 0);
}

function retrieveAddrFromLabel(label){
    for (let i = 0; i < labelArray.length; i++) {
        if(label == labelArray[i].name)
        {
            return labelArray[i].refAddr;
        }
    }
    debugger;
    return 0;
}