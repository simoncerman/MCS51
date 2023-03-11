// TODO: Complete implementation
class SerialMonitor extends Periphery{
    constructor(peripheryId) {
        super(peripheryId);
        this.name = "SerialMonitor";
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
        this.receiveQueue = [];
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

        let receiveArea = document.createElement("div");
        receiveArea.classList.add("receiveArea");

        this.recieveTextArea = document.createElement("input");
        this.recieveTextArea.classList.add("receiveTextArea");
        this.recieveTextArea.type = "text";
        this.recieveTextArea.placeholder = "Prijata data";

        this.parityBit = document.createElement("div");
        this.parityBit.classList.add("parityBit");
        this.parityBit.innerHTML = "Parita: 0";

        receiveArea.appendChild(this.recieveTextArea);
        receiveArea.appendChild(this.parityBit);

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
        serialMonitor.appendChild(receiveArea);
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
            let parityBit = serialHandler.generateParityBit(binary);
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

    receiveBit(bit) {
        console.log(bit);
        this.receiveQueue.push(bit);
        if (this.receiveQueue.length === 9) {
            let parityBit = this.receiveQueue.pop();
            // TODO: show parity bit
            this.receiveQueue = this.receiveQueue.reverse();
            let hexValue = parseInt(this.receiveQueue.join(""), 2).toString(16);
            let char = String.fromCharCode(parseInt(hexValue, 16));
            console.log(char);
            this.recieveTextArea.value += char;
            this.receiveQueue = [];
        }
    }
}