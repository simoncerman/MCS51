class LEDMatrix extends Periphery{
    constructor(peripheryId, matrixWidth, matrixHeight, matrixType) {
        super(peripheryId);
        this.name = "LEDMatrix";
        this.peripheryId = peripheryId;
        this.type = matrixType;
        // pin count = matrixWidth + matrixHeight

        this.pins = []
        this.pinsTop = [];
        this.pinsLeft = [];

        // two-dimensional array of LEDs
        this.LEDs = []

        // parse width and height to int
        matrixWidth = parseInt(matrixWidth);
        matrixHeight = parseInt(matrixHeight);

        // set max width and height
        if(matrixWidth > 6) matrixWidth = 6;
        if(matrixHeight > 6) matrixHeight = 6;

        // set min width and height
        if(matrixWidth < 1) matrixWidth = 1;
        if(matrixHeight < 1 ) matrixHeight = 1;

        // set width and height
        this.matrixWidth = matrixWidth;
        this.matrixHeight = matrixHeight;

        this.properties = {
            matrixWidth: {
                name: "Width",
                type: "select",
                options: [1,2,3,4,5,6],
                value: matrixWidth,
                propertyKey: "matrixWidth"
            },
            matrixHeight: {
                name: "Height",
                type: "select",
                options: [1,2,3,4,5,6],
                value: matrixHeight,
                propertyKey: "matrixHeight"
            },
            matrixType: {
                name: "Type",
                type: "select",
                options: ["Row Cathode", "Row Anode"],
                value: matrixType,
                propertyKey: "matrixType"
            }
        }

        this.prepare();
        this.execute();
        this.generateMatrix(this.matrixWidth, this.matrixHeight);
    }

    execute() {
        if(this.pins.length === 0) {
            for(let i = 0; i < this.matrixHeight; i++) {
                let arr = []
                for(let j = 0; j < this.matrixWidth; j++) {
                    arr[j] = 0;
                }
                this.LEDs[i] = arr;
            }
        } else{
            for(let i = 0; i < this.matrixHeight; i++) {
                for(let j = 0; j < this.matrixWidth; j++) {
                    if(this.type === "Row Cathode") {
                        if(this.pinsTop[j].pinValue === 1 && this.pinsLeft[i].pinValue === "GND") {
                            this.LEDs[i][j] = 1;
                        } else {
                            this.LEDs[i][j] = 0;
                        }
                    }
                    if(this.type === "Row Anode") {
                        console.log(this.pinsTop[j], this.pinsLeft[i])
                        if(this.pinsTop[j].pinValue === "GND" && this.pinsLeft[i].pinValue === 1) {
                            this.LEDs[i][j] = 1;
                        } else {
                            this.LEDs[i][j] = 0;
                        }
                    }
                }
            }
        }
        console.log(this.LEDs);
    }

    applySpecials(root) {
        return super.applySpecials(root);
    }

    getSVG() {
        return this.generateMatrix(this.matrixWidth, this.matrixHeight);
    }

    generateMatrix(width, height) {
        // generate matrix in area of numbers from 10 to 80
        let partW = 100 / (this.matrixWidth + 1);
        let partH = 100 / (this.matrixHeight + 1);

        // define table
        let table = document.createElement("table");
        table.classList.add("led-matrix-table");

        // generate first row (empty row)
        let tr = document.createElement("tr");
        for (let i = 0; i < this.matrixWidth; i++) {
            let td = document.createElement("td");
            td.classList.add("matrix-field");
            tr.appendChild(td);
        }
        table.appendChild(tr);

        // generate matrix with first column empty
        for (let i = 0; i < height; i++) {
            let tr = document.createElement("tr");

            // create first column with numbers
            let td = document.createElement("td");
            td.classList.add("matrix-field");
            td.classList.add("matrix-field-first");
            tr.appendChild(td);

            for (let j = 0; j < width; j++) {
                let td = document.createElement("td");

                // Generate pin positions
                let x = partW * (j + 1);
                let y = partH * (i + 1);

                console.log("kunda");
                // Generate pins
                if(this.pins.length !== this.matrixWidth + this.matrixHeight) {
                    if (j === 0) this.createPin(0, y);
                    if (i === 0) this.createPin(x, 0,);
                }

                // lit LED
                let lit = false;
                if(this.LEDs[i][j] === 1) {
                    lit = true;
                }

                if (this.type === "Row Cathode") {
                    let svg = this.getSvgRowCathode(lit);
                    td.appendChild(this.parseSVGtoObject(svg));
                    td.classList.add("matrix-field");
                }
                if (this.type === "Row Anode") {
                    let svg = this.getSvgRowAnode(lit);
                    td.appendChild(this.parseSVGtoObject(svg));
                    td.classList.add("matrix-field");
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        return table;

    }

    parseSVGtoObject(svg) {
        let oParser = new DOMParser();
        let oDOM = oParser.parseFromString(svg, "image/svg+xml");
        return oDOM.documentElement;
    }

    getSvgRowAnode(lit = false) {
        // Prepare table
        let litText = "none";
        if(lit) litText = "yellow";
        return `
        <svg style="width: 60px"  data-name="Vrstva 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 408.18 450.4">
          <defs>
            <style>
              .cls-12 {fill: none;stroke: #ff0;}
              .cls-12, .cls-10, .cls-11 {stroke-miterlimit: 10;stroke-width: 5px;}
              .cls-10 {stroke: red;}
              .cls-10, .cls-11 {fill: #fff;}
              .cls-11 {stroke: #000;}
            </style>
          </defs>
          <g id="Vrstva_1-2" data-name="Vrstva 1">
            <path class="cls-11" style="fill: ${litText};"  d="M362.07,149.31c-13.24-31.15-44.14-51.13-77.55-50.23-31.86,.85-60.56,20.55-73.14,50.23v134.83h150.69V149.31Z"/>
            <rect class="cls-11" x="186.39" y="284.14" width="200.67" height="40.63"/>
            <rect class="cls-11" x="241.95" y="324.76" width="24.88" height="123.14"/>
            <rect class="cls-11" x="306.63" y="324.76" width="24.88" height="61.57"/>
            <polygon class="cls-11" points="241.95 284.14 241.95 152.83 259.36 152.83 282.58 168.87 284.79 178.54 264.34 186.83 264.34 284.14 241.95 284.14"/>
            <polygon class="cls-11" points="342.01 284.14 304.69 284.14 287.83 252.9 287.83 192.64 303.04 171.91 271.25 152.83 342.01 152.83 342.01 284.14"/>
            <line class="cls-10" x1="241.95" y1="438.64" y2="438.64"/>
            <line class="cls-12" x1="331.51" y1="371.59" x2="405.68" y2="371.59"/>
            <line class="cls-12" x1="405.68" y1="371.59" x2="405.68"/>
          </g>
        </svg>
        `;
        }

    getSvgRowCathode(lit = false) {
        let litText = "none";
        if(lit) litText = "yellow";
        return `
        <svg id="Vrstva_2" style="width: 60px" data-name="Vrstva 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375.23 416.68">
            <defs>
                <style>
                .cls-13 {fill: none;stroke: #ff0;}
                .cls-13, .cls-14, .cls-15 {stroke-miterlimit: 10;stroke-width: 5px;}
                .cls-14 {stroke: red;}
                .cls-14, .cls-15 {fill: #fff;}
                .cls-15 {stroke: #000;}
            </style>
        </defs>
            <g id="Vrstva_1-2" data-name="Vrstva 1">
                <path class="cls-15" style="fill: ${litText};" d="M171.36,115.58c13.24-31.15,44.14-51.13,77.55-50.23,31.86,.85,60.56,20.55,73.14,50.23V250.41H171.36V115.58Z"/>
                <rect class="cls-15" x="146.37" y="250.41" width="200.67" height="40.63" transform="translate(493.42 541.45) rotate(180)"/>
                <rect class="cls-15" x="266.61" y="291.04" width="24.88" height="123.14" transform="translate(558.1 705.22) rotate(180)"/>
                <rect class="cls-15" x="201.93" y="291.04" width="24.88" height="61.57" transform="translate(428.74 643.65) rotate(180)"/>
                <polygon class="cls-15" points="291.49 250.41 291.49 119.11 274.07 119.11 250.85 135.14 248.64 144.82 269.1 153.11 269.1 250.41 291.49 250.41"/>
                <polygon class="cls-15" points="191.43 250.41 228.74 250.41 245.6 219.17 245.6 158.91 230.4 138.18 262.19 119.11 191.43 119.11 191.43 250.41"/>
                <line class="cls-14" x1="214.37" y1="352.61" y2="352.61"/>
                <line class="cls-13" x1="372.73" y1="414.18" x2="279.05" y2="414.18"/>
                <line class="cls-13" x1="372.73" y1="409.63" x2="372.73"/>
            </g>
        </svg>`
    }

    createPin(x, y) {
        let pin =
        {
            connectedTo: null,
            pinValue : null,
            pinPosition: {
                x: x,
                y: y
            },
            optionSelector : null,
            textNode: null,
        }

        // set references to later change
        if (x === 0) this.pinsLeft.push(pin);
        else if (y === 0) this.pinsTop.push(pin);

        this.pins.push(pin)
    }

    generateLeftTopPins() {
        this.pinsLeft = [];
        this.pinsTop = [];
        // working with this.pins
        // fist is left
        this.pinsLeft.push(this.pins[0]);
        // row of top
        for (let i = 0; i < this.matrixWidth; i++) {
            this.pinsTop.push(this.pins[i+1]);
        }
        // rest is left
        for (let y = 1; y < this.matrixHeight; y++) {
            this.pinsLeft.push(this.pins[y + this.matrixHeight])
        }
    }
}