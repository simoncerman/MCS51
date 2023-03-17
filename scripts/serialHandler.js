class SerialHandler{
    constructor() {
        this.receiveBitBuffer = [];
        this.ro = document.getElementById("ro");
        this.sendQueue = [];
        this.dataSender = null;
    }

    getSerialMonitors() {
        let serialMonitors = [];
        for (let i = 0; i < grid.elements.length; i++) {
            if (grid.elements[i].name === "SerialMonitor") {
                serialMonitors.push(grid.elements[i]);
            }
        }
        return serialMonitors;
    }

    receiveData(bit) {
        this.ro.value = bit;
        this.receiveBitBuffer.unshift(bit);
        if (this.receiveBitBuffer.length === 9) {
            // parity bit is first bit - get it and leave 8 bits alone
            let parityBit = this.receiveBitBuffer.pop();
            let hexValue = parseInt(this.receiveBitBuffer.join(""), 2).toString(16);
            // convert to decimal
            let value = parseInt(hexValue, 16).toString(10);

            this.setRB8(parityBit);
            this.setRI(1);
            this.moveToReceiveBuffer(value);

            this.receiveBitBuffer = [];
        }
    }

    moveToReceiveBuffer(value) {
        // value to int
        let intValue = parseInt(value);
        setDataValueTo(0x99, intValue);
    }

    setRB8(bit) {
        this.setSCONBit(5, bit);
    }
    setTI(bit) {
        this.setSCONBit(6, bit);
    }
    setRI(bit) {
        this.setSCONBit(7, bit);
    }
    setSCONBit(position, bit) {
        let SCONValue = getDataValueFrom(SCON);
        let SCONHexadecimal = parseInt(SCONValue, 10).toString(16);
        let SCONBinary = parseInt(SCONHexadecimal, 16).toString(2);
        let SCONBinaryArray = SCONBinary.split("");
        while (SCONBinaryArray.length < 8) {
            SCONBinaryArray.unshift("0");
        }
        SCONBinaryArray[position] = bit.toString();
        console.log(SCONBinaryArray);
        SCONBinary = SCONBinaryArray.join("");
        SCONHexadecimal = parseInt(SCONBinary, 2).toString(16);
        SCONValue = parseInt(SCONHexadecimal, 16).toString(10);
        setDataValueTo(SCON, SCONValue);
        // update table of data
        updateTableData();
    }

    sendDataPrepare(value) {
        this.sendQueue = [];
        let hex = parseInt(value, 10).toString(16);
        let binary = parseInt(hex, 16).toString(2);
        while (binary.length < 8) {
            binary = "0" + binary;
        }
        binary = binary.split("");
        let parityBit = this.generateParityBit(binary);
        binary.unshift(parityBit);
        for (let j = 0; j < binary.length; j++) {
            this.sendQueue.push(binary[j]);
        }
        if (this.dataSender == null){
            this.sendData();
        }
    }

    sendData() {
        console.log(this.sendQueue)
        if (this.sendQueue.length === 0) {
            this.dataSender = null;
            return;
        }

        let serialMonitors = this.getSerialMonitors()
        let bit = this.sendQueue.pop();

        // set bit to wo
        document.getElementById("wo").value = bit;

        for (let i = 0; i < serialMonitors.length; i++) {
            serialMonitors[i].receiveBit(bit);
        }

        if (this.sendQueue.length !== 0) {
            this.dataSender = setTimeout(() => {
                this.sendData();
                this.setTI(1);
            }, getClockInterval()*5);
        } else {
            this.dataSender = null;
        }
    }

    generateParityBit(bitArray) {
        let parityBit = 0;
        for (let i = 0; i < bitArray.length; i++) {
            parityBit += parseInt(bitArray[i]);
        }
        return parityBit % 2;
    }
}
let serialHandler = new SerialHandler();