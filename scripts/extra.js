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

function getPinConnections(pins){
    // connections are selectors with options representing pins for I/O
    let connections = [];
    for(let pin in pins){
        let selector = document.createElement("select");
        selector.classList.add("pin-connection-selector");
        selector.style.left = pins[pin].pinPosition.x + "px";
        selector.style.top = pins[pin].pinPosition.y + "px";

        //prepare all options
        let options = getAllConnectionOptions();
        for (let i = 0; i < options.length; i++) {
            selector.appendChild(options[i]);
        }
        if (pins[pin].connectedTo != null) selector.value = pins[pin].connectedTo;

        connections.push(selector);
    }
    return connections;
}


// Load all periphery scripts
loadScript("scripts/periphery/LED.js");