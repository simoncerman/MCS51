
//operandy jsou stringy

function retrieveRn(operand){
    num = parseInt(operand.substring(1));
    return {
            "address" : num,
            "value" : data[num]
        };
}

function retrieveDirect(operand){
    num;
    if(operand.includes("h")){  //Hex
        num = parseInt(operand.substring(0, operand.length - 1), 16);
    }
    else if(operand.includes("b")) {    //Binary
        num = parseInt(operand.substring(0, operand.length - 1), 2);
    }
    else {  //Dec
        num = parseInt(operand);
    }
    return {
            "address" : num,
            "value" : data[num]
        };
}

function retrieveA(){
    return parseInt(data[224]);
}

function retrieveImmediate(operand){
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

function retrieveDPTR(){
    num = parseInt(data[0x83].toString(16).padStart(2, '0') + data[0x82].toString(16).padStart(2, '0'), 16);
    return num;
}

function retrieveAdRi(operand){
    operand = operand.substring(2);
    num = parseInt(operand);
    return {
                "address" : data[num],
                "value" : data[data[num]]
            };
}

function retrieveC() {
    return (getBitFromAddr(0xD0, 7));
}

function retrieveBit(operand) {
    if(operand.includes("h"))  //Hex
        num = parseInt(operand.substring(0, operand.length - 1), 16);
    else if(operand.includes("b"))    //Binary
        num = parseInt(operand.substring(0, operand.length - 1), 2);
    else  //Dec
        num = parseInt(operand);

    if (num <= 0x7F) 
        return {
            "address" : 32 + Math.floor(num/0x8),
            "bit" : num % 0x8,
            "value" : getBitFromAddr(32 + Math.floor(num/0x8), num % 0x8)
        };
    else
        return 0;
}

function retrieveNotBit(operand) {
    switch(retrieveBit(operand).value){
        case 1:
            return 0;
        case 0:
            return 1;
    }
}

function retrieveSpecialBit(operand) {
    if (operand.includes(".")){
        let bit = parseInt(operand.substring(3));
        let port = parseInt(operand.substring(1, 2));
        let address;
        switch(port){
            case 0: 
                address = 0x80;
                break;
            case 1:
                address = 0x90;
                break
            case 2:
                address = 0xA0;
                break
            case 3:
                address = 0xB0;
                break
                    
        }
        return {
                    "address" : address,
                    "bit" : bit,
                    "value" : getBitFromAddr(address, bit)
            };
    }
    if (/TF0/i.test(operand))
        return {    
                    "address" : 0x88,
                    "bit" : 5,
                    "value" : getBitFromAddr(0x88, 5)
                };
    if (/TF1/i.test(operand))
        return {
                    "address" : 0x88, 
                    "bit" : 7,
                    "value" : getBitFromAddr(0x88, 7)
                };
    if (/TR0/i.test(operand))
        return {    
                    "address" : 0x88,
                    "bit" : 4,
                    "value" : getBitFromAddr(0x88, 4)
                };
    if (/TR1/i.test(operand))
        return {
                    "address" : 0x88,
                    "bit" : 6,
                    "value" : getBitFromAddr(0x88, 6)
                }; 
    if (/IE0/i.test(operand))
        return {
                    "address" : 0x88,
                    "bit" : 1,
                    "value" : getBitFromAddr(0x88, 1)
                };
    if (/IE1/i.test(operand))
        return {
                    "address" : 0x88,
                    "bit" : 3,
                    "value" : getBitFromAddr(0x88, 3)
                };
    if (/IT0/i.test(operand))
        return {
                    "address" : 0x88,
                    "bit" : 0,
                    "value" : getBitFromAddr(0x88, 0)
                };
    if (/IT1/i.test(operand))
        return {
                    "bit" : 2,
                    "address" : 0x88,
                    "value" : getBitFromAddr(0x88, 2)
                };
    if (/SM0/i.test(operand))
        return {
                    "bit" : 7,
                    "address" : 0x98,
                    "value" : getBitFromAddr(0x98, 7)
                };
    if (/SM1/i.test(operand))
        return {
                    "bit" : 6,
                    "address" : 0x98,
                    "value" : getBitFromAddr(0x98, 6)
                };
    if (/SM2/i.test(operand))
        return {
                    "bit" : 5,
                    "address" : 0x98,
                    "value" : getBitFromAddr(0x98, 5)
                };
    if (/REN/i.test(operand))
        return {
                    "bit" : 4,
                    "address" : 0x98,
                    "value" : getBitFromAddr(0x98, 4)
                };
    if (/TB8/i.test(operand))
        return {
                    "bit" : 3,
                    "address" : 0x98,
                    "value" : getBitFromAddr(0x98, 3)
                };
    if (/RB8/i.test(operand))
        return {
                    "bit" : 2,
                    "address" : 0x98,
                    "value" : getBitFromAddr(0x98, 2)
                };
    if (/TI/i.test(operand))
        return {
                    "bit" : 1,
                    "address" : 0x98,
                    "value" : getBitFromAddr(0x98, 1)
                };
    if (/RI/i.test(operand))
        return {
                    "bit" : 0,
                    "address" : 0x98,
                    "value" : getBitFromAddr(0x98, 0)
                };
    if (/EA/i.test(operand))
        return {
                    "bit" : 7,
                    "address" : 0xA8,
                    "value" : getBitFromAddr(0xA8, 7)
                };
    if (/ES/i.test(operand))
        return {
                    "bit" : 4,
                    "address" : 0xA8,
                    "value" : getBitFromAddr(0xA8, 4)
                };
    if (/ET1/i.test(operand))
        return {
                    "bit" : 3,
                    "address" : 0xA8,
                    "value" : getBitFromAddr(0xA8, 3)
                };
    if (/EX1/i.test(operand))
        return {
                    "bit" : 2,
                    "address" : 0xA8,
                    "value" : getBitFromAddr(0xA8, 2)
                };
    if (/ET0/i.test(operand))
        return {
                    "bit" : 1,
                    "address" : 0xA8,
                    "value" : getBitFromAddr(0xA8, 1)
                };
    if (/EX0/i.test(operand))
        return {
                    "bit" : 0,
                    "address" : 0xA8,
                    "value" : getBitFromAddr(0xA8, 0)
                };
    if (/PX0/i.test(operand))
        return {
                    "bit" : 0,
                    "address" : 0xB8,
                    "value" : getBitFromAddr(0xB8, 0)
                };
    if (/PX1/i.test(operand))
        return {
                    "bit" : 2,
                    "address" : 0xB8,
                    "value" : getBitFromAddr(0xB8, 2)
                };
    if (/PT0/i.test(operand))
        return {
                    "bit" : 1,
                    "address" : 0xB8,
                    "value" : getBitFromAddr(0xB8, 1)
                };
    if (/PT1/i.test(operand))
        return {
                    "bit" : 3,
                    "address" : 0xB8,
                    "value" : getBitFromAddr(0xB8, 3)
                };
    if (/PS/i.test(operand))
        return {
                    "bit" : 4,
                    "address" : 0xB8,
                    "value" : getBitFromAddr(0xB8, 4)
                };
    if (/CY/i.test(operand))
        return {
                    "bit" : 7,
                    "address" : 0xD0,
                    "value" : getBitFromAddr(0xD0, 7)
                };
    if (/AC/i.test(operand))
        return {
                    "bit" : 6,
                    "address" : 0xD0,
                    "value" : getBitFromAddr(0xD0, 6)
                };
    if (/F0/i.test(operand))
        return {
                    "bit" : 5,
                    "address" : 0xD0,
                    "value" : getBitFromAddr(0xD0, 5)
                };
    if (/RS1/i.test(operand))
        return {
                    "bit" : 4,
                    "address" : 0xD0,
                    "value" : getBitFromAddr(0xD0, 4)
                };
    if (/RS0/i.test(operand))
        return {
                    "bit" : 3,
                    "address" : 0xD0,
                    "value" : getBitFromAddr(0xD0, 3)
                };
    if (/OV/i.test(operand))
        return {
                    "bit" : 2,
                    "address" : 0xD0,
                    "value" : getBitFromAddr(0xD0, 2)
                };
    if (/P/i.test(operand))
        return {
                    "bit" : 0,
                    "address" : 0xD0,
                    "value" : getBitFromAddr(0xD0, 0)
                };
}

function retrieveNotSpecialBit(operand) {
    switch(retrieveSpecialBit(operand).value){
        case 1:
            return 0;
        case 0:
            return 1;
    }
}

function retrieve8bitsOfPC (higher) {
    if (higher == false) {
        return parseInt($('#pc').val().substring(3), 16);
    }
    else {
        return parseInt($('#pc').val().substring(2, 3), 16);
    }
}

function retrieve8bitsOf(value, higher) {
    n1 = value.toString(2).padStart(16, '0');
    n2 = "";
    if(higher == true){
        n2 = n1.substring(0, 8);
    }
    else {
        n2 = n1.substring(8);
    }
    return parseInt(n2, 2);
}

function retrieveAddrFromDirect(operand) {
    return retrieveImmediate("#" + operand);
}

function InstructionFromAddress(address) {
    for (let i = 0; i < instructionsArray.length; i++) {
        if(instructionsArray[i].address == address){
            return instructionsArray[i];
        }
    }
    return 0;
}
