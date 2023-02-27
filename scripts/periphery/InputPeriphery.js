class InputPeriphery extends Periphery{
    prepare() {
        // get values from pins and pass them to pinValues
        for (let pin = 0; pin < this.pins.length; pin++) {
            if(this.pins[pin].connectedTo != null){
                switch (this.pins[pin].connectedTo) {
                    case "GND":
                        this.pins[pin].pinValue = "GND";
                        break;

                    case "V+": // 5V
                        this.pins[pin].pinValue = 1;
                        break;

                    case null:
                        this.pins[pin].pinValue = null;
                        break;

                    case undefined:
                        this.pins[pin].pinValue = null;
                        break;

                    case " ":
                        this.pins[pin].pinValue = null;
                        break;

                    default:
                        let bitData = retrieveSpecialBit(this.pins[pin].connectedTo);
                        if(bitData.value === 0){
                            this.pins[pin].pinValue = null;
                        } else{
                            this.pins[pin].pinValue = bitData.value;
                        }
                }
            }
        }
    }
}