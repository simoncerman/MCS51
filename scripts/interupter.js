class interuptersystem {
    constructor() {
        this.interupts = [
            function (i,priority) {
                if (getBitInAddr(TCON, 1) == 1) {
                    if (getBitFromAddr(TCON, 0) == 1) {
                        setBitInAddr(TCON, 1, 0);
                    }
                    i.interupt(0x0003,priority);
                }
            },
            function (i,priority) {
                if (GetOverflow(0) == 1) {
                    setBitInAddr(TCON, 5, 0);
                    i.interupt(0x000B,priority);
                }

            },
            function (i,priority) {
                if (getBitInAddr(TCON, 3) == 1) {
                    if (getBitFromAddr(TCON, 2) == 1) {
                        setBitInAddr(TCON, 3, 0);
                    }
                    i.interupt(0x0013,priority);
                }
            },
            function (i,priority) {
                if (GetOverflow(1) == 1) {
                    setBitInAddr(TCON, 7, 0);
                    i.interupt(0x001B,priority);
                    if (serialHandler.sendQueue.length !== 0) {
                        if (serialHandler.mode == 1 || serialHandler.mode == 3) {
                            serialHandler.sendData();
                        }
                    }
                }
            },
            function (i,priority) {
                if (serialHandler.getTI() == 1 || serialHandler.getRI() == 1) {
                    i.interupt(0x0023,priority);
                }
            }
        ]

        this.currentIntPriority = 0;
        this.lastIEIP = getDataValueFrom(IE).toString() + getDataValueFrom(IP).toString();
        this.retiWasRun = false;

        this.int0last = 1;
        this.int1last = 1;

    }

    nulation() {
        this.retiWasRun = true;
        this.currentIntPriority = 0;
    }

    interupt(progAddress,priority) {
        this.currentIntPriority = priority;
        incrementSPby(1);
        data[data[SP]] = retrieve8bitsOfPC(false);
        incrementSPby(1);
        data[data[SP]] = retrieve8bitsOfPC(true);
        setPCValueTo(progAddress);
    }

    execute() {

        if (this.int0last != getBitFromAddr(P3, 2)) {
            switch (getBitFromAddr(TCON, 0)) {
                case 0:
                    setBitInAddr(TCON, 1, 1 - getBitFromAddr(P3, 2));
                    break;
                case 1:
                    if (0 == getBitFromAddr(P3, 2)) {
                        setBitInAddr(TCON, 1, 1);
                    }
                    break;
            }
        }

        if (this.int1last != getBitFromAddr(P3, 3)) {
            switch (getBitFromAddr(TCON, 2)) {
                case 0:
                    setBitInAddr(TCON, 3, 1 - getBitFromAddr(P3, 3));
                    break;
                case 1:
                    if (0 == getBitFromAddr(P3, 3)) {
                        setBitInAddr(TCON, 3, 1);
                    }
                    break;
            }
        }

        this.int0last = getBitFromAddr(P3, 2);
        this.int1last = getBitFromAddr(P3, 3);
        if (this.retiwasrun) {
            this.retiwasrun = false;
            return;
        }

        if (getBitFromAddr(IE, 7) == 0) {
            return;
        }
        if (this.lastIEIP != getDataValueFrom(IE).toString() + getDataValueFrom(IP).toString()) {
            this.lastIEIP = getDataValueFrom(IE).toString() + getDataValueFrom(IP).toString();
            return;
        }

        for (let i = 1; i > -1; i--) {
            for (let j = 0; j < 5; j++) {
                if (getBitFromAddr(IP, j) == i) {
                    if (getBitFromAddr(IE, j) == 1) {
                        let priority = 7 * i - j + 7;
                        if (priority <= this.currentIntPriority) { continue; }
                        this.source = j;
                        this.interupts[j](this,priority);
                    }
                }
            }
        }
    }
}

let interupter = new interuptersystem();