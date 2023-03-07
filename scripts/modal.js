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
        let content = document.getElementById("controls")
        content.style.display = "block";
        this.modal.style.display = "block";
        this.modalContent.innerHTML = "";
        this.modalContent.appendChild(content);
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

