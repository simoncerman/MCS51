class DAC extends Periphery {
    constructor(peripheryId) {
        super(peripheryId);
        this.name = "DAC";
        this.peripheryId = peripheryId;
        this.pins = [
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 2,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 14,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 26,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 38,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 50,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 62,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 74,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 86,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            // V+ and GND pins
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 1,
                    y: -9
                },
                optionSelector: null,
                textNode: "V+"
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 85,
                    y: -9
                },
                optionSelector: null,
                textNode: "GND"
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: -8,
                    y: 20
                },
                optionSelector: null,
                textNode: "E"
            }
        ];
        this.properties = {}
        this.zoomable = true;
        this.width = 400;
        this.zoomWidth = 800;
        this.margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }
        this.analogValue = 0;
        this.analogSetValue = 0;
        this.analogDisplay = null;
        this.stepSize = 0;
        this.analogOff = false;
        this.step = 0;
        this.drawArea = null;
        this.dots = [];
        this.dotValues= [];
        this.mainDot = null;
        this.interval = null;
        this.handChangeValue = null;
        this.fallingEdge = true;
    }

    execute() {
        // check if the pins VCC and GND are 1 and GND
        if (this.pins[8].pinValue !== 1 || this.pins[9].pinValue !== "GND") {
            this.analogOff = true;
            this.analogValue = 0;
            this.analogSetValue = 0;
            this.step = 0;
            this.stepSize = 0;
            this.handChangeValue = null;
            this.fallingEdge = true;
            return;
        } else{
            this.analogOff = false;
        }

        let value;
        let binary = "";
        for (let i = 0; i < 8; i++) {
            if (this.pins[i].connectedTo != null) {
                if(this.pins[i].pinValue === "GND") {
                    binary += "0";
                } else {
                    binary += "1";
                }
            } else {
                binary += "0";
            }
        }

        value = parseInt(binary, 2);

        if (isNaN(value)) {
            value = 0;
        }

        // for debug
        if (this.handChangeValue !== null) {
            value = this.handChangeValue;
        }

        if(value !== this.analogSetValue && this.fallingEdge === true && this.pins[10].pinValue === "GND") {
            this.step = 0;
            this.stepSize = (value - this.analogValue) / 10;
            this.analogSetValue = value;
            this.fallingEdge = false;
        } else if (this.pins[10].pinValue === 1 && this.fallingEdge === false) {
            this.fallingEdge = true;
        }
    }

    getSVG(width) {
        if(this.analogDisplay === null) {
            this.analogDisplay = document.createElement("div");
            this.analogDisplay.classList.add("analogDisplay");
            this.analogDisplay.style.width = width + "px";
            this.analogDisplay.style.height = width * 0.5 + "px";

            // info box for the DAC
            let infoBox = document.createElement("div");
            infoBox.classList.add("infoBox");
            infoBox.innerHTML = "Digital to Analog Converter";
            this.analogDisplay.appendChild(infoBox);

            this.drawArea = document.createElement("div");
            this.drawArea.classList.add("drawArea");
            this.analogDisplay.appendChild(this.drawArea);

            // create main dot
            this.mainDot = document.createElement("div");
            this.mainDot.style.left = "75%";
            this.mainDot.style.bottom = "0%";
            this.mainDot.classList.add("mainDot");
            this.drawArea.appendChild(this.mainDot);

            // generate pin description for VCC and GND
            let pinDescription1 = document.createElement("div");
            pinDescription1.classList.add("dac-pin-description");
            pinDescription1.style.left = "3%";
            pinDescription1.style.top = "0%";
            pinDescription1.innerHTML = "VCC";
            this.analogDisplay.appendChild(pinDescription1);

            let pinDescription2 = document.createElement("div");
            pinDescription2.classList.add("dac-pin-description");
            pinDescription2.style.right = "3%";
            pinDescription2.style.top = "0%";
            pinDescription2.innerHTML = "GND";
            this.analogDisplay.appendChild(pinDescription2);

            // create 8 pins description
            let infoBox2 = document.createElement("div");
            infoBox2.classList.add("dac-pin-description-box");
            infoBox2.style.width = "100%";
            this.analogDisplay.appendChild(infoBox2);

            // E description
            let pd = document.createElement("div");
            pd.classList.add("dac-pin-e-description");
            pd.innerHTML = "E";
            this.analogDisplay.appendChild(pd);

            // generate pin description for the 8 pins
            for (let i = 0; i < 8; i++) {
                let pd = document.createElement("div");
                pd.classList.add("dac-pin-p-description");
                pd.innerHTML = "D" + (7 - i);
                infoBox2.appendChild(pd);
            }

            // interval to update the display
            this.interval = setInterval(() => {
                this.update();
            }, 100);
        }

        return this.analogDisplay;
    }

    update() {
        this.execute();

        if (this.analogOff) {
            // remove all dots
            for (let i = 0; i < this.dots.length; i++) {
                this.drawArea.removeChild(this.dots[i]);
            }
            this.dots = [];
            this.dotValues = [];
            // opacity of the main dot
            this.mainDot.style.opacity = 0;
            return;
        } else {
            // opacity of the main dot
            this.mainDot.style.opacity = 1;
        }

        // calculate the new value
        if ((this.analogValue < this.analogSetValue || this.analogValue > this.analogSetValue) && this.step < 10) {
            this.analogValue += this.stepSize;
            this.step++;
        }

        // update main dot
        this.mainDot.style.bottom = this.analogValue / 255 * 90 + "%";

        let removeIndexes = [];
        // update previous dots
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].style.left = this.dotValues[i] - 1 + "%";
            this.dotValues[i] -= 1;

            // remove dots that are out of the draw area
            if(this.dotValues[i] < -2) {
                removeIndexes.push(i);
            }
        }

        // add new dot
        let newDot = document.createElement("div");
        newDot.classList.add("dot");
        newDot.style.left = "75%";
        newDot.style.bottom = this.analogValue / 255 * 90 + "%";
        this.drawArea.appendChild(newDot);

        this.dotValues.push(75);
        this.dots.push(newDot);
        this.drawArea.appendChild(newDot);

        // remove dots and their values
        for (let i = 0; i < removeIndexes.length; i++) {
            this.dots[removeIndexes[i]].remove();
            this.dots.splice(removeIndexes[i], 1);
            this.dotValues.splice(removeIndexes[i], 1);
        }

    }
}