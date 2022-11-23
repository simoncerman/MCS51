class Grid {
    constructor(){
        this.elements = [];
        this.setListeners();

    }

    setListeners(){
        document.getElementById('addPeripheryButton').addEventListener('click', () => {this.addPeriphery()})
    }

    addPeriphery(){
        let newPeripheryName = document.getElementById("addPeripheryValue").value;
        let newPeriphery = null;

        // TODO: Add a switch case for each periphery type
        if (newPeripheryName === ""){
            alert("Periphery name cannot be empty");
        } else if(newPeripheryName === "LED"){
            newPeriphery = new LED("p"+ this.elements.length)
        }

        if(newPeriphery){
            this.elements.push(newPeriphery);
            this.updateGrid();
        }
    }

    updateGrid(){
        // prepares data in every element by input values
        this.elements.forEach((element) => {
            element.prepare();
        });

        // execute the data in every element
        this.elements.forEach((element) => {
            element.execute();
        });

        // update the grid
        let grid = document.getElementById("peripheriesGrid");
        grid.innerHTML = "";
        this.elements.forEach((element) => {
            grid.appendChild(element.getHTML());
        });
    }
}

let grid = new Grid();