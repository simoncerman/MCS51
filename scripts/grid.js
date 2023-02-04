class Grid {
    constructor(){
        this.elements = [];
        this.setListeners();
    }

    setListeners(){
        document.getElementById('addPeripheryButton').addEventListener('click', () => {this.addPeriphery()});
        document.getElementById('addPeripheryValue').addEventListener('change',() => {this.showPeripheryProperties()});

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
