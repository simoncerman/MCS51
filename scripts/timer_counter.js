let TT0 = new Object();
let TT1 = new Object();
let T0 = 1;
let T1 = 1;

function TTSetUp(){

    TT0.mode = parseInt(getBitFromAddr(TMOD, 1).toString() +  getBitFromAddr(TMOD, 0).toString(), 2);
    TT1.mode = parseInt(getBitFromAddr(TMOD, 5).toString() +  getBitFromAddr(TMOD, 4).toString(), 2);

    //Časovač = 0; Čítač = 1
    TT0.signal = getBitFromAddr(TMOD, 2);
    TT1.signal = getBitFromAddr(TMOD, 6);

    TT0.running = !!getBitFromAddr(TCON, 4);
    TT1.running = !!getBitFromAddr(TCON, 6);

    T0 = getBitFromAddr(P3, 4);
    T1 = getBitFromAddr(P3, 5);
}

//Časovač = 0; Čítač = 1
function incrementTT(signal){

    //console.log("increment called");
    if(TT0.signal == signal && signal == 0 && TT0.running){
        switch(TT0.mode){
            case 0:
                incrementInAddr(TL0);
                if(getDataValueFrom(TL0) > 0x1F) {
                    setDataValueTo(TL0, 0x0);
                    incrementInAddr(TH0);
                    if (getDataValueFrom(TH0) > 0xFF) {
                        setDataValueTo(TH0, 0x0);
                        setOverflow(0);
                    }
                }
                break
            case 1:
                incrementInAddr(TL0);
                if(getDataValueFrom(TL0) > 0xFF) {
                    setDataValueTo(TL0, 0x0);
                    incrementInAddr(TH0);
                    if (getDataValueFrom(TH0) > 0xFF) {
                        setDataValueTo(TH0, 0x0);
                        setOverflow(0);
                    }
                }
                break
            case 2:
                incrementInAddr(TL0);
                if(getDataValueFrom(TL0) > 0xFF) {
                    setDataValueTo(TL0, getDataValueFrom(TH1));
                    setOverflow(0);
                }
                break
            case 3:
                incrementInAddr(TL0);
                incrementInAddr(TH0);
                if(getDataValueFrom(TL0) > 0xFF) {
                    setDataValueTo(TL0, 0x0);
                    setOverflow(0);
                }
                if(getDataValueFrom(TH0) > 0xFF) {
                    setDataValueTo(TH0, 0x0);
                    setOverflow(1);
                }
                break
        }
    }

    if(TT1.signal == signal && signal == 0 && TT1.running){
        switch(TT1.mode){
            case 0:
                incrementInAddr(TL1);
                if(getDataValueFrom(TL1) > 0x1F) {
                    setDataValueTo(TL1, 0x0);
                    incrementInAddr(TH1);
                    if (getDataValueFrom(TH1) > 0xFF) {
                        setDataValueTo(TH1, 0x0);
                        setOverflow(1);
                    }
                }
                break
            case 1:
                incrementInAddr(TL1);
                if(getDataValueFrom(TL1) > 0xFF) {
                    setDataValueTo(TL1, 0x0);
                    incrementInAddr(TH1);
                    if (getDataValueFrom(TH1) > 0xFF) {
                        setDataValueTo(TH1, 0x0);
                        setOverflow(1);
                    }
                }
                break
            case 2:
                incrementInAddr(TL1);
                if(getDataValueFrom(TL1) > 0xFF) {
                    setDataValueTo(TL1, getDataValueFrom(TH1));
                    setOverflow(1);
                }
                break
            case 3:
                break
        }
    }

    if (TT0.signal == signal && signal == 1 && TT0.running && T0 == 0 && getBitFromAddr(P3, 4) == 1) {
        switch(TT0.mode){
            case 0:
                incrementInAddr(TL0);
                if(getDataValueFrom(TL0) > 0x1F) {
                    setDataValueTo(TL0, 0x0);
                    incrementInAddr(TH0);
                    if (getDataValueFrom(TH0) > 0xFF) {
                        setDataValueTo(TH0, 0x0);
                        setOverflow(0);
                    }
                }
                break
            case 1:
                incrementInAddr(TL0);
                if(getDataValueFrom(TL0) > 0xFF) {
                    setDataValueTo(TL0, 0x0);
                    incrementInAddr(TH0);
                    if (getDataValueFrom(TH0) > 0xFF) {
                        setDataValueTo(TH0, 0x0);
                        setOverflow(0);
                    }
                }
                break
            case 2:
                incrementInAddr(TL0);
                if(getDataValueFrom(TL0) > 0xFF) {
                    setDataValueTo(TL0, getDataValueFrom(TH1));
                    setOverflow(0);
                }
                break
            case 3:
                incrementInAddr(TL0);
                incrementInAddr(TH0);
                if(getDataValueFrom(TL0) > 0xFF) {
                    setDataValueTo(TL0, 0x0);
                    setOverflow(0);
                }
                if(getDataValueFrom(TH0) > 0xFF) {
                    setDataValueTo(TH0, 0x0);
                    setOverflow(1);
                }
                break
        }
    }

    if (TT1.signal == signal && signal == 1 && TT1.running && T1 == 0 && getBitFromAddr(P3, 5) == 1) {
        switch(TT1.mode){
            case 0:
                incrementInAddr(TL1);
                if(getDataValueFrom(TL1) > 0x1F) {
                    setDataValueTo(TL1, 0x0);
                    incrementInAddr(TH1);
                    if (getDataValueFrom(TH1) > 0xFF) {
                        setDataValueTo(TH1, 0x0);
                        setOverflow(1);
                    }
                }
                break
            case 1:
                incrementInAddr(TL1);
                if(getDataValueFrom(TL1) > 0xFF) {
                    setDataValueTo(TL1, 0x0);
                    incrementInAddr(TH1);
                    if (getDataValueFrom(TH1) > 0xFF) {
                        setDataValueTo(TH1, 0x0);
                        setOverflow(1);
                    }
                }
                break
            case 2:
                incrementInAddr(TL1);
                if(getDataValueFrom(TL1) > 0xFF) {
                    setDataValueTo(TL1, getDataValueFrom(TH1));
                    setOverflow(1);
                }
                break
            case 3:
                break
        }
    }
}

function setOverflow(index){
    switch (index){
        case 0:
            setBitInAddr(TCON, 5, 1);
            break;
        case 1:
            setBitInAddr(TCON, 7, 1);
            break;
    }
}

function GetOverflow(index){
    switch (index){
        case 0:
            return getBitFromAddr(TCON, 5);
        case 1:
            return getBitFromAddr(TCON, 7);
    }
}