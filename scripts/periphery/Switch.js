class Switch extends InputPeriphery{
    constructor(peripheryId) {
        super(peripheryId);
        this.name = "Switch";
        this.peripheryId = peripheryId;
        this.pins = [
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 22,
                    y: -10
                },
                optionSelector: null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 22,
                    y: 95
                },
                optionSelector: null,
                textNode: null
            }
        ];
        this.zoomable = false;
        this.width = 100;
        this.margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }
        this.switchOn = false;
    }

    execute() {
        if(this.switchOn){
            // GND handling
            if(this.pins[0].pinValue === "GND" && isPPin(this.pins[1].connectedTo)){
                grid.leadingEdgeValuesArray[this.pins[1].connectedTo] = 0;
            }
            if (this.pins[1].pinValue === "GND" && isPPin(this.pins[0].connectedTo)){
                grid.leadingEdgeValuesArray[this.pins[0].connectedTo] = 0;
            }

            // V+ handling - not important at this point
            if(this.pins[0].pinValue === 1 && isPPin(this.pins[1].connectedTo)){
                grid.leadingEdgeValuesArray[this.pins[1].connectedTo] = 1;
            }
            if (this.pins[1].pinValue === 1 && isPPin(this.pins[0].connectedTo)){
                grid.leadingEdgeValuesArray[this.pins[0].connectedTo] = 1;
            }
        }
    }



    getSVG(width) {
        return `
        <svg width="${width}" data-name="Vrstva 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 319.77 430.68">
          <defs>
            <style>
              .cls-26, .cls-27, .cls-28, .cls-29 {
                stroke: #000;
                stroke-miterlimit: 10;
              }
        
              .cls-27 {
                fill: #e6e6e6;
              }
        
              .cls-27, .cls-29 {
                stroke-width: 5px;
              }
        
              .cls-28 {
                stroke-width: 3px;
              }
        
              .cls-28, .cls-29 {
                fill: none;
              }
        
            </style>
          </defs>
          <g id="Vrstva_1-2" data-name="Vrstva 1">
            <rect class="cls-27" x="2.5" y="57.95" width="314.77" height="314.77" rx="26.7" ry="26.7"/>
            <line class="cls-29" x1="160.25" y1="57.95" x2="160.25"/>
            <line class="cls-29" x1="160.25" y1="430.68" x2="160.25" y2="372.73"/>
            <circle class="cls-30" cx="49.37" cy="325.57" r="11.65"/>
            <rect class="cls-26" x="57.61" y="110" width="204.55" height="15.91"/>
            <line class="cls-28" x1="160" y1="110" x2="160" y2="280"/>
          </g>
        </svg>
        `
    }

    switchSwitch() {
        this.switchOn = !this.switchOn;
        grid.updateGrid();
    }

    applySpecials(root) {
        if(this.switchOn){
            root.getElementsByClassName("cls-30")[0].style.fill = "red";
            root.getElementsByClassName("cls-26")[0].setAttribute("y", "280");
        } else {
            root.getElementsByClassName("cls-30")[0].style.fill = "white";
            root.getElementsByClassName("cls-26")[0].setAttribute("y", "100");
        }
        return root;
    }

    getExtraElements() {
        let switchClicker = document.createElement("div");
        switchClicker.classList.add("switch-clicker");

        // mouse click
        switchClicker.addEventListener("click", () => {
            this.switchSwitch();
        });


        // not implemented yet - not working properly
        /*// set on push
        buttonClicker.addEventListener("mousedown", () => {
            this.buttonPush();
        });

        // set on release
        buttonClicker.addEventListener("mouseup", () => {
            this.buttonRelease();
        });*/

        return switchClicker;
    }
}