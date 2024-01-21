let interval;
let timeElapsed = 0;

let currentDocument;

let randomdataCheckbox = $('randomdataControl');

function onRunBtnClick() {
    if (!isRunning) {
        isRunning = true;
        checkTeacherConfig();
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
        delay(currentInstruction.cycles * getClockInterval() / 1000);
        interval = setInterval(onClockSignal, getClockInterval() / 1000);
    }
}

function onStepBtnClick() {
    if (!isRunning) {
        isRunning = true;
        checkTeacherConfig();
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
    if (!checkForBreakPoint()) {
        doInstructionStep();
        grid.updateGrid();
        clearGutter();
        if (getClockInterval() / 1000 >= 100)
            highlightActiveLine();
        delay(currentInstruction.cycles * getClockInterval() / 1000);
    }
    else
        onStopBtnClick();
}

function checkStudentConfig() {
    let reader = new FileReader();
    reader.readAsText("G:\\MCSim_config_file.json");
    reader.onload = () => {
        let result = reader.result.toString();
        let configFile = JSON.parse(result);
        randomdataCheckbox.checked = configFile.Random_data;

    }
}

function checkTeacherConfig() {
    let reader = new FileReader();
    reader.readAsText(); //config od učitele, ale nevém jakou mám použít cestu
    reader.onload = () => {
        let result = reader.result.toString();
        let configFile = JSON.parse(result);
        if (configFile.Random_data == true || configFile.Random_data == false) {
            randomdataCheckbox.checked = configFile.Random_data;
            randomdataCheckbox.disabled = true;
        }
        else {
            randomdataCheckbox.disabled = false;
        }

    }
}

function getSettings(fs){
    return {
        "Random_data": randomdataCheckbox.checked,
    }.toString();
}