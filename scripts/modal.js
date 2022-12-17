// this will be handler for modal window stuff
class Modal{
    constructor(){
        this.modal = document.getElementById("modal");
        this.modalContent = document.getElementById("modal-content");
        this.modalBackground = document.getElementById("modal-background");
        //this.modalClose = document.getElementById("modal-close");
        //this.modalClose.addEventListener("click", this.close.bind(this));
        this.modalBackground.addEventListener("click", this.close.bind(this));
    }
    open(content){
        this.modalContent.innerHTML = "";
        this.modalContent.appendChild(content);
        this.modal.style.display = "block";
    }
    close(){
        this.modal.style.display = "none";
        grid.updateGrid();
    }
}

let modal = new Modal();

