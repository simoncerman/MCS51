class LEDMatrix extends Periphery{
    constructor(peripheryId, matrixWidth, matrixHeight, matrixType) {
        super(peripheryId);
        this.name = "LEDMatrix";
        this.peripheryId = peripheryId;
        this.type = matrixType;
        this.ledSVGs = [];
        // pin count = matrixWidth + matrixHeight

        this.pins = {}

        // set max width and height
        if(matrixWidth > 6) matrixWidth = 6;
        if(matrixHeight > 6) matrixHeight = 6;
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
    }

    execute() {
        super.execute();
    }

    applySpecials(root) {
        return super.applySpecials(root);
    }

    getSVG() {
        let LEDArray = this.generateMatrix(this.matrixWidth, this.matrixHeight);
        let matrixSVG = this.generateMatrixSVG(LEDArray);
        return matrixSVG;
    }

    generateMatrix(width, height) {
        let LEDArray = [];
        let nextPin = 0;
        // generate matrix in area of numbers from 10 to 80
        let partW = 70 / width
        let partH = 70 / height

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {

                //generate LED
                let x = 10 + j * partW;
                let y = 10 + i * partH;
                let name = "LED" + i + j;
                this.ledSVGs.push(name);
                LEDArray.push({x : x, y : y, name : name});

                // create pins
                if (i === 0) {
                    this.createPin(i, y);
                }
                if (j === 0) {
                    this.createPin(x, j);
                }
            }
        }
        return LEDArray;
    }

    generateMatrixSVG(LEDArray) {
        if(this.type === "Row Cathode") {
            return this.generateMatrixSVGRowCathode(LEDArray);
        }
        else if(this.type === "Row Anode") {
            return this.generateMatrixSVGRowAnode(LEDArray);
        }
    }

    generateMatrixSVGRowCathode(LEDArray) {

    }

    generateMatrixSVGRowAnode(LEDArray) {
        let svg = ``;
        for (let i = 0; i < LEDArray.length; i++) {
            svg += `
            <svg id="${LEDArray[i].name}" width="20px" style="left: ${LEDArray[i].x}%; right: ${LEDArray[i].y}%" id="Vrstva_2" data-name="Vrstva 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 408.18 450.4">
              <defs>
                <style>
                  .cls-1 {fill: none;stroke: #ff0;}
                  .cls-1, .cls-2, .cls-3 {stroke-miterlimit: 10;stroke-width: 5px;}
                  .cls-2 {stroke: red;}
                  .cls-2, .cls-3 {fill: #fff;}
                  .cls-3 {stroke: #000;}
                </style>
              </defs>
              <g id="Vrstva_1-2" data-name="Vrstva 1">
                <path class="cls-3" d="M362.07,149.31c-13.24-31.15-44.14-51.13-77.55-50.23-31.86,.85-60.56,20.55-73.14,50.23v134.83h150.69V149.31Z"/>
                <rect class="cls-3" x="186.39" y="284.14" width="200.67" height="40.63"/>
                <rect class="cls-3" x="241.95" y="324.76" width="24.88" height="123.14"/>
                <rect class="cls-3" x="306.63" y="324.76" width="24.88" height="61.57"/>
                <polygon class="cls-3" points="241.95 284.14 241.95 152.83 259.36 152.83 282.58 168.87 284.79 178.54 264.34 186.83 264.34 284.14 241.95 284.14"/>
                <polygon class="cls-3" points="342.01 284.14 304.69 284.14 287.83 252.9 287.83 192.64 303.04 171.91 271.25 152.83 342.01 152.83 342.01 284.14"/>
                <line class="cls-2" x1="241.95" y1="438.64" y2="438.64"/>
                <line class="cls-1" x1="331.51" y1="371.59" x2="405.68" y2="371.59"/>
                <line class="cls-1" x1="405.68" y1="371.59" x2="405.68"/>
              </g>
            </svg>
            `;
        }
        return svg;
    }

    createPin(x, y, nextPin) {
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
            matrixPinId: nextPin
        }
        Object.assign(this.pins, pin);
    }

}