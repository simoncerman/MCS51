class SevenSegmentDisplay extends Periphery{
    constructor(peripheryId, type) {
        super(peripheryId);
        this.name = "SevenSegmentDisplay";
        this.pins = [
            // A
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 61,
                    y: 0
                },
                optionSelector : null,
                textNode: null

            },
            // B
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 80,
                    y: 0
                },
                optionSelector: null,
                textNode: null
            },
            // C
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 61,
                    y: 97
                },
                optionSelector : null,
                textNode: null
            },
            // D
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 27,
                    y: 97
                },
                optionSelector : null,
                textNode : null
            },
            // E
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 10,
                    y: 97
                },
                optionSelector : null,
                textNode : null
            },
            // F
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 27,
                    y: 0
                },
                optionSelector : null,
                textNode : null
            },
            // G
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 10,
                    y: 0
                },
                optionSelector : null,
                textNode : null
            },
            // DP
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 80,
                    y: 97
                },
                optionSelector : null,
                textNode : null
            },
            // COM
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 44,
                    y: 0
                },
                optionSelector : null,
                textNode : null
            },
            // COM
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 44,
                    y: 97
                },
                optionSelector : null,
                textNode : null}
            ]
        this.litAreas = {
            0: {
                lit: true,
                litArea: "areaA"
            },
            1: {
                lit: false,
                litArea: "areaB"
            },
            2: {
                lit: false,
                litArea: "areaC"
            },
            3: {
                lit: false,
                litArea: "areaD"
            },
            4: {
                lit: false,
                litArea: "areaE"
            },
            5: {
                lit: false,
                litArea: "areaF"
            },
            6: {
                lit: false,
                litArea: "areaG"
            },
            7: {
                lit: false,
                litArea: "areaDP"
            }
        }
        let sevenSegmentType = this.type;
        this.properties = {
            sevenSegmentType: {
                name: "sevenSegmentType",
                type: "select",
                options: ["commonAnode", "commonCathode"],
                value: sevenSegmentType,
                propertyKey: "sevenSegmentType"
            },
        }
        this.zoomable = true;
        this.width = 150;
        this.zoomWidth = 500;
        // type can be "commonAnode" or "commonCathode"
        if (type !== "commonAnode" && type !== "commonCathode") {
            this.type = "commonAnode";
        }
        else {
            this.type = type;
        }
    }

    execute() {
        if (this.type === "commonCathode") {
            if(this.pins[8].pinValue === "GND" || this.pins[9].pinValue === "GND") {
                for (let i = 0; i < 8; i++) {
                    this.litAreas[i].lit = this.pins[i].pinValue === 1;
                }
            } else {
                for (let litAreaKey in this.litAreas) {
                    this.litAreas[litAreaKey].lit = false;
                }
            }
        }
        if (this.type === "commonAnode") {
            if(this.pins[8].pinValue === 1 || this.pins[9].pinValue === 1) {
                for (let i = 0; i < 8; i++) {
                    this.litAreas[i].lit = this.pins[i].pinValue === "GND";
                }
            } else {
                for (let litAreaKey in this.litAreas) {
                    this.litAreas[litAreaKey].lit = false;
                }
            }
        }
    }


    applySpecials(root) {
        for (const litAreasKey in this.litAreas) {
            const litArea = this.litAreas[litAreasKey];
            if (litArea.lit) {
                root.getElementsByClassName(litArea.litArea)[0].style.fill = "red";
            } else {
                root.getElementsByClassName(litArea.litArea)[0].style.fill = "white";
            }
        }
        return root;
    }

    getExtraElements() {
        let segmentTypeDescription = this.type === "commonAnode" ? "Common Anode" : "Common Cathode";
        let segmentTypeDescriptionElement = document.createElement("div");
        segmentTypeDescriptionElement.innerHTML = segmentTypeDescription;
        segmentTypeDescriptionElement.style.position = "absolute";
        segmentTypeDescriptionElement.style.top = "8%";
        segmentTypeDescriptionElement.style.left = "0";
        segmentTypeDescriptionElement.style.width = "100%";
        segmentTypeDescriptionElement.style.textAlign = "center";
        segmentTypeDescriptionElement.style.fontSize = "12px";
        return segmentTypeDescriptionElement;
    }

    getSVG(width = 70) {
        return`
            <svg style="width: ${width}px;" id="Vrstva_2" data-name="Vrstva 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 730.1 974.7">
              <defs>
                <style>
                  .cls-8 {
                    fill: none;
                  }
            
                  .cls-8, .cls-9 {
                    stroke: #000;
                    stroke-miterlimit: 10;
                    stroke-width: 4px;
                  }
            
                  .cls-9 {
                    fill: #fff;
                  }
                  
                  .test {
                    fill: #000;
                  }
                </style>
              </defs>
              <g id="Vrstva_1-2" data-name="Vrstva 1">
                <g id="Vrstva_1-3" data-name="Vrstva 1">
                  <path class="cls-9" d="M696.2,892.5H33.8c-17.6,0-31.8-14.2-31.8-31.8V116.3c0-17.6,14.2-31.8,31.8-31.8H696.3c17.6,0,31.8,14.2,31.8,31.8V860.6c0,17.6-14.3,31.9-31.9,31.9Z"/>
                  <line class="cls-8" x1="365" y1="82.2" x2="365" y2="1.2"/>
                  <line class="cls-8" x1="235.2" y1="82.2" x2="235.2" y2="1.2"/>
                  <line class="cls-8" x1="105.5" y1="81.1" x2="105.5"/>
                  <line class="cls-8" x1="494.8" y1="82.2" x2="494.8" y2="1.2"/>
                  <line class="cls-8" x1="624.5" y1="82.2" x2="624.5" y2="1.2"/>
                  <line class="cls-8" x1="365" y1="974.7" x2="365" y2="893.6"/>
                  <line class="cls-8" x1="235.2" y1="974.7" x2="235.2" y2="893.6"/>
                  <line class="cls-8" x1="105.5" y1="973.5" x2="105.5" y2="892.5"/>
                  <line class="cls-8" x1="494.8" y1="974.7" x2="494.8" y2="893.6"/>
                  <line class="cls-8" x1="624.5" y1="974.7" x2="624.5" y2="893.6"/>
                </g>
                <g id="Vrstva_2-2" data-name="Vrstva 2">
                  <g>
                    <g>
                      <polygon class="cls-9 areaA" points="459.5 206.7 417.2 249 247.8 249 205.4 206.7 247.8 164.3 417.2 164.3 459.5 206.7"/>
                      <polygon class="cls-9 areaB" points="470.1 217.4 512.4 259.8 512.4 429.2 470.1 471.5 427.7 429.2 427.7 259.8 470.1 217.4"/>
                      <polygon class="cls-9 areaC" points="470.1 489.8 512.4 532.1 512.4 701.5 470.1 743.9 427.7 701.5 427.7 532.1 470.1 489.8"/>
                      <polygon class="cls-9 areaD" points="459.5 754.2 417.2 796.6 247.8 796.6 205.4 754.2 247.8 711.9 417.2 711.9 459.5 754.2"/>
                      <polygon class="cls-9 areaE" points="194.8 489.8 237.2 532.1 237.2 701.5 194.8 743.9 152.5 701.5 152.5 532.1 194.8 489.8"/>
                      <polygon class="cls-9 areaF" points="194.8 217.4 237.2 259.8 237.2 429.2 194.8 471.5 152.5 429.2 152.5 259.8 194.8 217.4"/>
                      <polygon class="cls-9 areaG" points="459.5 480.4 417.2 522.7 247.8 522.7 205.4 480.4 247.8 438 417.2 438 459.5 480.4"/>
                    </g>
                    <circle class="cls-9 areaDP" cx="570.7" cy="748.4" r="48.2"/>
                  </g>
                </g>
              </g>
            </svg>
        `
        // return the svg code for the component
    }
}