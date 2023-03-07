class ContextMenu{
    constructor() {
        this.menu = null;
        this.activeId = null;
    }
    openContextMenu(e){
        this.activeId = this.findPeripheryId(e.target);
        if (this.menu !== null){
            this.closeContextMenu();
        }
        let contextMenu = this.createContextMenu();
        contextMenu.style.top = e.pageY + "px";
        contextMenu.style.left = e.pageX + "px";
        this.menu = contextMenu;
        document.body.appendChild(contextMenu);
    }

    closeContextMenu(){
        if (document.getElementsByClassName("context-menu").length > 0){
            document.getElementsByClassName("context-menu")[0].remove();
        }
        this.menu = null;
    }

    createContextMenu(){
        let contextMenu = document.createElement("div");
        contextMenu.classList.add("context-menu");

        let deleteOption = document.createElement("div");
        deleteOption.classList.add("context-menu-option");
        deleteOption.innerHTML = "Remove";
        deleteOption.addEventListener("click", (e) => {
            grid.removePeriphery(this.activeId);
            this.closeContextMenu();
        });

        let deleteAllOption = document.createElement("div");
        deleteAllOption.classList.add("context-menu-option");
        deleteAllOption.innerHTML = "Remove All";
        deleteAllOption.addEventListener("click", (e) => {
            grid.removeAllPeripheries();
            this.closeContextMenu();
        });

        let saveOption = document.createElement("div");
        saveOption.classList.add("context-menu-option");
        saveOption.innerHTML = "Save";
        saveOption.addEventListener("click", (e) => {
            grid.savePeriphery(this.activeId);
            this.closeContextMenu();
        });

        let saveAllOption = document.createElement("div");
        saveAllOption.classList.add("context-menu-option");
        saveAllOption.innerHTML = "Save All";
        saveAllOption.addEventListener("click", (e) => {
            grid.savePeripheryFile();
            this.closeContextMenu();
        });

        let separatingLine = document.createElement("div");
        separatingLine.classList.add("context-menu-separator");
        separatingLine.style.width = "100%";
        separatingLine.style.height = "1px";
        separatingLine.style.backgroundColor = "black";
        separatingLine.style.margin = "5px 0px";

        contextMenu.appendChild(deleteOption);
        contextMenu.appendChild(deleteAllOption);
        contextMenu.appendChild(saveOption);
        contextMenu.appendChild(saveAllOption);
        contextMenu.appendChild(separatingLine);

        contextMenu = this.addAdditionalOptions(contextMenu);

        return contextMenu;
    }
    findPeripheryId(element){
        if (element.classList.contains("periphery-object")){
            return element.id;
        } else {
            return this.findPeripheryId(element.parentElement);
        }
    }

    addAdditionalOptions(contextMenu) {
        if(this.activeId === null) return contextMenu;
        let index = grid.elements.findIndex((element) => element.peripheryId === this.activeId);
        let periphery = grid.elements[index];
        let additionalOptions = periphery.getAdditionalContextMenuOptions();
        if(additionalOptions === null) return contextMenu;
        additionalOptions.forEach((option) => {
            let optionElement = document.createElement("div");
            optionElement.classList.add("context-menu-option");
            optionElement.innerHTML = option.name;
            optionElement.addEventListener("click", (e) => {
                option.action();
                this.closeContextMenu();
            });
            contextMenu.appendChild(optionElement);
        });

        return contextMenu;
    }
}
let contextMenu = new ContextMenu();