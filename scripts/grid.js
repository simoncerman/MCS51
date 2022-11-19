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

        if (newPeripheryName === ""){
            alert("Periphery name cannot be empty");
        } else if(newPeripheryName === "LED")){
            newPeriphery = new LED("p1");
        }

        if(!newPeriphery){
            this.elements.push(newPeriphery);
            this.updateGrid();
        }
    }

    updateGrid(){
        let grid = document.getElementById("peripheriesGrid");
        grid.innerHTML = "";
        this.elements.forEach((element) => {
            grid.appendChild(element.getHTML());
        });
    }
}

let grid = new Grid();