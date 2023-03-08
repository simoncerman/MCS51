// TODO: Complete implementation
class SerialMonitor extends Periphery{
    constructor(peripheryId) {
        super(peripheryId);
        this.name = "Serial Monitor";
        this.peripheryId = peripheryId;
        this.pins = [];
        this.properties = {"baudRate": "9600", "dataBits": "8", "stopBits": "1", "parity": "None", "flowControl": "None"}
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
        let dataToSend = [];
        for (let i = 0; i < data.length; i++) {
            let hex = data[i].charCodeAt(0).toString(16);
            dataToSend.push(hex);
            this.sendQueue.push(hex);
        }
        if (this.dataSender == null){
            this.sendData(dataToSend);
        }

    }
    sendData(data) {
        if (data.length === 0) {
            this.dataSender = null;
            return;
        }
        this.dataSender = setTimeout(() => {
            let dataToSend = this.sendQueue.shift();
            setDataValueTo(0x98, dataToSend)
            if (this.sendQueue.length !== 0) {
                this.sendData(dataToSend);
            } else {
                this.dataSender = null;
            }
        }, 1000);
    }
}