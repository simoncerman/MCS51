// TODO: Complete implementation
class SerialMonitor extends Periphery{
    constructor(peripheryId) {
        super(peripheryId);
        this.name = "Serial Monitor";
        this.peripheryId = peripheryId;
        this.pins = [];
        this.zoomable = false;
        this.width = 400;
        this.zoomWidth = 400;
        this.margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
        this.serialMonitor = null;
        this.recieveTextArea = null;
        this.sendTextArea = null;
        this.dataSender = null;
        this.sendQueue = [];
        this.recieveQueue = [];
    }

    prepare() {
        super.prepare();
    }

    execute() {
        super.execute();
    }

    getSVG() {
        if (this.serialMonitor == null)
            this.serialMonitor = this.generateMonitor();
        return this.serialMonitor;
    }
    generateMonitor() {
        let serialMonitor = document.createElement("div");
        serialMonitor.classList.add("serialMonitor");
        serialMonitor.style.width = this.width + "px";
        serialMonitor.id = this.peripheryId;

        let topDetails = document.createElement("div");
        topDetails.classList.add("topDetails");

        let name = document.createElement("div");
        name.innerHTML = this.name;

        let baudRate = document.createElement("div");
        baudRate.classList.add("baudRate");
        baudRate.innerHTML = "Baud Rate: 9600";

        topDetails.appendChild(name);
        topDetails.appendChild(baudRate);

        this.recieveTextArea = document.createElement("input");
        this.recieveTextArea.classList.add("recieveTextArea");
        this.recieveTextArea.type = "text";
        this.recieveTextArea.placeholder = "Prijata data";


        let sendingArea = document.createElement("div");
        sendingArea.classList.add("sendingArea");

        this.sendTextArea = document.createElement("input");
        this.sendTextArea.classList.add("sendTextArea");
        this.sendTextArea.type = "text";
        this.sendTextArea.placeholder = "Odeslat data";

        let sendButton = document.createElement("button");
        sendButton.classList.add("sendButton");
        sendButton.innerHTML = "Odeslat";
        sendButton.onclick = () => {
            this.sendDataPrepare();
        }

        sendingArea.appendChild(this.sendTextArea);
        sendingArea.appendChild(sendButton);

        serialMonitor.appendChild(topDetails);
        serialMonitor.appendChild(this.recieveTextArea);
        serialMonitor.appendChild(sendingArea);

        this.serialMonitor = serialMonitor;
        return serialMonitor;
    }
    sendDataPrepare() {
        let data = this.sendTextArea.value;
        this.sendTextArea.value = "";
        data = data.split("");
        for (let i = 0; i < data.length; i++) {
            let hex = data[i].charCodeAt(0).toString(16);
            // hex to binary conversion
            let binary = parseInt(hex, 16).toString(2);
            // binary to 8 bit binary conversion
            while (binary.length < 8) {
                binary = "0" + binary;
            }
            // reverse binary
            binary = binary.split("").reverse().join("");
            binary = binary.split("");
            let parityBit = this.generateParityBit(binary);
            binary.unshift(parityBit);
            for (let j = 0; j < binary.length; j++) {
                this.sendQueue.push(binary[j]);
            }
        }
        if (this.dataSender == null){
            this.sendData();
        }
    }
    sendData() {
        if (this.sendQueue.length === 0) {
            this.dataSender = null;
            return;
        }
        let bit = this.sendQueue.shift();
        serialHandler.receiveData(bit)
        if (this.sendQueue.length !== 0) {
            this.dataSender = setTimeout(() => {
                this.sendData();
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

    recieveData(bit) {
        this.recieveQueue.push(bit);
        if (this.recieveQueue.length === 9) {
            let parityBit = this.recieveQueue.pop();
            // TODO: show parity bit
            let hexValue = parseInt(this.recieveQueue.join(""), 2).toString(16);
            let char = String.fromCharCode(parseInt(hexValue, 16));
            this.recieveTextArea.value += char;
            this.recieveQueue = [];
        }
    }
}