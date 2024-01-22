class SerialHandler {
    constructor() {
        this.receiveBitBuffer = [];
        this.ro = document.getElementById("ro");
        this.sendQueue = [];
        this.dataSender = null;

        this.mode = 0;
        this.speed = 1;
        this.bitNumber = 8;
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
        if(this.mode == 0 && this.getTI() == 0){return;}

        this.ro.value = bit;
        this.receiveBitBuffer.unshift(bit);
        if (this.receiveBitBuffer.length === this.bitNumber) {
            // parity bit is first bit - get it and leave 8 bits alone
            let nineBit = 0;
            if(this.mode!=0){nineBit = this.receiveBitBuffer.pop(); this.setRI(1);}
            let hexValue = parseInt(this.receiveBitBuffer.join(""), 2).toString(16);
            // convert to decimal
            let value = parseInt(hexValue, 16).toString(10);

            this.setRB8(nineBit);
            this.moveToReceiveBuffer(value);

            this.receiveBitBuffer = [];
        }
    }

    controlSettings(monitor) {
        return `${this.mode} + ${this.speed}` === monitor.getSettings();
    }

    moveToReceiveBuffer(value) {
        // value to int
        let intValue = parseInt(value);
        setDataValueTo(0x99, intValue);
    }

    getSpeed() {
        this.getMODE();
        switch (this.mode) {
            case "0": this.speed = 1; ptr.bitNumber = 8; break;
            case "1": this.speed = (Math.pow(2, this.getSMOD()) / 32) * 1000000 / (256 - getDataValueFrom(TH1)); ptr.bitNumber = 8; break;
            case "2": this.speed = Math.pow(2, this.getSMOD()) / 64 * 12000000; ptr.bitNumber = 9; break;
            case "3": this.speed = (Math.pow(2, this.getSMOD()) / 32) * 1000000 / (256 - getDataValueFrom(TH1)); ptr.bitNumber = 9; break;
            default: return;
        }
    }

    getSCON() {
        return parseInt(parseInt(getDataValueFrom(SCON), 10).toString(16), 16).toString(2).split("");
    }

    getSMOD() {
        parseInt(parseInt(parseInt(getDataValueFrom(PCON), 10).toString(16), 16).toString(2).split("")[0]);
    }

    getMODE() {
        let SCONBinaryArray = this.getSCON();
        this.mode = parseInt(SCONBinaryArray[0]) * 2 + arseInt(SCONBinaryArray[1])
    }

    getTB8() {
        return this.getSCON()[4];
    }

    getRI() {
        return this.getSCON()[7];
    }

    getTI() {
        return this.getSCON()[6];
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
        let SCONBinaryArray = this.getSCON();
        while (SCONBinaryArray.length < 8) {
            SCONBinaryArray.unshift("0");
        }
        SCONBinaryArray[position] = bit.toString();
        console.log(SCONBinaryArray);
        setDataValueTo(SCON, parseInt(parseInt(SCONBinaryArray.join(""), 2).toString(16), 16).toString(10));
        // update table of data
        updateTableData();
    }

    sendDataPrepare(value) {
        if(this.mode == 0 && (this.getRI() == 0 || this.getTI == 1)){return;}

        this.sendQueue = [];
        let hex = parseInt(value, 10).toString(16);
        let binary = parseInt(hex, 16).toString(2);
        while (binary.length < 8) {
            binary = "0" + binary;
        }
        binary = binary.split("");
        if (this.mode == 2 || this.mode == 3) {
            binary.unshift(this.getTB8());
        } else if (this.mode == 1) {
            binary.unshift(0);
        }
        for (let j = 0; j < binary.length; j++) {
            this.sendQueue.push(binary[j]);
        }
        if (this.dataSender == null) {
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
            if (this.controlSettings(serialMonitors[i])) {
                serialMonitors[i].receiveBit(bit);
            }
        }

        if (this.sendQueue.length !== 0) {
            this.dataSender = setTimeout(() => {
                this.sendData();
                this.setTI(1);
            }, getClockInterval() / (this.speed));
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