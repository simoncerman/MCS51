class Periphery {
    constructor(peripheryId) {
        this.name = "Periphery name";
        this.peripheryId = peripheryId;
        this.pins = {
            0: {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 0
                },
                optionSelector: null,
            }
        };

    }

    prepare(){
        // get values from pins and pass them to pinValues
        for (let pin in this.pins) {
            if(this.pins[pin].connectedTo != null){
                switch (this.pins[pin].connectedTo) {
                    case "GND":
                        this.pins[pin].pinValue = "GND";
                        break;

                    case "V+": // 5V
                        this.pins[pin].pinValue = 1;
                        break;

                    case null:
                        this.pins[pin].pinValue = null;
                        break;

                    case undefined:
                        this.pins[pin].pinValue = null;
                        break;

                    default:
                        let bitData = retrieveSpecialBit(this.pins[pin].connectedTo);
                        this.pins[pin].pinValue = bitData.value;
                }
            }
        }
    }

    execute() {
        // execute the logic of the component here and set the output pins accordingly
        // need to be implemented in the child class
    }

    getHTML(){
        // load svg into image element
        let str = this.getSVG();
        let oParser = new DOMParser();
        let oDOM = oParser.parseFromString(str, "image/svg+xml");
        let root = oDOM.documentElement;


        // create outer object and append svg
        let peripheryObject = document.createElement("div");
        peripheryObject.classList.add("periphery-object");
        peripheryObject.appendChild(root);

        // add pin connections selectors to the object
        for (let pinsKey in this.pins) {
            let optionSelector = getPinConnections(this.pins[pinsKey]);

            optionSelector.addEventListener("change", (e) => {grid.updatePinConnections(this.peripheryId, pinsKey, optionSelector.value)},false);

            this.pins[pinsKey].optionSelector = optionSelector;
            peripheryObject.appendChild(optionSelector);
        }

        root = this.applySpecials(root);

        return peripheryObject;
    }

    getSVG() {
        // return the svg code for the component
        // need to be implemented in the child class
    }

    applySpecials(root){
        // apply special functions to the svg
        // need to be implemented in the child class
        return root;
    }

    updatePinConnection(pinNumber, newConnection){
        this.pins[pinNumber].connectedTo = newConnection;
    }

    setPinValuesToDefault(){
        for (let pin in this.pins) {
            this.pins[pin].pinValue = null;
        }
    }
}