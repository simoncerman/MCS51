let interval;
let timeElapsed = 0;

function onRunBtnClick(){
    if(!isRunning){
        isRunning = true;
        changeGUIToRun();           //Upravení GUI
        getGutterColors();
        getCodeText();              //Získání textu
        normalizeCode();            //Upravení textu
        replaceSpecialAddresses();  //Nahrazení speciálních registrů
        SyntaxDetection();          //Kontrolo Syntaxe, detekce labelů
        removeComments();           //Odstranění komentářů
        removeEmptyLines();         //Odstranění prázdných řádků
        translateCode();            //Přeložení kódu
        removeLabels();
        prepareForExecution(); 
        //RUN CLOCK
        interval = setInterval(onClockSignal, getClockInterval());
    }
    else {
        isRunning = false;
        changeGUIToReset();
        updateTableData();
        fillUpSpecials();
        timeElapsed = 0;
        grid.resetPinValues();
        clearInterval(interval);
    }
}

function onStopBtnClick(){
    if(!isPaused) {
        isPaused = true;
        changeGUIToPaused();
        clearInterval(interval);
        highlightActiveLine();
    }
    else {
        isPaused = false;
        changeGUIToNotPaused();
        clearGutter();
        doInstructionStep();
        grid.updateGrid();
        clearGutter();
        if(getClockInterval() >= 100)
            highlightActiveLine();
        delay(currentInstruction.cycles * getClockInterval());
        interval = setInterval(onClockSignal, getClockInterval());
    }
}

function onStepBtnClick(){
    if (!isRunning) {
        isRunning = true;
        changeGUIToRun();           //Upravení GUI
        getGutterColors();
        getCodeText();              //Získání textu
        normalizeCode();            //Upravení textu
        replaceSpecialAddresses();  //Nahrazení speciálních registrů
        SyntaxDetection();          //Kontrolo Syntaxe, detekce labelů
        removeComments();           //Odstranění komentářů
        removeEmptyLines();         //Odstranění prázdných řádků
        translateCode();            //Přeložení kódu
        removeLabels();             //Odstranění labelů
        prepareForExecution();      
        doInstructionStep();
        grid.updateGrid();
        clearGutter();
        highlightActiveLine();
    }
    else {
        //Do Step
        doInstructionStep();
        grid.updateGrid();
        clearGutter();
        highlightActiveLine();
    }
}

function onClockSignal() {
        if (!checkForBreakPoint()){
            doInstructionStep();
            grid.updateGrid();
            clearGutter();
            if(getClockInterval() >= 100)
                highlightActiveLine();
            delay(currentInstruction.cycles * getClockInterval());
        }
        else
            onStopBtnClick();
}
