class ADC extends Periphery{
    constructor(peripheryId) {
        super(peripheryId);
        this.peripheryId = peripheryId;
        this.name = "ADC";
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
                    x: 86,
                    y: 100
                },
                optionSelector: null,
                textNode: null
            },
            // output pins
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 2,
                    y: -5
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 14,
                    y: -5
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 26,
                    y: -5
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 38,
                    y: -5
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 50,
                    y: -5
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 62,
                    y: -5
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 74,
                    y: -5
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 86,
                    y: -5
                },
                optionSelector: null,
                textNode: null
            }
        ]
        this.properties = {}
        this.zoomable = false;
        this.margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        }
        this.holder = null;
        this.range = null;
        this.voltage = null;
        this.value = 0;
    }

    execute() {
        if(this.holder === null) return;
        // check if pins have right values (1 and GND)
        if (this.pins[0].pinValue === 1 && this.pins[1].pinValue === "GND") {
            this.value = this.range.value;
        } else{
            this.value = 0;
        }

        // update voltage
        if(this.voltage) {
            this.voltage.innerHTML = (this.value / 255 * 5).toFixed(2) + " V";
        }

        let output = "";
        for (let i = 0; i < 8; i++) {
            if (this.value & (1 << i)) {
                this.outputDivs[7-i].innerHTML = "1";
                output += "1";
            } else {
                this.outputDivs[7-i].innerHTML = "0";
                output += "0";
            }
        }

        let bits = output.split("").reverse().join("");

        // update leading edge values
        for (let i = 0; i < 8; i++) {
            let pinConnectedTo = this.pins[i+2].connectedTo;
            if (isPPin(pinConnectedTo)) {
                grid.leadingEdgeValuesArray[pinConnectedTo] = parseInt(bits[i]);
            }
        }
    }

    getSVG() {
        if (this.holder === null) {
            this.holder = this.generateObject();
        }
        return this.holder;
    }

    generateObject() {
        // holder for all stuff
        let holder = document.createElement("div");
        holder.classList.add("adc-holder");

        // generate range 0-255
        this.range = document.createElement("input");
        this.range.type = "range";
        this.range.min = "0";
        this.range.max = "255";
        this.range.value = "0"
        this.range.classList.add("adc-range");
        // on range change
        this.range.oninput = () => {
            this.execute();
        }
        holder.appendChild(this.range);

        // real voltage
        this.voltage = document.createElement("div");
        this.voltage.classList.add("adc-voltage");
        this.voltage.innerHTML = "0.00 V";
        holder.appendChild(this.voltage);

        // generate output display
        this.outputDivs = [];
        let outputHolder = document.createElement("div");
        outputHolder.classList.add("adc-output-holder");
        for (let i = 0; i < 8; i++) {
            let outputDiv = document.createElement("div");
            outputDiv.classList.add("adc-output");
            outputDiv.innerHTML = "0";
            outputHolder.appendChild(outputDiv);
            this.outputDivs.push(outputDiv);
        }
        holder.appendChild(outputHolder);

        // pin descriptions
        let pinDescription1 = document.createElement("div");
        pinDescription1.classList.add("adc-pin-description");
        pinDescription1.innerHTML = "V+";
        pinDescription1.style.left = "2%";
        pinDescription1.style.bottom = "0%";
        holder.appendChild(pinDescription1);

        let pinDescription2 = document.createElement("div");
        pinDescription2.classList.add("adc-pin-description");
        pinDescription2.innerHTML = "GND";
        pinDescription2.style.right = "2%";
        pinDescription2.style.bottom = "0%";
        holder.appendChild(pinDescription2);

        let descriptions = this.generateDescriptions();
        for (let i = 0; i < descriptions.length; i++) {
            holder.appendChild(descriptions[i]);
        }

        return holder;
    }
    generateDescriptions() {
        let descriptions = [];
        let descriptionsText = ["B7", "B6", "B5", "B4", "B3", "B2", "B1", "B0"];
        for (let i = 2; i < this.pins.length; i++) {
            let description = document.createElement("div");
            description.classList.add("adc-description");
            description.style.left = parseInt(this.pins[i].pinPosition.x+4) + "%";
            description.style.top = parseInt(this.pins[i].pinPosition.y+10) + "%";
            description.innerHTML = descriptionsText[i-2];
            descriptions.push(description);
        }
        return descriptions;
    }
}