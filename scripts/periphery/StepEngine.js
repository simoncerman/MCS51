class StepEngine extends Periphery{
    constructor(peripheryId) {
        super(peripheryId);
        this.name = "StepEngine";
        this.peripheryId = peripheryId;
        this.zoomable = true;
        this.rotation = {
            rotation : 0,
            value : 0,
            step : 0,
            rotator : null
        }
        this.width = 150;
        this.zoomWidth = 400;

        this.margin = {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
        }
        this.pins = [
            // 5V
            {
                connectedTo : null,
                pinValue : 0,
                pinPosition : {
                    x : -10,
                    y : 68
                },
                optionSelector : null,
                textNode : null
            },
            // 1
            {
                connectedTo : null,
                pinValue : 0,
                pinPosition : {
                    x : 15,
                    y : 95
                },
                optionSelector : null,
                textNode : null
            },
            // 2
            {
                connectedTo : null,
                pinValue : 0,
                pinPosition : {
                    x : 32,
                    y : 95
                },
                optionSelector : null,
                textNode : null
            },
            // 3
            {
                connectedTo : null,
                pinValue : 0,
                pinPosition : {
                    x : 53,
                    y : 95
                },
                optionSelector : null,
                textNode : null
            },
            // 4
            {
                connectedTo : null,
                pinValue : 0,
                pinPosition : {
                    x : 70,
                    y : 95
                },
                optionSelector : null,
                textNode : null
            },
        ]
        this.properties = {}
    }

    execute() {
        if (this.pins[0].pinValue !== 1) return;
        let activePin = this.checkActivePin(1, 4);
        if(this.rotation.step === 0){
            if(activePin === 2){
                this.rotation.step = 1;
                this.rotation.value += 5.625;
            } else if(activePin === 4){
                this.rotation.step = 3;
                this.rotation.value -= 5.625;
            }

        } else if(this.rotation.step === 1){
            if(activePin === 3){
                this.rotation.step = 2;
                this.rotation.value += 5.625;
            } else if(activePin === 1){
                this.rotation.step = 0;
                this.rotation.value -= 5.625;
            }

        } else if(this.rotation.step === 2){
            if(activePin === 4){
                this.rotation.step = 3;
                this.rotation.value += 5.625;
            } else if(activePin === 2){
                this.rotation.step = 1;
                this.rotation.value -= 5.625;
            }

        } else if(this.rotation.step === 3){
            if(activePin === 1){
                this.rotation.step = 0;
                this.rotation.value += 5.625;
            } else if(activePin === 3){
                this.rotation.step = 2;
                this.rotation.value -= 5.625;
            }

        }
        this.getExtraElements();
    }

    checkActivePin(startRange, stopRange) {
        let activePins = [];
        for(let i = startRange; i <= stopRange; i++){
            if(this.pins[i].pinValue === 1){
                activePins.push(i);
            }
        }
        if (activePins.length === 1){
            return activePins[0];
        } else if(activePins.length > 1){
            return false;
        } else if (activePins.length === 0){
            return null;
        }
    }

    getSVG(width) {
        return`
        <svg id="Vrstva_2" style="width: ${width}px" data-name="Vrstva 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 328.27 437.63">
            <defs>
                <style>
                    .cls-16 {fill: #fff;stroke-width: 11px;}
                    .cls-16, .cls-17, .cls-18, .cls-19 {stroke-miterlimit: 10;}
                    .cls-16, .cls-19 {stroke: #fff;}
                    .cls-17 {fill: none;}
                    .cls-17, .cls-18 {stroke: #000;}
                    .cls-18 {fill: gray;}
                    .cls-19 {stroke-width: 5px;}
                    .cls-20 {font-family: MyriadPro-Regular, 'Myriad Pro';font-size: 30px;}
                </style>
            </defs>
            <g id="Vrstva_1-2" data-name="Vrstva 1">
                <rect class="cls-17" x="8.25" y="199.63" width="312.5" height="237.5"/>
                <circle id="a2" class="cls-18" cx="164.14" cy="164.14" r="163.64"/>
                <circle id="a1" class="cls-19" cx="164.14" cy="164.14" r="27.27"/>
                <text class="cls-20" transform="translate(64.01 409.16)"><tspan x="0" y="0">1</tspan></text>
                <text class="cls-20" transform="translate(123.87 409.16)"><tspan x="0" y="0">2</tspan></text>
                <text class="cls-20" transform="translate(189.01 409.16)"><tspan x="0" y="0">3</tspan></text>
                <text class="cls-20" transform="translate(248.87 409.16)"><tspan x="0" y="0">4</tspan></text>
                <text class="cls-20" transform="translate(143.23 368.21)"><tspan x="0" y="0">INT</tspan></text>
                <text class="cls-20" transform="translate(16.05 318.38)"><tspan x="0" y="0">5V</tspan></text>
            </g>
        </svg>`
    }

    exceptions(getFull) {
        if(this.rotation.rotator === null){
            return;
        }
        // if full -> change to be bigger
        if(getFull){
            this.rotation.rotator.classList.remove("step-engine-rotator");
            this.rotation.rotator.classList.add("step-engine-rotator-full");
        } else{
            this.rotation.rotator.classList.remove("step-engine-rotator-full");
            this.rotation.rotator.classList.add("step-engine-rotator");
        }
    }

    getExtraElements() {
        if(this.rotation.rotator === null){
            this.rotation.rotator = document.createElement("div");
            this.rotation.rotator.classList.add("step-engine-rotator");
            this.rotation.rotator.style.transform = `rotate(0deg)`;
            return this.rotation.rotator;
        } else {
            this.rotation.rotator.style.transform = `rotate(${this.rotation.value}deg)`;
            return this.rotation.rotator;
        }
    }
}