function loadScript(url)
{
    let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

function getAllConnectionOptions()
{
    let options = [];
    let optionsPorts = [
        " ",
        "P0.0", "P0.1", "P0.2", "P0.3", "P0.4", "P0.5", "P0.6", "P0.7",
        "P1.0", "P1.1", "P1.2", "P1.3", "P1.4", "P1.5", "P1.6", "P1.7",
        "P2.0", "P2.1", "P2.2", "P2.3", "P2.4", "P2.5", "P2.6", "P2.7",
        "P3.0", "P3.1", "P3.2", "P3.3", "P3.4", "P3.5", "P3.6", "P3.7",
        "GND", "V+"
    ];

    for (let i = 0; i < optionsPorts.length; i++){
        let option = document.createElement('option');
        option.value = optionsPorts[i];
        option.text = optionsPorts[i];
        options.push(option);
    }

    return options;
}

function getPinConnections(pin){
    // connections are selectors with options representing pins for I/O
    let selector = document.createElement("select");
    selector.classList.add("pin-connection-selector");
    selector.style.left = pin.pinPosition.x + "%";
    selector.style.top = pin.pinPosition.y + "%";

    //prepare all options
    let options = getAllConnectionOptions();
    for (let i = 0; i < options.length; i++) {
        selector.appendChild(options[i]);
    }
    if (pin.connectedTo != null) selector.value = pin.connectedTo;

    return selector;
}

function getTextPinConnections(pin){
    // connections are selectors with options representing pins for I/O
    let pinText = document.createElement("p");
    pinText.classList.add("pin-connection-text");
    pinText.style.left = pin.pinPosition.x + "%";
    pinText.style.top = pin.pinPosition.y + "%";
    if (pin.connectedTo != null) pinText.innerHTML = pin.connectedTo;
    else pinText.innerHTML = "";
    return pinText;
}

function generateSelector(options){
    let selector = document.createElement("select");
    for (const optionsKey in options) {
        let option = document.createElement('option');
        option.value = options[optionsKey];
        option.text = options[optionsKey];
        selector.appendChild(option);
    }
    return selector;
}

// load modal script
loadScript("scripts/modal.js");

// Load all periphery scripts
loadScript("scripts/periphery/Periphery.js");
loadScript("scripts/periphery/InputPeriphery.js")
loadScript("scripts/periphery/LED.js");
loadScript("scripts/periphery/SevenSegmentDisplay.js");
loadScript("scripts/periphery/MotorDC.js");
loadScript("scripts/periphery/LEDMatrix.js");
loadScript("scripts/periphery/StepEngine.js");
loadScript("scripts/periphery/LCD16x2Display.js");
loadScript("scripts/periphery/Button.js");
loadScript("scripts/periphery/Switch.js");
loadScript("scripts/periphery/SerialMonitor.js");
loadScript("scripts/periphery/DAC.js");
loadScript("scripts/periphery/ADC.js");
