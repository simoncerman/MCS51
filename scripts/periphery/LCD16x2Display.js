class LCD16x2Display extends Periphery {
    constructor(peripheryId) {
        super(peripheryId);
        this.name = "LCD16x2Display";

        this.highNibble = null;

        // properties for modal and zoom
        this.zoomable = true;
        this.width = 400;
        this.zoomWidth = 1000;

        // generate data-based of display characters
        this.row0 = null;
        this.row1 = null;

        // rows data
        this.rows = [
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
        ];

        this.displayPowered = false;
        this.display = {
            objectDisplay: null,
            isOn: true,
        }
        this.generateDisplay();

        // cursor stuff
        this.cursor = {
            isOn: true,
            position: 0,
            row: 0,
            isBlinking: false,
        }

        // set margins
        this.margin = {
            top: 30,
            right: 0,
            bottom: 30,
            left: 0
        }

        this.isFallingEdge = true;

        this.pins = [
            // VSS - GND
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 11,
                    y: -7
                },
                optionSelector: null,
                textNode: null,
                description: {
                    text: "VSS",
                }
            },
            // VCC - 5V
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 26,
                    y: -7
                },
                optionSelector: null,
                textNode: null
            },
            // VEE - Contrast
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 41,
                    y: -7
                },
                optionSelector: null,
                textNode: null
            },
            // RS - Register Select
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 56,
                    y: -7
                },
                optionSelector: null,
                textNode: null
            },
            // RW - Read/Write
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 70,
                    y: -7
                },
                optionSelector: null,
                textNode: null
            },
            // E - Enable
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 84,
                    y: -7
                },
                optionSelector: null,
                textNode: null
            },
            // DB0 - Data Bit 0
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 7.5,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            // DB1 - Data Bit 1
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 19,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            // DB2 - Data Bit 2
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 30,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            // DB3 - Data Bit 3
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 41.5,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            // DB4 - Data Bit 4
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 52.5,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            // DB5 - Data Bit 5
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 64,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            // DB6 - Data Bit 6
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 75.5,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            // DB7 - Data Bit 7
            {
                connectedTo: null,
                pinValue: null,
                pinPosition: {
                    x: 86.5,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
        ];
    }


    generateDisplay() {
        // generate display
        this.display.objectDisplay = document.createElement("div");
        this.display.objectDisplay.classList.add("display");

        // pin descriptions
        let pinDescriptions = this.generatePinDescriptions();

        // append top pin descriptions
        this.display.objectDisplay.appendChild(pinDescriptions[0]);

        // append display
        let displayInner = document.createElement("div");
        displayInner.classList.add("display-inner");
        this.display.objectDisplay.appendChild(displayInner);

        // append bottom pin descriptions
        this.display.objectDisplay.appendChild(pinDescriptions[1]);

        // first row
        let row0 = document.createElement("div");
        row0.classList.add("row");
        displayInner.appendChild(row0);

        this.row0 = []
        for (let i = 0; i < 16; i++) {
            let char = document.createElement("div");
            char.classList.add("char");
            char.classList.add("char-" + i);
            row0.appendChild(char);
            this.row0.push(char);
        }

        // second row
        let row1 = document.createElement("div");
        row1.classList.add("row");
        displayInner.appendChild(row1);

        this.row1 = []
        for (let i = 0; i < 16; i++) {
            let char = document.createElement("div");
            char.classList.add("char");
            char.classList.add("char-" + (i + 16));
            row1.appendChild(char);
            this.row1.push(char);
        }
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

    getData() {
        let output = [
            this.pins[0].pinValue,
            this.pins[1].pinValue,
            this.pins[2].pinValue,
            this.pins[3].pinValue,
            this.pins[4].pinValue,
            this.pins[5].pinValue,
            [
                this.pins[6].pinValue,
                this.pins[7].pinValue,
                this.pins[8].pinValue,
                this.pins[9].pinValue,
                this.pins[10].pinValue,
                this.pins[11].pinValue,
                this.pins[12].pinValue,
                this.pins[13].pinValue]
        ];
        for (let i = 0; i < this.pins.length; i++) {
            this.pins[i].pinValue = null;
        }
        return output;
    }

    execute() {
        let [GND, VCC, VEE, RS, RW, E, DB] = this.getData();

        // check if the display is powered
        if (GND === "GND" && VCC === 1) {
            this.displayPowered = true;
        } else {
            this.displayPowered = false;
            this.clearDisplay();
            return;
        }

        // check contrast/opacity of the display
        this.display.objectDisplay.getElementsByClassName("display-inner")[0].style.opacity = VEE;

        // check if all db pins has value null -> no data -> return
        let allNull = true;
        for (let i = 4; i < DB.length; i++) {
            if (DB[i] !== null) {
                allNull = false;
                break;
            }
        }
        if (allNull) {
            return;
        }
        if (E === 1) this.isFallingEdge = true;
        if (E === "GND" && this.isFallingEdge) {
            this.isFallingEdge = false;
            // command mode
            if (RS === "GND") {
                if (RW === "GND") {
                    for (let i = 0; i < DB.length; i++) {
                        if (DB[i] === "GND") {
                            DB[i] = 0;
                        }
                    }

                    let command = 0;
                    for (let i = 4; i < DB.length; i++) {
                        command += DB[i] * Math.pow(2, i);
                    }
                    switch (command) {
                        case 0x20:
                            this.turn4bitmode();
                            break;
                        case 0x30:
                            this.turn8bitmode();
                            break;
                        default: return;
                    }
                }
            }
        }
    }

    turn8bitmode() {
        this.execute = function () {
            let [GND, VCC, VEE, RS, RW, E, DB] = this.getData();
            // check if the display is powered
            if (GND === "GND" && VCC === 1) {
                this.displayPowered = true;
            } else {
                this.displayPowered = false;
                this.clearDisplay();
                return;
            }

            // check contrast/opacity of the display
            this.display.objectDisplay.getElementsByClassName("display-inner")[0].style.opacity = VEE;

            // check if all db pins has value null -> no data -> return
            let allNull = true;
            for (let i = 0; i < DB.length; i++) {
                if (DB[i] !== null) {
                    allNull = false;
                    break;
                }
            }
            if (allNull) {
                return;
            }
            if (E === 1) this.isFallingEdge = true;
            if (E === "GND" && this.isFallingEdge) {
                this.isFallingEdge = false;
                // command mode
                if (RS === "GND") {
                    if (RW === "GND") {
                        this.writeCommand(DB);
                    }
                } else {
                    if (RW === "GND") {
                        this.writeData(DB);
                    }
                }
            }
        }
    }

    turn4bitmode() {
        this.execute = function () {
            let [GND, VCC, VEE, RS, RW, E, DB] = this.getData();
            // check if the display is powered
            if (GND === "GND" && VCC === 1) {
                this.displayPowered = true;
            } else {
                this.displayPowered = false;
                this.clearDisplay();
                return;
            }
            // check contrast/opacity of the display
            this.display.objectDisplay.getElementsByClassName("display-inner")[0].style.opacity = VEE;
            // check if all db pins has value null -> no data -> return
            let allNull = true;
            for (let i = 4; i < DB.length; i++) {
                if (DB[i] !== null) {
                    allNull = false;
                    break;
                }
            }
            if (allNull) {
                return;
            }
            if (E === 1) this.isFallingEdge = true;
            if (E === "GND" && this.isFallingEdge) {
                this.isFallingEdge = false;
                // command mode
                if (RS === "GND") {
                    if (RW === "GND") {
                        if (this.highNibble != null) {
                            this.writeCommand([
                                this.highNibble[0],
                                this.highNibble[1],
                                this.highNibble[2],
                                this.highNibble[3],
                                DB[4],
                                DB[5],
                                DB[6],
                                DB[7]
                            ]);
                            this.highNibble = null;
                        } else {
                            this.highNibble = [
                                DB[4],
                                DB[5],
                                DB[6],
                                DB[7]
                            ]
                        }

                    }
                } else {
                    if (RW === "GND") {
                        if (this.highNibble != null) {
                            this.writeData([
                                this.highNibble[0],
                                this.highNibble[1],
                                this.highNibble[2],
                                this.highNibble[3],
                                DB[4],
                                DB[5],
                                DB[6],
                                DB[7]
                            ]);
                            this.highNibble = null;
                        } else {
                            this.highNibble = [
                                DB[4],
                                DB[5],
                                DB[6],
                                DB[7]
                            ]
                        }

                    }
                }
            }
        }
    }

    // write command
    writeCommand(DB) {
        // convert all "GND" to 0 and all 1 to 1
        for (let i = 0; i < DB.length; i++) {
            if (DB[i] === "GND") {
                DB[i] = 0;
            }
        }

        let command = 0;
        for (let i = 0; i < DB.length; i++) {
            command += DB[i] * Math.pow(2, i);
        }

        // command switch
        switch (command) {
            case 0x20:
                this.turn4bitmode();
                break;
            case 0x30:
                this.turn8bitmode();
                break;
            // Clear display
            case 0x01: // clear display
                this.clearDisplay();
                break;

            // Return home
            case 0x02: // return home
                this.returnHome();
                break;

            // Entry mode set
            case 0x04: // cursor shift left
                this.cursorShiftLeft();
                break;
            case 0x06: // cursor shift right
                this.cursorShiftRight();
                break;
            case 0x05: // display shift right
                this.displayShiftRight();
                break;
            case 0x07: // display shift left
                this.displayShiftLeft();
                break;

            // Display on/off control
            case 0x08: // display off, cursor off, cursor blinking off
                this.displayOff();
                this.cursorOff();
                this.cursorBlinkingOff();
                break;
            case 0x09: // display off, cursor off, cursor blinking on
                this.displayOff();
                this.cursorOff();
                this.cursorBlinkingOn();
                break;
            case 0x0A: // display off, cursor on, cursor blinking off
                this.displayOff();
                this.cursorOn();
                this.cursorBlinkingOff();
                break;
            case 0x0B: // display off, cursor on, cursor blinking on
                this.displayOff();
                this.cursorOn();
                this.cursorBlinkingOn();
                break;
            case 0x0C: // display on, cursor off, cursor blinking off
                this.displayOn();
                this.cursorOff();
                this.cursorBlinkingOff();
                break;
            case 0x0D: // display on, cursor off, cursor blinking on
                this.displayOn();
                this.cursorOff();
                this.cursorBlinkingOn();
                break;
            case 0x0E: // display on, cursor on, cursor blinking off
                this.displayOn();
                this.cursorOn();
                this.cursorBlinkingOff();
                break;
            case 0x0F: // display on, cursor on, cursor blinking on
                this.displayOn();
                this.cursorOn();
                this.cursorBlinkingOn();
                break;

            // Cursor or display shift
            case 0x10: // cursor move left
                this.cursorShiftLeftWithRowJump()
                break;
            case 0x14: // cursor move right
                this.cursorShiftRightWithRowJump()
                break;
            case 0x18: // shift entire display left with cursor
                this.displayShiftLeft();
                this.cursorShiftLeft()
                break;
            case 0x1C: // shift entire display right with cursor
                this.displayShiftRight();
                this.cursorShiftRight()
                break;

            // Function set
            case 0x80: // Force cursor to the beginning ( 1st line)
                break;
            case 0xC0:
                break; // Force cursor to the beginning ( 2nd line)
        }

    }

    writeData(DB) {
        // convert all "GND" to 0 and all 1 to 1
        for (let i = 0; i < DB.length; i++) {
            if (DB[i] === "GND") {
                DB[i] = 0;
            }
        }

        let data = 0;
        for (let i = 0; i < DB.length; i++) {
            data += DB[i] * Math.pow(2, i);
        }

        // write data to the display
        this.rows[this.cursor.row][this.cursor.position] = data;
        this.cursorShiftRightWithRowJump();
    }

    // will clear the display data
    clearDisplay() {
        for (let i = 0; i < 16; i++) {
            this.rows[0][i] = 0x20;
            this.rows[1][i] = 0x20;
        }
        this.cursor.position = 0;
        this.cursor.row = 0;
    }

    returnHome() {
        this.cursor.position = 0;
        this.cursor.row = 0;
    }

    cursorShiftLeft() {
        if (this.cursor.position > 0) {
            this.cursor.position--;
        }
    }

    cursorShiftRight() {
        if (this.cursor.position < 15) {
            this.cursor.position++;
        }
    }

    displayShiftLeft() {
        for (let i = 0; i < this.row0.length; i++) {
            this.rows[0][i] = this.rows[0][i + 1];
            this.rows[1][i] = this.rows[1][i + 1];
        }
    }

    displayShiftRight() {
        for (let i = 15; i > 0; i--) {
            this.rows[0][i] = this.rows[0][i - 1];
            this.rows[1][i] = this.rows[1][i - 1];
        }
    }

    cursorShiftLeftWithRowJump() {
        if (this.cursor.position === 0 && this.cursor.row === 1) {
            this.cursor.row = 0;
            this.cursor.position = 15;
        } else {
            this.cursorShiftLeft();
        }
    }

    cursorShiftRightWithRowJump() {
        if (this.cursor.position === 15 && this.cursor.row === 0) {
            this.cursor.row = 1;
            this.cursor.position = 0;
        } else {
            this.cursorShiftRight();
        }
    }

    displayOff() {
        this.display.isOn = false;
        this.display.objectDisplay.getElementsByClassName("display-inner")[0].style.backgroundColor = "#FFFFFF";
    }
    displayOn() {
        this.display.isOn = true;
        this.display.objectDisplay.getElementsByClassName("display-inner")[0].style.backgroundColor = "#179CE5";
    }
    cursorOff() {
        this.cursor.isOn = false;
    }
    cursorOn() {
        this.cursor.isOn = true;
    }
    cursorBlinkingOff() {
        this.cursor.isBlinking = false;
    }
    cursorBlinkingOn() {
        this.cursor.isBlinking = true;
    }

    // convert hex ascii to char
    asciiToChar(hex) {
        return String.fromCharCode(hex);
    }

    updateViewFromData() {
        // remove cursor class from all elements
        for (let i = 0; i < 16; i++) {
            this.row0[i].classList.remove("cursor");
            this.row1[i].classList.remove("cursor");
            // remove cursor blinking class
            this.row0[i].classList.remove("cursor-blinking");
            this.row1[i].classList.remove("cursor-blinking");
        }

        if (!this.displayPowered) {
            this.display.objectDisplay.getElementsByClassName("display-inner")[0].style.backgroundColor = "#ffffff";

        } else {
            this.display.objectDisplay.getElementsByClassName("display-inner")[0].style.backgroundColor = "#179CE5";

            // update the display with the data
            for (let i = 0; i < 16; i++) {
                this.row0[i].innerHTML = this.asciiToChar(this.rows[0][i]);
                this.row1[i].innerHTML = this.asciiToChar(this.rows[1][i]);
            }

            // add cursor class to the current cursor position
            if (this.cursor.isOn) {
                if (this.cursor.row === 0) {
                    this.row0[this.cursor.position].classList.add("cursor");
                } else {
                    this.row1[this.cursor.position].classList.add("cursor");
                }
            }

            // add cursor blinking class to the current cursor position
            if (this.cursor.isBlinking) {
                if (this.cursor.row === 0) {
                    this.row0[this.cursor.position].classList.add("cursor-blinking");
                } else {
                    this.row1[this.cursor.position].classList.add("cursor-blinking");
                }
            }
        }
    }

    getSVG(width) {
        this.updateViewFromData();
        this.display.objectDisplay.style.width = width + "px";
        this.display.objectDisplay.style.height = width * 0.25 + "px";
        return this.display.objectDisplay;
    }
}