class FourteenSegmentDisplay extends Periphery{
    constructor(peripheryId, type) {
        super(peripheryId);
        this.name = "FourteenSegmentDisplay";
        this.pins = [
            // A
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 10,
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
                    x: 24,
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
                    x: 37,
                    y: 0
                },
                optionSelector : null,
                textNode: null
            },
            // D
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 50,
                    y: 0
                },
                optionSelector : null,
                textNode : null
            },
            // E
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 62,
                    y: 0
                },
                optionSelector : null,
                textNode : null
            },
            // F
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 74,
                    y: 0
                },
                optionSelector : null,
                textNode : null
            },
            // P
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 95,
                    y: 18
                },
                optionSelector : null,
                textNode : null
            },
            // G
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 95,
                    y: 27
                },
                optionSelector : null,
                textNode : null
            },
            // H
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 95,
                    y: 36
                },
                optionSelector : null,
                textNode : null
            },
            // J
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 95,
                    y: 46
                },
                optionSelector : null,
                textNode : null
            },
            // K
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 95,
                    y: 55
                },
                optionSelector : null,
                textNode : null
            },
            // L
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 95,
                    y: 65
                },
                optionSelector : null,
                textNode : null
            },
            // M
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 95,
                    y: 74
                },
                optionSelector : null,
                textNode : null
            },
            // N
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: 95,
                    y: 84
                },
                optionSelector : null,
                textNode : null
            },
            // DP
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: -5,
                    y: 18
                },
                optionSelector : null,
                textNode : null
            },
            // COM
            {
                connectedTo : null,
                pinValue : null,
                pinPosition : {
                    x: -5,
                    y: 29
                },
                optionSelector : null,
                textNode : null
            }
        ]
        this.litAreas = {
            0: {
                lit: true,
                litArea: "A"
            },
            1: {
                lit: false,
                litArea: "B"
            },
            2: {
                lit: false,
                litArea: "C"
            },
            3: {
                lit: false,
                litArea: "D"
            },
            4: {
                lit: false,
                litArea: "E"
            },
            5: {
                lit: false,
                litArea: "F"
            },
            6: {
                lit: false,
                litArea: "P"
            },
            7: {
                lit: false,
                litArea: "G"
            },
            8: {
                lit: false,
                litArea: "H"
            },
            9: {
                lit: false,
                litArea: "J"
            },
            10: {
                lit: false,
                litArea: "K"
            },
            11: {
                lit: false,
                litArea: "L"
            },
            12: {
                lit: false,
                litArea: "M"
            },
            13: {
                lit: false,
                litArea: "N"
            },
            14: {
                lit: false,
                litArea: "DP"
            }

        }
        let fourteenSegmentType = this.type;
        this.properties = {
            fourteenSegmentType: {
                name: "fourteenSegmentType",
                type: "select",
                options: ["commonAnode", "commonCathode"],
                value: fourteenSegmentType,
                propertyKey: "fourteenSegmentType"
            },
        }
        this.zoomable = true;
        this.width = 300;
        this.zoomWidth = 600;
        // type can be "commonAnode" or "commonCathode"
        if (type !== "commonAnode" && type !== "commonCathode") {
            this.type = "commonAnode";
        }
        else {
            this.type = type;
        }
        this.title = this.type;
    }

    execute() {
        if (this.type === "commonCathode") {
            if(this.pins[14].pinValue === "GND") {
                for (let i = 0; i < 14; i++) {
                    this.litAreas[i].lit = this.pins[i].pinValue === 1;
                }
                // DP
                this.litAreas[14].lit = this.pins[15].pinValue === 1;
            } else {
                for (let litAreaKey in this.litAreas) {
                    this.litAreas[litAreaKey].lit = false;
                }
            }
        }
        if (this.type === "commonAnode") {
            if(this.pins[14].pinValue === 1) {
                for (let i = 0; i < 14; i++) {
                    this.litAreas[i].lit = this.pins[i].pinValue === "GND";
                }
                // DP
                this.litAreas[14].lit = this.pins[15].pinValue === "GND";
            } else {
                for (let litAreaKey in this.litAreas) {
                    this.litAreas[litAreaKey].lit = false;
                }
            }
        }
    }
    applySpecials(root) {
        // for fourteen segment display
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
    getSVG(width) {
        return `
            <svg style="width: ${width} " id="Vrstva_2" data-name="Vrstva 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 895.73 892.2">
            <defs>
            <style>
            .cls-40, .cls-41 {
                    fill: none;
                }
        
            .cls-40, .cls-41, .cls-42 {
                    stroke-miterlimit: 10;
                }
        
            .cls-40, .cls-42 {
                    stroke: #000;
                    stroke-width: 4px;
                }
        
            .cls-41 {
                    stroke: #020202;
                }
        
            .cls-42 {
                    fill: #fff;
                }
        
            .cls-43 {
                    font-family: MyriadPro-Regular, 'Myriad Pro';
                    font-size: 30px;
                }
        
            .cls-44 {
                    letter-spacing: -.02em;
                }
        
            .lit{
                    fill: #ff0;
                }
            </style>
            </defs>
                <g id="Vrstva_1-2" data-name="Vrstva 1">
                    <g id="Vrstva_1-3" data-name="Vrstva 1">
                        <path class="cls-42" d="M777.05,890.2H114.65c-17.6,0-31.8-14.2-31.8-31.8V114c0-17.6,14.2-31.8,31.8-31.8H777.15c17.6,0,31.8,14.2,31.8,31.8V858.3c0,17.6-14.3,31.9-31.9,31.9Z"/>
                    </g>
                    <polygon class="cls-42 A" points="243.13 159.74 312.24 127.94 589.02 127.94 658.3 159.74 589.02 191.61 312.24 191.61 243.13 159.74"/>
                    <polygon class="cls-42 G" points="449.93 486.2 432.57 397.8 432.61 198.55 449.93 198.55 467.28 198.55 467.24 397.81 449.93 486.2"/>
                    <polygon class="cls-42 P" points="442.15 486.2 392.27 411.18 316.05 227.09 332.04 220.46 348.08 213.82 424.31 397.91 442.15 486.2"/>
                    <polygon class="cls-42 H" points="457.99 486.2 507.29 412.57 582.23 231.6 566.23 224.98 550.19 218.33 475.26 399.3 457.99 486.2"/>
                    <polygon class="cls-42 L" points="450.71 508.4 433.35 594.39 433.4 788.19 450.72 788.19 468.07 788.19 468.03 594.38 450.71 508.4"/>
                    <polygon class="cls-42 M" points="442.94 508.4 393.06 583.43 316.84 767.51 332.83 774.14 348.87 780.78 425.1 596.69 442.94 508.4"/>
                    <polygon class="cls-42 K" points="458.78 508.4 508.08 582.04 583.01 763 567.02 769.63 550.98 776.27 476.05 595.3 458.78 508.4"/>
                    <polygon class="cls-42 N" points="439.61 498.43 394.2 518.41 291.83 518.41 291.83 498.5 291.83 478.55 394.2 478.55 439.61 498.43"/>
                    <polygon class="cls-42 J" points="463.01 498.43 508.98 518.66 612.61 518.66 612.62 498.5 612.62 478.3 508.98 478.3 463.01 498.43"/>
                    <polygon class="cls-42 D" points="251.19 830.28 318.96 798.48 590.37 798.48 658.3 830.28 590.37 862.15 318.96 862.15 251.19 830.28"/>
                    <polygon class="cls-42 B" points="630.59 181.41 662.39 234.19 662.39 445.57 630.59 498.48 598.72 445.57 598.72 234.19 630.59 181.41"/>
                    <polygon class="cls-42 C" points="630.59 498.48 662.39 551.26 662.39 762.65 630.59 815.55 598.72 762.65 598.72 551.26 630.59 498.48"/>
                    <polygon class="cls-42 F" points="275 181.41 306.8 234.19 306.8 445.57 275 498.48 243.13 445.57 243.13 234.19 275 181.41"/>
                    <polygon class="cls-42 E" points="275 498.48 306.8 551.26 306.8 762.65 275 815.55 243.13 762.65 243.13 551.26 275 498.48"/>
                    <line class="cls-40" x1="809.96" y1="172.63" x2="895" y2="172.63"/>
                    <line class="cls-40" x1="146" y1="81.1" x2="146"/>
                    <line class="cls-40" x1="259.39" y1="81.1" x2="259.39"/>
                    <line class="cls-40" x1="372.78" y1="81.1" x2="372.78"/>
                    <line class="cls-40" x1="486.16" y1="81.1" x2="486.16"/>
                    <line class="cls-40" x1="599.55" y1="81.1" x2="599.55"/>
                    <line class="cls-40" x1="712.93" y1="81.1" x2="712.93"/>
                    <text class="cls-43" transform="translate(138.86 114.96)"><tspan x="0" y="0">A</tspan></text>
                    <text class="cls-43" transform="translate(251.91 114.96)"><tspan x="0" y="0">B</tspan></text>
                    <text class="cls-43" transform="translate(365.53 114.96)"><tspan x="0" y="0">C</tspan></text>
                    <text class="cls-43" transform="translate(478.11 114.96)"><tspan x="0" y="0">D</tspan></text>
                    <text class="cls-43" transform="translate(592.05 114.96)"><tspan x="0" y="0">E</tspan></text>
                    <text class="cls-43" transform="translate(705.39 115.14)"><tspan x="0" y="0">F</tspan></text>
                    <line class="cls-40" x1="809.96" y1="257.66" x2="895" y2="257.66"/>
                    <line class="cls-40" x1="809.96" y1="339.94" x2="895" y2="339.94"/>
                    <line class="cls-40" x1="809.96" y1="427.74" x2="895" y2="427.74"/>
                    <line class="cls-40" x1="808.95" y1="512.78" x2="893.99" y2="512.78"/>
                    <line class="cls-40" x1="810.69" y1="597.82" x2="895.73" y2="597.82"/>
                    <line class="cls-40" x1="808.95" y1="682.86" x2="893.99" y2="682.86"/>
                    <line class="cls-40" x1="808.95" y1="767.9" x2="893.99" y2="767.9"/>
                    <text class="cls-43" transform="translate(784 181.74)"><tspan x="0" y="0">P</tspan></text>
                    <text class="cls-43" transform="translate(781.22 266.52)"><tspan x="0" y="0">G</tspan></text>
                    <text class="cls-43" transform="translate(781.72 350.01)"><tspan x="0" y="0">H</tspan></text>
                    <text class="cls-43" transform="translate(785.78 435.95)"><tspan x="0" y="0">J</tspan></text>
                    <text class="cls-43" transform="translate(781.23 522.23)"><tspan x="0" y="0">K</tspan></text>
                    <text class="cls-43" transform="translate(784 608.13)"><tspan x="0" y="0">L</tspan></text>
                    <text class="cls-43" transform="translate(776.63 691.18)"><tspan x="0" y="0">M</tspan></text>
                    <text class="cls-43" transform="translate(778.37 776.27)"><tspan x="0" y="0">N</tspan></text>
                    <line class="cls-40" x1="81.1" y1="181.74" y2="181.74"/>
                    <text class="cls-43" transform="translate(96.47 188.86)"><tspan class="cls-44" x="0" y="0">C</tspan><tspan x="16.77" y="0">OM</tspan></text>
                    <line class="cls-40" x1="81.1" y1="275.51" y2="275.51"/>
                    <text class="cls-43" transform="translate(95.12 286.01)"><tspan x="0" y="0">DP</tspan></text>
                    <circle class="cls-41 DP" cx="733.37" cy="836.45" r="25.7"/>
                </g>
            </svg>`
    }
        
}