// this will be handler for modal window stuff
class Modal{
    constructor(){
        this.modal = document.getElementById("modal");
        this.modal.style.zIndex = "9999";
        this.modalContent = document.getElementById("modal-content");
        this.modalBackground = document.getElementById("modal-background");
        //this.modalClose = document.getElementById("modal-close");
        //this.modalClose.addEventListener("click", this.close.bind(this));
        this.modalBackground.addEventListener("click", this.close.bind(this));
        this.actualObject = null;
        this.closeAction = null;
        this.settings = null;
    }
    openElement(actualObject){
        if (this.actualObject === null && !actualObject) return;
        if (actualObject === null){
            actualObject = this.actualObject;
        }
        this.actualObject = actualObject;
        let content = actualObject.getHTML(true);
        this.modalContent.innerHTML = "";
        this.modalContent.appendChild(content);
        this.modal.style.display = "block";
    }
    openSettings(){
        if (this.settings === null){
            this.settings = document.getElementById("controls");
        }
        this.settings.style.display = "block";
        this.modal.style.display = "block";
        this.modalContent.innerHTML = "";
        this.modalContent.appendChild(this.settings);
        if(serialHandler.getSerialMonitors() == null){
            document.getElementById("sermor").disabled = false;
        }
    }
    open(object, closeAction = null){
        if (closeAction){
            this.closeAction = closeAction;
        }
        this.modalContent.innerHTML = "";
        this.modalContent.appendChild(object);
        this.modal.style.display = "block";
    }
    close(){
        if (this.closeAction){
            this.closeAction();
        }
        this.actualObject = null;
        this.modal.style.display = "none";
        grid.updateGrid();
    }
}

let modal = new Modal();

