class DAC extends Periphery {
    // TODO: real reading from the pins
    // TODO: add ground and vcc pins to the DAC and check if they are connected
    // if no, then the DAC is not working
    constructor(peripheryId) {
        super(peripheryId);
        this.name = "DAC";
        this.peripheryId = peripheryId;
        this.pins = [
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 12,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 24,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 36,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 48,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 60,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 72,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 84,
                    y: 100
                },
                optionSelector: null,
                textNode: null
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
        this.analogSetValue = 50;
        this.analogDisplay = null;
        this.stepSize = 0;
        this.drawArea = null;
        this.dots = [];
        this.dotValues= [];
        this.mainDot = null;
        this.interval = null;
    }

    execute() {
        let value = 0;
        for (let i = 7; i >= 0; i--) {
            if (this.pins[i].connectedTo != null) {
                value += this.pins[i].pinValue * Math.pow(2, 7-i);
            }
        }
        if (isNaN(value)) {
            value = 0;
        }
        this.analogValue = value;
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

            // interval to update the display
            this.interval = setInterval(() => {
                this.update();
            }, 100);
        }

        return this.analogDisplay;
    }

    update() {
        // calculate the new value
        if (this.analogValue < this.analogSetValue) {
            this.analogValue += 1;
        }
        else if (this.analogValue > this.analogSetValue) {
            this.analogValue -= 1;
        }

        // update main dot
        this.mainDot.style.bottom = this.analogValue / 255 * 100 + "%";

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
        newDot.style.bottom = this.analogValue / 255 * 100 + "%";
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