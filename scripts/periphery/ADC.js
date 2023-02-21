class ADC extends Periphery{
    constructor(peripheryId) {
        super(peripheryId);
        this.peripheryId = peripheryId;
        this.peripheryName = "ADC";
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
                    x: 65,
                    y: 100
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
        // check if pins have good values (1 and GND)
        if (this.pins[0].pinValue === 1 && this.pins[1].pinValue === "GND") {
            this.value = this.range.value;
        } else{
            this.value = 0;
        }

        // update voltage
        if(this.voltage) {
            this.voltage.innerHTML = (this.value / 255 * 5).toFixed(2) + " V";
        }

        // update output
        for (let i = 0; i < 8; i++) {
            if (this.value & (1 << i)) {
                this.outputDivs[7-i].innerHTML = "1";
            } else {
                this.outputDivs[7-i].innerHTML = "0";
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

        return holder;
    }
}