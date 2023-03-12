class Button extends InputPeriphery{
    constructor(peripheryId){
        super(peripheryId);
        this.name = "Button";
        this.peripheryId = peripheryId;
        this.pins = [
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: -5,
                    y: -5
                },
                optionSelector : null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 50,
                    y: -5
                },
                optionSelector : null,
                textNode: null
            },
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: -5,
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
            },
        ]
        this.zoomable = false;
        this.width = 100;
        this.zoomWidth = 100;
        this.margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }
        this.clicked = false;
    }

    execute() {
        if(!this.clicked) {
            // GND to P pins leading edge handling
            if (this.pins[0].pinValue === "GND" && isPPin(this.pins[2].connectedTo)) {
                grid.leadingEdgeValuesArray[this.pins[2].connectedTo] = 0;
            }
            if (this.pins[2].pinValue === "GND" && isPPin(this.pins[0].connectedTo)) {
                grid.leadingEdgeValuesArray[this.pins[0].connectedTo] = 0;
            }
            if (this.pins[1].pinValue === "GND" && isPPin(this.pins[3].connectedTo)) {
                grid.leadingEdgeValuesArray[this.pins[3].connectedTo] = 0;
            }
            if (this.pins[3].pinValue === "GND" && isPPin(this.pins[1].connectedTo)) {
                grid.leadingEdgeValuesArray[this.pins[1].connectedTo] = 0;
            }

            // VCC to P pins leading edge handling
            if (this.pins[0].pinValue === 1 && isPPin(this.pins[2].connectedTo)) {
                grid.leadingEdgeValuesArray[this.pins[2].connectedTo] = 1;
            }
            if (this.pins[2].pinValue === 1 && isPPin(this.pins[0].connectedTo)) {
                grid.leadingEdgeValuesArray[this.pins[0].connectedTo] = 1;
            }
            if (this.pins[1].pinValue === 1 && isPPin(this.pins[3].connectedTo)) {
                grid.leadingEdgeValuesArray[this.pins[3].connectedTo] = 1;
            }
            if (this.pins[3].pinValue === 1 && isPPin(this.pins[1].connectedTo)) {
                grid.leadingEdgeValuesArray[this.pins[1].connectedTo] = 1;
            }
        }
        else if (this.clicked) {
            // if one is ground = all p pins leading edge = ground
            // check if any of the pins is connected to GND
            if (this.pins[0].pinValue === "GND") {
                [1, 2, 3].forEach((pin) => {
                    if (isPPin(this.pins[pin].connectedTo)) {
                        grid.leadingEdgeValuesArray[this.pins[pin].connectedTo] = 0;
                    }
                });
            }
            if (this.pins[1].pinValue === "GND") {
                [0, 2, 3].forEach((pin) => {
                    if (isPPin(this.pins[pin].connectedTo)) {
                        grid.leadingEdgeValuesArray[this.pins[pin].connectedTo] = 0;
                    }
                });
            }
            if (this.pins[2].pinValue === "GND") {
                [0, 1, 3].forEach((pin) => {
                    if (isPPin(this.pins[pin].connectedTo)) {
                        grid.leadingEdgeValuesArray[this.pins[pin].connectedTo] = 0;
                    }
                });
            }
            if (this.pins[3].pinValue === "GND") {
                [0, 1, 2].forEach((pin) => {
                    if (isPPin(this.pins[pin].connectedTo)) {
                        grid.leadingEdgeValuesArray[this.pins[pin].connectedTo] = 0;
                    }
                });
            }


            // if no pins are connected to GND
            if (this.pins[0].pinValue !== "GND" && this.pins[1].pinValue !== "GND" && this.pins[2].pinValue !== "GND" && this.pins[3].pinValue !== "GND") {
                // if one is VCC = all p pins leading edge = VCC

                if (this.pins[0].pinValue === 1) {
                    [1, 2, 3].forEach((pin) => {
                        if (isPPin(this.pins[pin].connectedTo)) {
                            grid.leadingEdgeValuesArray[this.pins[pin].connectedTo] = 1;
                        }
                    });
                }
                if (this.pins[1].pinValue === 1) {
                    [0, 2, 3].forEach((pin) => {
                        if (isPPin(this.pins[pin].connectedTo)) {
                            grid.leadingEdgeValuesArray[this.pins[pin].connectedTo] = 1;
                        }
                    });
                }
                if (this.pins[2].pinValue === 1) {
                    [0, 1, 3].forEach((pin) => {
                        if (isPPin(this.pins[pin].connectedTo)) {
                            grid.leadingEdgeValuesArray[this.pins[pin].connectedTo] = 1;
                        }
                    });
                }
                if (this.pins[3].pinValue === 1) {
                    [0, 1, 2].forEach((pin) => {
                        if (isPPin(this.pins[pin].connectedTo)) {
                            grid.leadingEdgeValuesArray[this.pins[pin].connectedTo] = 1;
                        }
                    });
                }
            }

        }
    }

    applySpecials(root) {
        // setting button action color
        root.getElementsByClassName("cls-24")[0].style.fill = "white";

        // setting button action color when activated
        if(this.clicked) {
            root.getElementsByClassName("cls-24")[0].style.fill = "red";
        }
        return root;
    }

    getSVG(width) {
        return `
            <svg width="${width}" data-name="Vrstva 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 319.77 430.68">
                <defs>
                    <style>
                        .cls-21, .cls-22, .cls-23 {
                                stroke: #000;
                                stroke-miterlimit: 10;
                                stroke-width: 5px;
                            }
                    
                        .cls-22 {
                                fill: #e6e6e6;
                            }
                    
                        .cls-23 {
                                fill: none;
                            }
                    
                        .cls-24 {
                                fill: red;
                            }
                    </style>
                </defs>
                <g id="Vrstva_1-2" data-name="Vrstva 1">
                    <rect class="cls-22" x="2.5" y="57.95" width="314.77" height="314.77" rx="26.7" ry="26.7"/>
                    <line class="cls-23" x1="244.36" y1="57.95" x2="244.36"/>
                    <line class="cls-23" x1="74.28" y1="57.95" x2="74.28"/>
                    <line class="cls-23" x1="244.93" y1="430.68" x2="244.93" y2="372.73"/>
                    <line class="cls-23" x1="74.85" y1="430.68" x2="74.85" y2="372.73"/>
                    <circle class="cls-21" cx="159.89" cy="215.34" r="86.93"/>
                    <circle class="cls-24" cx="49.37" cy="325.57" r="11.65"/>
                </g>
            </svg>`;
    }

    buttonPush() {
        this.clicked = true;
        this.prepare();
        this.execute();
        grid.updateGrid();
    }

    buttonRelease() {
        this.clicked = false;
        this.prepare();
        this.execute();
        grid.updateGrid();
    }

    buttonClick() {
        this.clicked = !this.clicked;
        this.prepare();
        this.execute();
        grid.updateGrid();
    }

    getExtraElements() {
        let buttonClicker = document.createElement("div");
        buttonClicker.classList.add("button-clicker");


        // mouse click
        buttonClicker.addEventListener("click", () => {
            this.buttonClick();
        });


        // FIXME: mouse down and up not working -> vyøešit s hamanovou
        /*// set on push
        buttonClicker.addEventListener("mousedown", () => {
            this.buttonPush();
        });

        // set on release
        buttonClicker.addEventListener("mouseup", () => {
            this.buttonRelease();
        });*/

        return buttonClicker;
    }
}