class MotorDC extends Periphery{
    constructor(peripheryId) {
        super(peripheryId);
        this.name = "MotorDC";
        this.peripheryId = peripheryId;
        this.pins = [
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 90
                },
                optionSelector : null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 50,
                    y: 90
                },
                optionSelector : null,
                textNode: null
            }]
        this.zoomable = false;
        this.rotation = {
            rotator : null,
            activeRotation : null
        }
        this.margin = {
            top: 0,
            right: 2,
            bottom: 5,
            left: 2
        }
        this.properties = {}
    }

    execute() {
        this.getExtraElements();
        if(this.pins[0].pinValue === "GND" && this.pins[1].pinValue === 1){
            this.rotation.activeRotation = "left";
            this.rotation.rotator.style.animation = "spin-left 1s linear infinite";

        }
        else if(this.pins[0].pinValue === 1 && this.pins[1].pinValue === "GND"){
            this.rotation.activeRotation = "right";
            this.rotation.rotator.style.animation = "spin-right 1s linear infinite";
        }
        else{
            this.rotation.activeRotation = null;
            this.rotation.rotator.style.animation = "none";
        }
    }


    getSVG() {
        return `
        <svg style="width: 100px" id="Vrstva_2" data-name="Vrstva 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 328.27 375.4">
            <defs>
                 <style>
                    .cls-5 {fill: none; stroke-width: 8px;}
                    .cls-5, .cls-6, .cls-7 {stroke: #000; stroke-miterlimit: 10;}
                    .cls-6, .cls-7 {fill: #fff;}
                    .cls-7 {stroke-width: 2px;}
                </style>
            </defs>
            <g id="dc_motor" data-name="dc motor">
                <line id="a4" class="cls-5" x1="85.43" y1="295.95" x2="85.43" y2="375.4"/>
                <line id="a3" class="cls-5" x1="242.84" y1="295.95" x2="242.84" y2="375.4"/>
                <circle id="a2" class="cls-6" cx="164.14" cy="164.14" r="163.64"/>
                <circle id="a1" class="cls-7" cx="164.14" cy="164.14" r="27.27"/>
            </g>
        </svg>`;
    }

    getExtraElements() {
        if(this.rotation.rotator === null){
            this.rotation.rotator = document.createElement("div");
            this.rotation.rotator.classList.add("dc-rotor")
        } else {
            return this.rotation.rotator;
        }
    }
}