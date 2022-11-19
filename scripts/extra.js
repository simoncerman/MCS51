function loadScript(url)
{
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}


// Load all periphery scripts
loadScript("scripts/periphery/LED.js");