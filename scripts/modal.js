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
    }
    open(actualObject){
        if (actualObject === null){
            actualObject = this.actualObject;
        }
        this.actualObject = actualObject;
        let content = actualObject.getHTML(true);
        this.modalContent.innerHTML = "";
        this.modalContent.appendChild(content);
        this.modal.style.display = "block";
    }
    close(){
        this.actualObject = null;
        this.modal.style.display = "none";
        grid.updateGrid();
    }
}

let modal = new Modal();

