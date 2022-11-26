class Template {
    constructor(peripheryId) {
        this.name = "Template";
        this.description = "Template";
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
    prepare()  {
        // prepare data on connected pins to execute
    }

    execute() {
        // execute the logic of the component here and set the output pins accordingly
    }

    getHTML() {
        // return the html code for the component
    }

    getSVG() {
        // return the svg code for the component
    }

    getPinConnections() {
        // return the pin connections as selectors
    }
}