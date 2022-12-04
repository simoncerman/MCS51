class SevenSegmentDisplay extends Periphery{
    constructor(peripheryId) {
        super(peripheryId);
        this.name = "Seven Segment";
        this.pins = {
            0: {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 0
                },
                optionSelector: null,

            },
            1: {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 0
                },
                optionSelector: null,

            },
            2: {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 0
                },
                optionSelector: null,

            },
            3: {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 0
                },
                optionSelector: null,

            },
            4: {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 0
                },
                optionSelector: null,

            },
            5: {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 0
                },
                optionSelector: null,

            },
            6: {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 0
                },
                optionSelector: null,

            },
            7: {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 0
                },
                optionSelector: null,

            },
            8: {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 0
                },
                optionSelector: null,

            },
            9: {
                connectedTo: null,
                pinValue : null,
                pinPosition: {
                    x: 0,
                    y: 0
                },
                optionSelector: null,

            },
        }
    }

    getSVG() {
        return`
            <svg style="width: 150px;" id="Vrstva_2" data-name="Vrstva 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 730.1 974.7">
              <defs>
                <style>
                  .cls-1 {
                    fill: none;
                  }
            
                  .cls-1, .cls-2 {
                    stroke: #000;
                    stroke-miterlimit: 10;
                    stroke-width: 4px;
                  }
            
                  .cls-2 {
                    fill: #fff;
                  }
                  
                  .test {
                    fill: #000;
                  }
                </style>
              </defs>
              <g id="Vrstva_1-2" data-name="Vrstva 1">
                <g id="Vrstva_1-3" data-name="Vrstva 1">
                  <path class="cls-2" d="M696.2,892.5H33.8c-17.6,0-31.8-14.2-31.8-31.8V116.3c0-17.6,14.2-31.8,31.8-31.8H696.3c17.6,0,31.8,14.2,31.8,31.8V860.6c0,17.6-14.3,31.9-31.9,31.9Z"/>
                  <line class="cls-1" x1="365" y1="82.2" x2="365" y2="1.2"/>
                  <line class="cls-1" x1="235.2" y1="82.2" x2="235.2" y2="1.2"/>
                  <line class="cls-1" x1="105.5" y1="81.1" x2="105.5"/>
                  <line class="cls-1" x1="494.8" y1="82.2" x2="494.8" y2="1.2"/>
                  <line class="cls-1" x1="624.5" y1="82.2" x2="624.5" y2="1.2"/>
                  <line class="cls-1" x1="365" y1="974.7" x2="365" y2="893.6"/>
                  <line class="cls-1" x1="235.2" y1="974.7" x2="235.2" y2="893.6"/>
                  <line class="cls-1" x1="105.5" y1="973.5" x2="105.5" y2="892.5"/>
                  <line class="cls-1" x1="494.8" y1="974.7" x2="494.8" y2="893.6"/>
                  <line class="cls-1" x1="624.5" y1="974.7" x2="624.5" y2="893.6"/>
                </g>
                <g id="Vrstva_2-2" data-name="Vrstva 2">
                  <g>
                    <g>
                      <polygon class="cls-2 areaA" points="459.5 206.7 417.2 249 247.8 249 205.4 206.7 247.8 164.3 417.2 164.3 459.5 206.7"/>
                      <polygon class="cls-2 areaB" points="470.1 217.4 512.4 259.8 512.4 429.2 470.1 471.5 427.7 429.2 427.7 259.8 470.1 217.4"/>
                      <polygon class="cls-2 areaC" points="470.1 489.8 512.4 532.1 512.4 701.5 470.1 743.9 427.7 701.5 427.7 532.1 470.1 489.8"/>
                      <polygon class="cls-2 areaD" points="459.5 754.2 417.2 796.6 247.8 796.6 205.4 754.2 247.8 711.9 417.2 711.9 459.5 754.2"/>
                      <polygon class="cls-2 areaE" points="194.8 489.8 237.2 532.1 237.2 701.5 194.8 743.9 152.5 701.5 152.5 532.1 194.8 489.8"/>
                      <polygon class="cls-2 areaF" points="194.8 217.4 237.2 259.8 237.2 429.2 194.8 471.5 152.5 429.2 152.5 259.8 194.8 217.4"/>
                      <polygon class="cls-2 areaG" points="459.5 480.4 417.2 522.7 247.8 522.7 205.4 480.4 247.8 438 417.2 438 459.5 480.4"/>
                    </g>
                    <circle class="cls-2 areaDP" cx="570.7" cy="748.4" r="48.2"/>
                  </g>
                </g>
              </g>
            </svg>
        `
        // return the svg code for the component
    }
}