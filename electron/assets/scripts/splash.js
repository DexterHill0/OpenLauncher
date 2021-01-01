var ipc = window.require("electron").ipcRenderer;

ipc.on("OL-SPLASH_SCREEN_TEXT_CHANGE", (event, text) => {
	document.getElementById("loading_text").innerHTML = text;
});
