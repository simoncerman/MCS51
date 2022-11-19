class LED{
    constructor(peripheryId, ledColor = null){
        this.name = "LED";
        this.description = "A light emitting diode";
        this.peripheryId = peripheryId;

        this.pins = {
            0: null,
            1: null
        };

        this.pinValues = {
            0: null,
            1: null
        }

        this.ledColor = ledColor; // if null -> default color
        this.isGlowing = false;
    }

    prepare(){
        // get values from pins and pass them to pinValues
    }

    execute(){
        // make stuff by reading pin values
    }

    getHTML(){

    }

    on(){
        this.isGlowing = true;
        document.getElementById(this.peripheryId).style.backgroundColor = "yellow";
        // set glow element to color of the LED
    }
    off(){
        this.isGlowing = false;
        // set glow element to white color
    }
    toggle(){
        this.isGlowing = !this.isGlowing;
    }

}