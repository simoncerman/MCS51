class LCD16x2Display extends Periphery{
    // FIXME: Modal opening will close the LCD16x2Display and show description
    // change to modal will contain periphery but grid too
    constructor(peripheryId) {
        super(peripheryId);
        this.name = "LCD16x2Display";

        // properties for modal and zoom
        this.zoomable = true;
        this.width = 400;
        this.zoomWidth = 1000;

        // generate data base of display characters
        this.row1 = null;
        this.row2 = null;
        this.chars = [];
        this.display = null;
        this.generateDisplay();

        // set margins
        this.margin = {
            top: 30,
            right: 0,
            bottom: 30,
            left: 0
        }

        this.pins = [
            // VSS - GND
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 11,
                    y: -7
                },
                optionSelector : null,
                textNode: null,
                description:{
                    text: "VSS",
                }
            },
            // VCC - 5V
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 26,
                    y: -7
                },
                optionSelector : null,
                textNode: null
            },
            // VEE - Contrast
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 41,
                    y: -7
                },
                optionSelector : null,
                textNode: null
            },
            // RS - Register Select
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 56,
                    y: -7
                },
                optionSelector : null,
                textNode: null
            },
            // RW - Read/Write
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 70,
                    y: -7
                },
                optionSelector : null,
                textNode: null
            },
            // E - Enable
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 84,
                    y: -7
                },
                optionSelector : null,
                textNode: null
            },
            // DB0 - Data Bit 0
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 7.5,
                    y: 100
                },
                optionSelector : null,
                textNode: null
            },
            // DB1 - Data Bit 1
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 19,
                    y: 100
                },
                optionSelector : null,
                textNode: null
            },
            // DB2 - Data Bit 2
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 30,
                    y: 100
                },
                optionSelector : null,
                textNode: null
            },
            // DB3 - Data Bit 3
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 41.5,
                    y: 100
                },
                optionSelector : null,
                textNode: null
            },
            // DB4 - Data Bit 4
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 52.5,
                    y: 100
                },
                optionSelector : null,
                textNode: null
            },
            // DB5 - Data Bit 5
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 64,
                    y: 100
                },
                optionSelector : null,
                textNode: null
            },
            // DB6 - Data Bit 6
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 75.5,
                    y: 100
                },
                optionSelector : null,
                textNode: null
            },
            // DB7 - Data Bit 7
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 86.5,
                    y: 100
                },
                optionSelector : null,
                textNode: null
            },
        ];
    }


    generateDisplay() {
        // generate display
        this.display = document.createElement("div");
        this.display.classList.add("display");

        // pin descriptions
        let pinDescriptions = this.generatePinDescriptions();

        // append top pin descriptions
        this.display.appendChild(pinDescriptions[0]);

        // append display
        let displayInner = document.createElement("div");
        displayInner.classList.add("display-inner");
        this.display.appendChild(displayInner);

        // append bottom pin descriptions
        this.display.appendChild(pinDescriptions[1]);

        // first row
        let row1 = document.createElement("div");
        row1.classList.add("row");
        displayInner.appendChild(row1);

        this.row1 = []
        for (let i = 0; i < 16; i++) {
            let char = document.createElement("div");
            char.classList.add("char");
            char.classList.add("char-" + i);
            row1.appendChild(char);
            this.row1.push(char);
        }

        // second row
        let row2 = document.createElement("div");
        row2.classList.add("row");
        displayInner.appendChild(row2);

        this.row2 = []
        for (let i = 0; i < 16; i++) {
            let char = document.createElement("div");
            char.classList.add("char");
            char.classList.add("char-" + (i + 16));
            row2.appendChild(char);
            this.row2.push(char);
        }

        console.log(this.display);

    }
    generatePinDescriptions() {
        // top pin descriptions
        let topPinDescriptions = ["VSS", "VCC", "VEE", "RS", "RW", "E"];
        let topPinDescriptionsDIV = document.createElement("div");
        topPinDescriptionsDIV.classList.add("pin-descriptions");

        for (let i = 0; i < topPinDescriptions.length; i++) {
            let pinDescription = document.createElement("div");
            pinDescription.classList.add("pin-description");
            pinDescription.innerHTML = topPinDescriptions[i];
            topPinDescriptionsDIV.appendChild(pinDescription);
        }

        let bottomPinDescriptions = ["DB0", "DB1", "DB2", "DB3", "DB4", "DB5", "DB6", "DB7"];
        let bottomPinDescriptionsDIV = document.createElement("div");
        bottomPinDescriptionsDIV.classList.add("pin-descriptions");

        for (let i = 0; i < bottomPinDescriptions.length; i++) {
            let pinDescription = document.createElement("div");
            pinDescription.classList.add("pin-description");
            pinDescription.innerHTML = bottomPinDescriptions[i];
            bottomPinDescriptionsDIV.appendChild(pinDescription);
        }

        return [topPinDescriptionsDIV, bottomPinDescriptionsDIV];
    }

    execute() {
        super.execute();
    }

    getSVG(width) {
        this.display.style.width = width + "px";
        this.display.style.height = width * 0.25 + "px";
        return this.display;
    }
}