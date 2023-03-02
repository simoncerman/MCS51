class Periphery {
    constructor(peripheryId) {
        this.name = "Periphery name";
        this.peripheryId = peripheryId;
        this.pins = [
            {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 0
                },
                optionSelector: null,
                textNode: null
            }
        ];
        this.properties = {}
        this.zoomable = false;
        this.width = 100;
        this.zoomWidth = 200;
        this.margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }

    }

    prepare(){
        // get values from pins and pass them to pinValues
        for (let pin = 0; pin < this.pins.length; pin++) {
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

                    case " ":
                        this.pins[pin].pinValue = null;
                        break;

                    default:
                        // bit data = real value of the bit
                        // leadingEdgeValueArray = array of leading edge values
                        let bitData = retrieveSpecialBit(this.pins[pin].connectedTo);
                        let leadingEdgeValue = grid.leadingEdgeValuesArray[this.pins[pin].connectedTo];

                        // if bit data = 0 -> GND always
                        if(bitData.value === 0){
                            this.pins[pin].pinValue = "GND";
                        }

                        // if bit data = 1 -> check if there is a leading edge
                        if(bitData.value === 1) {
                            if (leadingEdgeValue === null) {
                                this.pins[pin].pinValue = 1;
                                break;
                            } else {
                                if (leadingEdgeValue === 1) {
                                    this.pins[pin].pinValue = 1;
                                    break;
                                } else {
                                    this.pins[pin].pinValue = "GND";
                                    break;
                                }
                            }
                        }
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

        let root;
        // check if str is not dom element
        if (str instanceof Element){
            root = str;
        } else {
            let oParser = new DOMParser();
            let oDOM = oParser.parseFromString(str, "image/svg+xml");
            root = oDOM.documentElement;
        }

        // exceptions for full width mode
        this.exceptions(getFull);

        // create outer object and append svg
        let peripheryObject = document.createElement("div");
        peripheryObject.classList.add("periphery-object");
        peripheryObject.appendChild(root);

        if(!this.zoomable || getFull){
            // add pin connections selectors to the object
            for (let pinsKey = 0; pinsKey < this.pins.length; pinsKey++) {
                let optionSelector = getPinConnections(this.pins[pinsKey]);

                optionSelector.addEventListener("change", (e) => {grid.updatePinConnections(this.peripheryId, pinsKey, optionSelector.value)},false);

                this.pins[pinsKey].optionSelector = optionSelector;
                peripheryObject.appendChild(optionSelector);
            }
        } else{
            for (let pinsKey = 0; pinsKey < this.pins.length; pinsKey++) {
                let pinDescriptions = getTextPinConnections(this.pins[pinsKey]);
                this.pins[pinsKey].textNode = pinDescriptions;
                peripheryObject.appendChild(pinDescriptions);
            }
        }

        // if object is zoomable -> on click on periphery object -> zoom in and move it to modal with all setup
        if(this.zoomable && getFull === false){
            peripheryObject.addEventListener("click", (e) => {
                modal.open(this);
            }, false);
        }

        // append extra elements to the object
        let extraElements = this.getExtraElements();
        if (extraElements !== null && extraElements !== undefined){
            peripheryObject.appendChild(extraElements);
        }

        // apply margin to the object
        peripheryObject.style.marginTop = this.margin.top + "px";
        peripheryObject.style.marginRight = this.margin.right + "px";
        peripheryObject.style.marginBottom = this.margin.bottom + "px";
        peripheryObject.style.marginLeft = this.margin.left + "px";

        root = this.applySpecials(root);

        if(!this.zoomable || !getFull){
            peripheryObject.addEventListener('contextmenu', (e) => {
                grid.rightClickedPeriphery = this;
                contextMenu.openContextMenu(e);
                e.preventDefault();
            });
        }

        peripheryObject.id = this.peripheryId;
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
        console.log("update pin connection")
        console.log(pinNumber, newConnection)
        console.log("------------------");
        this.pins[pinNumber].connectedTo = newConnection;
    }

    setPinValuesToDefault(){
        for (let pin = 0; pin < this.pins.length; pin++) {
            this.pins[pin].pinValue = null;
        }
    }

    getPropertiesHTML(table) {
        // return <>...properties</>
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

            table.appendChild(tr);
        }
        if (propertiesRows.length === 0){
            let tr = document.createElement("tr");
            tr.innerHTML = "No properties";
            table.appendChild(tr);
        }
    }

    getExtraElements(){
        // return extra elements for the component
        // need to be implemented in the child class
    }

    exceptions(){
        // apply exceptions to anything
        // need to be implemented in the child class
    }
}