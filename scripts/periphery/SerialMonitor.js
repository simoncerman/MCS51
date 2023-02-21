// TODO: Complete implementation
class SerialMonitor extends Periphery{
    constructor(peripheryId) {
        super(peripheryId);
        this.name = "Serial Monitor";
        this.peripheryId = peripheryId;
        this.pins = [];
        this.properties = {"baudRate": "9600", "dataBits": "8", "stopBits": "1", "parity": "None", "flowControl": "None"}
        this.zoomable = false;
        this.width = 100;
        this.zoomWidth = 100;
        this.margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    }

    prepare() {
        super.prepare();
    }

    execute() {
        super.execute();
    }

    getSVG() {
        super.getSVG();
    }
}