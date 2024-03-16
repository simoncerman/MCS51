class Grid {
    constructor() {
        this.elements = [];
        this.setListeners();
        this.leadingEdgeValuesArray = {
            "P0.0": null,
            "P0.1": null,
            "P0.2": null,
            "P0.3": null,
            "P0.4": null,
            "P0.5": null,
            "P0.6": null,
            "P0.7": null,
            "P1.0": null,
            "P1.1": null,
            "P1.2": null,
            "P1.3": null,
            "P1.4": null,
            "P1.5": null,
            "P1.6": null,
            "P1.7": null,
            "P2.0": null,
            "P2.1": null,
            "P2.2": null,
            "P2.3": null,
            "P2.4": null,
            "P2.5": null,
            "P2.6": null,
            "P2.7": null,
            "P3.0": null,
            "P3.1": null,
            "P3.2": null,
            "P3.3": null,
            "P3.4": null,
            "P3.5": null,
            "P3.6": null,
            "P3.7": null
        }
        this.actualId = 0;
    }

    setListeners() {
        document.getElementById('addPeripheryButton').addEventListener('click', () => { this.addPeriphery() });
        document.getElementById('addPeripheryValue').addEventListener('change', () => { this.showPeripheryProperties() });

        // loading peripheries
        document.getElementById('openPeripheryAdd').addEventListener('click', () => { this.openPeripheryAdd() });
        document.getElementById('openPeripheryReplace').addEventListener('click', () => { this.openPeripheryReplace() });
        document.onmousedown = (e) => {
            if (e.button === 0 || e.button === 2) {
                if (!e.target.classList.contains('context-menu-option')) {
                    contextMenu.closeContextMenu();
                }
            }
        }
        // after 10 ms call this.defaultPeripheries()
        setTimeout(() => { this.defaultPeripheries() }, 500);
    }

    defaultPeripheries() {

        this.updateGrid();
    }

    addPeriphery() {
        let newPeripheryName = document.getElementById("addPeripheryValue").value;
        let newPeriphery = null;
        this.actualId++;

        if (newPeripheryName === "") {
            alert("Periphery name cannot be empty");
        } else if (newPeripheryName === "LED") {
            let ledColor = document.getElementById("ledColor").value;
            newPeriphery = new LED("p" + this.actualId, ledColor);
        } else if (newPeripheryName === "sevenSegment") {
            let sevenSegmentType = document.getElementById("sevenSegmentType").value;
            newPeriphery = new SevenSegmentDisplay("p" + this.actualId, sevenSegmentType);
        } else if (newPeripheryName === "motorDC") {
            newPeriphery = new MotorDC("p" + this.actualId)
        } else if (newPeripheryName === "ledMatrix") {
            let ledMatrixWidth = document.getElementById("matrixWidth").value;
            let ledMatrixHeight = document.getElementById("matrixHeight").value;
            let ledMatrixType = document.getElementById("matrixType").value;
            newPeriphery = new LEDMatrix("p" + this.actualId, ledMatrixWidth, ledMatrixHeight, ledMatrixType);
        } else if (newPeripheryName === "stepEngine") {
            newPeriphery = new StepEngine("p" + this.actualId);
        } else if (newPeripheryName === "LCD16x2Display") {
            newPeriphery = new LCD16x2Display("p" + this.actualId);
        } else if (newPeripheryName === "button") {
            newPeriphery = new Button("p" + this.actualId);
        } else if (newPeripheryName === "switch") {
            newPeriphery = new Switch("p" + this.actualId);
        } else if (newPeripheryName === "serialMonitor") {
            newPeriphery = new SerialMonitor("p" + this.actualId);
            document.getElementById("sermor").disabled = true;
        } else if (newPeripheryName === "DAC") {
            newPeriphery = new DAC("p" + this.actualId);
        } else if (newPeripheryName === "ADC") {
            newPeriphery = new ADC("p" + this.actualId);
        } else if (newPeripheryName === "Keyboard") {
            newPeriphery = new Keyboard("p" + this.actualId);
        } else if (newPeripheryName === "FourteenSegmentDisplay") {
            let fourteenSegmentDisplayType = document.getElementById("fourteenSegmentType").value;
            newPeriphery = new FourteenSegmentDisplay("p" + this.actualId, fourteenSegmentDisplayType);
        }



        if (newPeriphery) {
            this.elements.push(newPeriphery);
            this.updateGrid();
        }
    }

    clearLeadingEdgeValuesArray() {
        for (let key in this.leadingEdgeValuesArray) {
            this.leadingEdgeValuesArray[key] = null;
        }
    }

    updateGrid() {
        this.clearLeadingEdgeValuesArray();

        if(serialHandler.getSerialMonitors() == null){
            document.getElementById("sermor").disabled = false;
        }

        // priority properties what are of class Button do first
        this.elements.forEach((element) => {
            if (element instanceof Button || element instanceof Switch || element instanceof Keyboard) {
                element.prepare();
                element.execute();
            }
        });

        // prepares data in every element by input values
        this.elements.forEach((element) => {
            if (!(element instanceof Button && !(element instanceof Switch) && !(element instanceof Keyboard))) {
                element.prepare();
            }
        });

        // execute the data in every element
        this.elements.forEach((element) => {
            if (!(element instanceof Button && !(element instanceof Switch) && !(element instanceof Keyboard))) {
                element.execute();
            }
        });

        var selectobject = document.getElementById("addPeripheryValue");
        for (var i = 0; i < selectobject.length; i++) {
            if (selectobject.options[i].value == "serialMonitor" && this.serialExist)
                selectobject.remove(i);
        }

        // update the grid
        let grid = document.getElementById("peripheriesGrid");
        grid.innerHTML = "";
        this.elements.forEach((element) => {
            grid.appendChild(element.getHTML());
        });

        modal.openElement(null);

        if(!isRunning){
            switch (saveInterval) {
                case null:
                    saveInterval = setInterval(saveF, 100);
                    break;
    
                default:
                    saveDelay = 5;
                    break;
            }
        }
    }

    updatePinConnections(peripheryId, pinNumber, connectedTo) {
        this.elements.forEach((element) => {
            if (element.peripheryId === peripheryId) {
                element.updatePinConnection(pinNumber, connectedTo);
            }
        });
        this.updateGrid();

    }

    resetPinValues() {
        this.elements.forEach((element) => {
            element.setPinValuesToDefault();
        });
        this.updateGrid();
    }

    showPeripheryProperties() {
        let peripheryName = document.getElementById("addPeripheryValue").value;

        // table
        let peripheryProperties = document.getElementById("peripheryProperties");
        peripheryProperties.innerHTML = "";

        let peripheryPropertyTable = {
            "LED": LED,
            "sevenSegment": SevenSegmentDisplay,
            "FourteenSegmentDisplay": FourteenSegmentDisplay,
            "motorDC": MotorDC,
            "ledMatrix": LEDMatrix,
            "stepEngine": StepEngine,
            "LCD16x2Display": LCD16x2Display,
            "button": Button,
            "switch": Switch,
            "serialMonitor": SerialMonitor,
            "DAC": DAC,
            "ADC": ADC,
            "Keyboard": Keyboard,
        }

        if (peripheryPropertyTable[peripheryName]) {
            let peripheryObject = new peripheryPropertyTable[peripheryName]()
            peripheryObject.getPropertiesHTML(peripheryProperties);
        }
    }

    savePeripheryFile() {
        if (this.elements.length === 0) {
            console.log("No peripheries to save")
            return;
        }
        let peripheryFile = {
            "elements": []
        }
        this.elements.forEach((element) => {
            peripheryFile.elements.push(element);
        });
        let jsonFile = JSON.stringify(peripheryFile);
        this.saveFile(jsonFile);
    }

    getPeripheryJson() {
        let elements = [];
        this.elements.forEach((element) => {
            elements.push(element);
        });
        return elements;
    }

    saveFile(jsonFIle) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonFIle));
        element.setAttribute('download', "peripheryFile.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    openPeripheryAdd() {
        // file input has id openPeripheryFile
        let fileInput = document.getElementById("openPeripheryFile").files[0];
        let reader = new FileReader();
        reader.readAsText(fileInput);
        reader.onload = () => {
            // stringify the JSON object
            let result = reader.result.toString();
            let peripheryFile = JSON.parse(result);
            peripheryFile.elements.forEach((element) => {
                let object = this.objectDeserialization(element);
                grid.elements.push(object);
            });
            this.updateGrid();
        }
    }

    openPeripheryReplace() {
        // file input has id openPeripheryFile
        let fileInput = document.getElementById("openPeripheryFile").files[0];
        let reader = new FileReader();
        reader.readAsText(fileInput);
        reader.onload = () => {
            // stringify the JSON object
            let result = reader.result.toString();
            this.peripheryReplace(JSON.parse(result).elements);
        }
    }

    peripheryReplace(data) {
        grid.elements = [];
        data.forEach((element) => {
            let object = this.objectDeserialization(element);
            grid.elements.push(object);
        });
        this.updateGrid();
    }

    objectDeserialization(element) {
        let object = null;
        this.actualId++;

        if (element.name === "LED") {
            object = new LED("p" + this.actualId, element.ledColor);
            object.pins = element.pins;
        }
        else if (element.name === "SevenSegmentDisplay") {
            object = new SevenSegmentDisplay("p" + this.actualId);
            object.pins = element.pins;
            object.type = element.type;
        }
        else if (element.name === "MotorDC") {
            object = new MotorDC("p" + this.actualId);
            object.pins = element.pins;
        }
        else if (element.name === "LEDMatrix") {
            let matrixWidth = element.matrixWidth;
            let matrixHeight = element.matrixHeight;
            let matrixType = element.type;
            object = new LEDMatrix("p" + this.actualId, matrixWidth, matrixHeight, matrixType);
            object.pins = element.pins;
            // for correct relations
            object.generateLeftTopPins();
        }
        else if (element.name === "StepEngine") {
            object = new StepEngine("p" + this.actualId);
            object.pins = element.pins;
            object.rotation.value = element.rotation.value;
        }
        else if (element.name === "LCD16x2Display") {
            object = new LCD16x2Display("p" + this.actualId);
            object.pins = element.pins;
        }
        else if (element.name === "Button") {
            object = new Button("p" + this.actualId);
            object.pins = element.pins;
            object.clicked = element.clicked;
        }
        else if (element.name === "Switch") {
            object = new Switch("p" + this.actualId);
            object.pins = element.pins;
            object.switchOn = element.switchOn;
        }
        else if (element.name === "SerialMonitor") {
            object = new SerialMonitor("p" + this.actualId);
        }
        else if (element.name === "DAC") {
            object = new DAC("p" + this.actualId);
            object.pins = element.pins;
        }
        else if (element.name === "ADC") {
            object = new ADC("p" + this.actualId);
            object.pins = element.pins;
        }
        else if (element.name === "Keyboard") {
            object = new Keyboard("p" + this.actualId);
            object.pins = element.pins;
        }
        else if (element.name === "FourteenSegmentDisplay") {
            object = new FourteenSegmentDisplay("p" + this.actualId);
            object.pins = element.pins;
            object.type = element.type;
        }
        return object;
    }
    removePeriphery(peripheryId) {
        let index = this.elements.findIndex((element) => element.peripheryId === peripheryId);
        this.elements.splice(index, 1);
        this.updateGrid();
    }

    removeAllPeripheries() {
        this.elements = [];
        this.updateGrid();
    }

    savePeriphery(peripheryId) {
        let index = this.elements.findIndex((element) => element.peripheryId === peripheryId);
        let element = this.elements[index];
        let peripheryFile = {
            "elements": []
        }
        peripheryFile.elements.push(element);
        let jsonFile = JSON.stringify(peripheryFile);
        this.saveFile(jsonFile);
    }


}

let grid = new Grid();
