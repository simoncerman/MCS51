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
        this.properties = {}
        this.zoomable = false;
        this.width = 100;
        this.zoomWidth = 100;

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

    getHTML(getFull = false){
        // load svg into image element
        let str;
        if (getFull){
            str = this.getSVG(this.zoomWidth);
        } else {
            str = this.getSVG(this.width);
        }
        let oParser = new DOMParser();
        let oDOM = oParser.parseFromString(str, "image/svg+xml");
        let root = oDOM.documentElement;


        // create outer object and append svg
        let peripheryObject = document.createElement("div");
        peripheryObject.classList.add("periphery-object");
        peripheryObject.appendChild(root);


        if(!this.zoomable || getFull){
            // add pin connections selectors to the object
            for (let pinsKey in this.pins) {
                let optionSelector = getPinConnections(this.pins[pinsKey]);

                optionSelector.addEventListener("change", (e) => {grid.updatePinConnections(this.peripheryId, pinsKey, optionSelector.value)},false);

                this.pins[pinsKey].optionSelector = optionSelector;
                peripheryObject.appendChild(optionSelector);
            }
        } else{
            for (let pinsKey in this.pins) {
                let pinDescriptions = getTextPinConnections(this.pins[pinsKey]);
                this.pins[pinsKey].textNode = pinDescriptions;
                peripheryObject.appendChild(pinDescriptions);
            }
        }

        // if object is zoomable -> on click on periphery object -> zoom in and move it to modal with all setup
        if(this.zoomable && getFull === false){
            peripheryObject.addEventListener("click", (e) => {
                modal.open(this.getHTML(true));
            }, false);
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

    getPropertiesHTML() {
        // return html of the properties
        let propertiesRows = [];
        for (let propertiesKey in this.properties) {
            let property = this.properties[propertiesKey];
            let tr = document.createElement("tr");

            let insertion = null;
            if(property.type === "select"){
                let selector = generateSelector(property.options);
                selector.id = propertiesKey;
                selector.value = property.value;
                insertion = selector;
            } else{
                let input = document.createElement("input");
                input.type = property.type;
                input.id = propertiesKey;
                input.value = property.value;
                insertion = input;
            }


            let td1 = document.createElement("td");
            td1.innerHTML = property.name;
            let td2 = document.createElement("td");
            td2.appendChild(insertion);

            tr.appendChild(td1);
            tr.appendChild(td2);
            propertiesRows.push(tr);
        }
        if (propertiesRows.length === 0){
            let tr = document.createElement("tr");
            tr.innerHTML = "This component has no properties! You can use the properties to add custom properties to the component.";
            return [tr];
        } else {
            return propertiesRows;
        }
    }
}