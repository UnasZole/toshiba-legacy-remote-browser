console.log("Background script loaded");

browser.runtime.onMessage.addListener(async (message) => {

    console.log("Received message:", message);

    if (message.type !== "sendKey") {
        return;
    }

    const config = await browser.storage.local.get([
        "host",
        "port",
        "user",
        "password"
    ]);

    const url =
        `http://${config.host}:${config.port}` +
        `/remote/remote.htm?key=${message.code}`;

    console.log("Sending request to:", url);

    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true, config.user, config.password);

    xhr.onload = () => {
        console.log("Success:", xhr.status);
    };

    xhr.onerror = (e) => {
        console.error("XHR failed:", e);
    };

    xhr.send();
});