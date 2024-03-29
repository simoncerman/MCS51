let interval;
let timeElapsed = 0;

let currentDocument;

//let randomdataCheckbox = document.getElementById("randomdataControl");

function onRunBtnClick() {
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
        removeLabels();
        prepareForExecution();
        //RUN CLOCK
        interval = setInterval(onClockSignal, getClockInterval() / 1000);
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

function onStopBtnClick() {
    if (!isPaused) {
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
        if (getClockInterval() / 1000 >= 100)
            highlightActiveLine();
        interupter.execute();
        delay(currentInstruction.cycles * getClockInterval() / 1000);
        interval = setInterval(onClockSignal, getClockInterval() / 1000);
    }
}

function onStepBtnClick() {
    if (!isRunning) {
        isRunning = true;
        changeGUIToRun();           //Upravení GUI
        getGutterColors();
        getCodeText();              //Získání textu
        normalizeCode();            //Upravení textu
        replaceSpecialAddresses();  //Nahrazení speciálních registrů
        SyntaxDetection();          //Kontrola Syntaxe, detekce labelů
        removeComments();           //Odstranění komentářů
        removeEmptyLines();         //Odstranění prázdných řádků
        translateCode();            //Přeložení kódu
        removeLabels();             //Odstranění labelů
        prepareForExecution();
        doInstructionStep();
        grid.updateGrid();
        clearGutter();
        highlightActiveLine();
        interupter.execute();
    }
    else {
        //Do Step
        doInstructionStep();
        grid.updateGrid();
        clearGutter();
        highlightActiveLine();
        interupter.execute();
    }
}

function onClockSignal() {
    if (!checkForBreakPoint()) {
        doInstructionStep();
        grid.updateGrid();
        clearGutter();
        if (getClockInterval() / 1000 >= 100)
            highlightActiveLine();
        interupter.execute();
        delay(currentInstruction.cycles * getClockInterval() / 1000);
    }
    else
        onStopBtnClick();
}
window.events.onSave(() => {
    let data = {
        "Code": getEditorText(),
        "Periphery": grid.getPeripheryJson()
    };
    window.fileManager.saveFile(JSON.stringify(data));
})

window.events.onSaveAs(() => {
    let data = {
        "Code": getEditorText(),
        "Periphery": grid.getPeripheryJson()
    };
    window.fileManager.saveFileAs(JSON.stringify(data));
})

window.events.onOpen((data) => {
    setEditorText(data.Code);
    grid.peripheryReplace(data.Periphery);
})