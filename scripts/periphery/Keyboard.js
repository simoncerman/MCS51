class Keyboard extends InputPeriphery{
    constructor(peripheryId) {
        super(peripheryId);
        this.name = "Keyboard";
        this.peripheryId = peripheryId;

        this.pins = []
        this.pinsTop = [];
        this.pinsLeft = [];

        this.userText = [
            ["1", "2", "3", "A"],
            ["4", "5", "6", "B"],
            ["7", "8", "9", "C"],
            ["*", "0", "#", "D"]
        ]

        // create 4 top pins and 4 left pins
        for (let i = 0; i < 4; i++) {
            let pin = {
                    connectedTo: null,
                    pinValue : null,
                    pinPosition: {
                        x: i * 21 + 20,
                        y: 0
                    },
                    optionSelector: null,
                    textNode: null
                }
            this.pins.push(pin);
            this.pinsTop.push(pin);
        }

        for (let i = 0; i < 4; i++) {
            let pin = {
                    connectedTo: null,
                    pinValue : null,
                    pinPosition: {
                        x: 0,
                        y: i * 24 + 16
                    },
                    optionSelector: null,
                    textNode: null
                }
            this.pins.push(pin);
            this.pinsLeft.push(pin);
        }


        this.buttons = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }

    execute() {
        console.log("Keyboard execute");
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.buttons[i][j] === 1) {
                    if (this.pinsLeft[i].pinValue === "GND" && isPPin(this.pinsTop[j].connectedTo)) {
                        grid.leadingEdgeValuesArray[this.pinsTop[j].connectedTo] = "GND";
                    }
                    if (this.pinsTop[j].pinValue === "GND" && isPPin(this.pinsLeft[i].connectedTo)) {
                        grid.leadingEdgeValuesArray[this.pinsLeft[i].connectedTo] = "GND";
                    }
                }
            }
        }
    }

    getSVG() {
        return this.generateButtonMatrix();
    }

    generateButtonMatrix() {
        // all keyboards are 4x4 (5x5 if you count pin column)
        let table = document.createElement("table");
        table.classList.add("keyboard");

        // generate first row - empty row
        let tr = document.createElement("tr");
        for (let i = 0; i < 5; i++) {
            let td = document.createElement("td");
            td.classList.add("keyboard-button");
            tr.appendChild(td);
        }
        table.appendChild(tr);

        // generate table with first column empty
        for (let i = 0; i < 4; i++) {
            let tr = document.createElement("tr");

            // Create empty column
            let td = document.createElement("td");
            td.classList.add("keyboard-button");
            td.classList.add("keyboard-button-first");
            tr.appendChild(td);

            // Create 4 columns with buttons
            for (let j = 0; j < 4; j++) {
                let td = document.createElement("td");
                td.classList.add("keyboard-button");
                td.innerHTML = this.getButton(this.buttons[i][j], this.userText[i][j]);

                // Add event listener to button click and call updateButtons function
                td.addEventListener("click", () => {
                    this.updateButtons(i, j);
                });
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        return table;
    }

    updateButtons(i,j) {
        if (this.buttons[i][j] === 1) {
            this.buttons[i][j] = 0;
            grid.updateGrid();
        }
        else {
            this.buttons[i][j] = 1;
            grid.updateGrid();
        }
    }

    getButton(isPressed, text) {
        return `
            <svg id="Vrstva_2" width="80px" data-name="Vrstva 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 399.66 397.95">
              <defs>
                <style>
                  .cls-36 {
                    fill: none;
                  }
            
                  .cls-36, .cls-37, .cls-3 {
                    stroke: #000;
                    stroke-miterlimit: 10;
                    stroke-width: 5px;
                  }
            
                  .cls-37 {
                    fill: #ccc;
                  }
            
                  .cls-38 {
                    fill: #fff;
                  }
            
                  .cls-39 {
                    fill: red;
                  }
                  .white-btn{
                    fill: #fff;
                  }
                  .txt{
                        font: 100px "Roboto Mono";
                  }
                </style>
              </defs>
              <g id="Vrstva_1-2" data-name="Vrstva 1">
                <rect class="cls-38" x="82.39" y="80.68" width="314.77" height="314.77" rx="26.7" ry="26.7"/>
                <line class="cls-36" x1="240.14" y1="80.68" x2="240.14"/>
                <line class="cls-36" y1="238.07" x2="81.53" y2="238.07"/>
                <circle class="${(isPressed === 1) ? "cls-39" : "white-btn"}" cx="117.61" cy="366.26" r="11.65"/>
                <rect class="cls-37" x="130.91" y="121.52" width="218.46" height="233.1" rx="25.88" ry="25.88"/>
                <text x="210" y="270" class="txt">${text}</text>
              </g>
            </svg>`;
    }

    editTextOpen() {
        // open modal window table with text
        // generate input table with text from userText
        let table = document.createElement("table");
        for (let i = 0; i < 4; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < 4; j++) {
                let td = document.createElement("td");
                let input = document.createElement("input");
                input.value = this.userText[i][j];
                input.addEventListener("input", () => {
                    this.userText[i][j] = input.value;
                });
                td.appendChild(input);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        modal.open(table)
    }

    getAdditionalContextMenuOptions() {
        return [
            {
                name: "Edit text",
                action: () => {
                    this.editTextOpen();
                }
            }
        ]
    }
}