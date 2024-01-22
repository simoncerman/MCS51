class SerialMonitor extends Periphery {
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
        this.modeSwitch = null;
        this.connectionSettings = null;
        this.sendQueue = [];
        this.receiveQueue = [];

        this.mode = 0;
        this.speed = 1;
        this.bitNumber = 8;


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

    getSettings() {
        return `${this.mode} + ${this.speed}`;
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

        this.connectionSettings = document.createElement("div");
        this.connectionSettings.classList.add("connectionSettings");

        this.modeSwitch = document.createElement("select");
        this.modeSwitch.classList.add("modeSwitch");
        this.modeSwitch.innerHTML = `
            <option selected="selected" value="0">Mód 0</option>
            <option value="1">Mód 1</option>
            <option value="2">Mód 2</option>
            <option value="3">Mód 3</option>
        `;
        let ptr = this;
        this.modeSwitch.onchange = function () {
            switch (this.value) {
                case "0":
                    ptr.connectionSettings.innerHTML = ``;
                    ptr.mode = 1;
                    ptr.speed = 1;
                    ptr.bitNumber = 8;

                    break;
                case "1":
                    ptr.mode = 1;
                    ptr.connectionSettings = document.createElement("input");
                    ptr.connectionSettings.type = "number";
                    ptr.connectionSettings.onchange = function () {
                        ptr.speed = parseFloat(this.value);
                    }
                    ptr.bitNumber = 8;

                    break;
                case "2":
                    ptr.mode = 2;
                    ptr.connectionSettings = document.createElement("input");
                    ptr.connectionSettings.type = "number";
                    ptr.connectionSettings.onchange = function () {
                        ptr.speed = parseFloat(this.value);
                    }
                    ptr.bitNumber = 9;

                    break;
                case "3":
                    ptr.mode = 3;
                    ptr.connectionSettings = document.createElement("input");
                    ptr.connectionSettings.type = "number";
                    ptr.connectionSettings.onchange = function () {
                        ptr.speed = parseFloat(this.value);
                    }
                    ptr.bitNumber = 9;

                    break;
                default: return;
            };
        }


        topDetails.appendChild(name);
        topDetails.appendChild(this.connectionSettings);
        topDetails.appendChild(this.modeSwitch);

        let receiveArea = document.createElement("div");
        receiveArea.classList.add("receiveArea");

        this.recieveTextArea = document.createElement("input");
        this.recieveTextArea.classList.add("receiveTextArea");
        this.recieveTextArea.type = "text";
        this.recieveTextArea.placeholder = "Received data";

        this.parityBit = document.createElement("div");
        this.parityBit.classList.add("parityBit");
        //this.parityBit.innerHTML = "Parity: 0";

        receiveArea.appendChild(this.recieveTextArea);
        receiveArea.appendChild(this.parityBit);

        let sendingArea = document.createElement("div");
        sendingArea.classList.add("sendingArea");

        this.sendTextArea = document.createElement("input");
        this.sendTextArea.classList.add("sendTextArea");
        this.sendTextArea.type = "text";
        this.sendTextArea.placeholder = "Transmit data";

        let sendButton = document.createElement("button");
        sendButton.classList.add("sendButton");
        sendButton.innerHTML = "Send";
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
        if(!serialHandler.controlSettings(this)){return;}
        if(this.mode == 0 && serialHandler.getTI){return;}

        let data = this.sendTextArea.value;
        this.sendTextArea.value = "";
        data = data.split("");
        for (let i = 0; i < data.length; i++) {
            let hex = data[i].charCodeAt(0).toString(16);
            // hex to binary conversion
            let binary = parseInt(hex, 16).toString(2);
            // binary to 8 bit binary conversion
            while (binary.length < this.bitNumber) {
                binary = "0" + binary;
            }
            // reverse binary
            binary = binary.split("").reverse().join("");
            binary = binary.split("");
            if(this.mode = 1){;
                binary.unshift(0);
            }
            
            for (let j = 0; j < binary.length; j++) {
                this.sendQueue.push(binary[j]);
            }
        }
        if (this.dataSender == null) {
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
            }, getClockInterval() / (this.speed));
        } else {
            this.dataSender = null;
        }

    }

    receiveBit(bit) {

        console.log(bit);
        this.receiveQueue.push(bit);
        
        if (this.receiveQueue.length === this.bitNumber) {
            //let parityBit = this.receiveQueue.pop();
            //this.parityBit.innerHTML = "Parity: " + parityBit;
            this.receiveQueue = this.receiveQueue.reverse();
            let hexValue = parseInt(this.receiveQueue.join(""), 2).toString(16);
            let char = String.fromCharCode(parseInt(hexValue, 16));
            this.recieveTextArea.value += char;
            this.receiveQueue = [];
        }
    }
}