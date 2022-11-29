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

    getHTML() {
        // return the html code for the component
        // need to be implemented in the child class
    }

    getSVG() {
        // return the svg code for the component
        // need to be implemented in the child class
    }

    updatePinConnection(pinNumber, newConnection){
        this.pins[pinNumber].connectedTo = newConnection;
    }
}