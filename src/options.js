async function loadOptions() {
    const config = await browser.storage.local.get([
        "host",
        "port",
        "user",
        "password",
        "keymap"
    ]);

    document.getElementById("host").value = config.host || "";
    document.getElementById("port").value = config.port || "80";
    document.getElementById("user").value = config.user || "";
    document.getElementById("password").value = config.password || "";
    document.getElementById("keymap").value = config.keymap || "0";
}

async function saveOptions() {
    await browser.storage.local.set({
        host: document.getElementById("host").value,
        port: document.getElementById("port").value,
        user: document.getElementById("user").value,
        password: document.getElementById("password").value,
        keymap: document.getElementById("keymap").value
    });

    alert("Saved");
}

document.getElementById("save").addEventListener("click", saveOptions);

loadOptions();