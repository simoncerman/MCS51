class LED extends Periphery{
    constructor(peripheryId, ledColor = "yellow"){
        super(peripheryId);
        this.name = "LED";
        this.peripheryId = peripheryId;
        this.pins = {
            0: {
                connectedTo: "P0.0",
                pinValue : null,
                pinPosition: {
                    x: -4,
                    y: 138
                },
                optionSelector : null
            },
            1: {
                connectedTo: "GND",
                pinValue : null,
                pinPosition: {
                    x: 25,
                    y: 111
                },
                optionSelector: null
            },
        };
        this.ledColor = ledColor; // if null -> default color
        this.isGlowing = false;
    }

    execute(){
        // make stuff by reading pin values
        this.isGlowing = this.pins[0].pinValue === 1 && this.pins[1].pinValue === "GND";
    }

    getHTML(){
        // load svg into image element
        let str = this.getSVG();
        var oParser = new DOMParser();
        var oDOM = oParser.parseFromString(str, "image/svg+xml");
        var root = oDOM.documentElement;


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

        // seting led color
        root.getElementsByClassName("led-color")[0].style.fill = this.ledColor;

        // seting led light
        if(this.isGlowing) {
            root.getElementsByClassName("led-light")[0].style.fill = this.ledColor;
        }

        return peripheryObject;
    }

    getSVG() {
        // return svg of the LED
        return `
        <svg style="width: 70px" id="Vrstva_2" data-name="Vrstva 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 263.77 613.65">
          <defs>
            <style>
              .cls-1 {
                fill: #fff;
                stroke: #000;
                stroke-miterlimit: 10;
                stroke-width: 5px;
              }
            </style>
          </defs>
          <g id="Vrstva_2-2" data-name="Vrstva 2">
            <path class="cls-1 led-light" d="M229.05,67.31C211.97,27.14,172.12,1.38,129.05,2.54,87.96,3.64,50.96,29.04,34.73,67.31V241.17H229.05V67.31Z"/>
            <rect class="cls-1 led-color" x="2.5" y="241.17" width="258.77" height="52.39"/>
            <rect class="cls-1" x="74.14" y="293.56" width="32.08" height="317.58"/>
            <rect class="cls-1" x="157.55" y="293.56" width="32.08" height="217.07"/>
            <polygon class="cls-1" points="74.14 241.17 74.14 71.86 96.6 71.86 126.54 92.53 129.39 105.01 103.01 115.7 103.01 241.17 74.14 241.17"/>
            <polygon class="cls-1" points="203.17 241.17 155.05 241.17 133.31 200.89 133.31 123.19 152.92 96.45 111.93 71.86 203.17 71.86 203.17 241.17"/>
          </g>
        </svg>
        `;
    }
}