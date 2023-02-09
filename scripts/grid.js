class Grid {
    constructor(){
        this.elements = [];
        this.setListeners();
    }

    setListeners(){
        document.getElementById('addPeripheryButton').addEventListener('click', () => {this.addPeriphery()});
        document.getElementById('addPeripheryValue').addEventListener('change',() => {this.showPeripheryProperties()});
        document.getElementById('addDefaultPeripheries').addEventListener('click', () => {this.defaultPeripheries()});
    }

    defaultPeripheries(){
        let display = new LCD16x2Display("p0");
        this.elements = [display
        ];
        display.pins[0].connectedTo = "GND";
        display.pins[1].connectedTo = "V+";
        display.pins[2].connectedTo = "V+";
        display.pins[3].connectedTo = "P1.1";
        display.pins[4].connectedTo = "P1.0";
        display.pins[5].connectedTo = "V+";

        display.pins[6].connectedTo = "P0.0";
        display.pins[7].connectedTo = "P0.1";
        display.pins[8].connectedTo = "P0.2";
        display.pins[9].connectedTo = "P0.3";
        display.pins[10].connectedTo = "P0.4";
        display.pins[11].connectedTo = "P0.5";
        display.pins[12].connectedTo = "P0.6";
        display.pins[13].connectedTo = "P0.7";


        this.updateGrid();
    }

    addPeriphery(){
        let newPeripheryName = document.getElementById("addPeripheryValue").value;
        let newPeriphery = null;

        if (newPeripheryName === ""){
            alert("Periphery name cannot be empty");
        } else if(newPeripheryName === "LED"){
            let ledColor = document.getElementById("ledColor").value;
            newPeriphery = new LED("p"+ this.elements.length, ledColor);
        } else if(newPeripheryName === "sevenSegment"){
            newPeriphery = new SevenSegmentDisplay("p"+ this.elements.length)
        } else if(newPeripheryName === "motorDC"){
            newPeriphery = new MotorDC("p"+ this.elements.length)
        } else if(newPeripheryName === "ledMatrix"){
            let ledMatrixWidth = document.getElementById("matrixWidth").value;
            let ledMatrixHeight = document.getElementById("matrixHeight").value;
            let ledMatrixType = document.getElementById("matrixType").value;
            newPeriphery = new LEDMatrix("p"+ this.elements.length, ledMatrixWidth, ledMatrixHeight, ledMatrixType)
        } else if(newPeripheryName === "stepEngine"){
            newPeriphery = new StepEngine("p"+ this.elements.length)
        } else if(newPeripheryName === "LCD16x2Display"){
            newPeriphery = new LCD16x2Display("p"+ this.elements.length)
        }

        if(newPeriphery){
            this.elements.push(newPeriphery);
            this.updateGrid();
        }
    }

    updateGrid(){
        // prepares data in every element by input values
        this.elements.forEach((element) => {
            element.prepare();
        });

        // execute the data in every element
        this.elements.forEach((element) => {
            element.execute();
        });

        // update the grid
        let grid = document.getElementById("peripheriesGrid");
        grid.innerHTML = "";
        this.elements.forEach((element) => {
            grid.appendChild(element.getHTML());
        });

        modal.open(null);
    }

    updatePinConnections(peripheryId, pinNumber, connectedTo){
        this.elements.forEach((element) => {
            if(element.peripheryId === peripheryId){
                element.updatePinConnection(pinNumber, connectedTo);
            }
        });
        this.updateGrid();

    }

    resetPinValues(){
        this.elements.forEach((element) => {
            element.setPinValuesToDefault();
        });
        this.updateGrid();
    }

    showPeripheryProperties(){
        let peripheryName = document.getElementById("addPeripheryValue").value;
        let peripheryProperties = document.getElementById("peripheryProperties");
        peripheryProperties.innerHTML = "";
        if(peripheryName === "LED"){
            peripheryProperties.appendChild(...new LED().getPropertiesHTML());
        } else if(peripheryName === "sevenSegment"){
            peripheryProperties.appendChild(...new SevenSegmentDisplay().getPropertiesHTML());
        } else  if(peripheryName === "motorDC"){
            peripheryProperties.appendChild(...new MotorDC().getPropertiesHTML());
        } else if (peripheryName === "ledMatrix") {
            new LEDMatrix().getPropertiesHTML().map((element) => {
                peripheryProperties.appendChild(element);
            });
        }
    }
}

let grid = new Grid();
