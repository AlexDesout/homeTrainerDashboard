const ws = new WebSocket("ws://192.168.0.165:1880/ws/dashboard");

ws.onopen = function () {
  console.log("Connecté au WebSocket pour le dashboard");
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // console.log(data);

    document.getElementById('val-speed').textContent = data.speed;
    document.getElementById('val-bpm').textContent = data.bpm;
    document.getElementById('val-spo2').textContent = data.spo2;
    document.getElementById('val-temp').textContent = data.temp;

    const ws = new WebSocket("ws://192.168.0.165:1880/ws/dashboard");

ws.onopen = function () {
  console.log("Connecté au WebSocket pour le dashboard");
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Mise à jour des valeurs sur le dashboard
    document.getElementById('val-speed').textContent = data.speed;
    document.getElementById('val-bpm').textContent = data.bpm;
    document.getElementById('val-spo2').textContent = data.spo2;
    document.getElementById('val-temp').textContent = data.temp;

    // Déterminer le statut du joueur
    let statusText = "EFFORT OPTIMAL";
    let statusClass = "status-ok";

    // Exemple de règles : tu peux ajuster les seuils
    if(data.bpm > 180 || data.temp > 39){
        statusText = "DANGER !";
        statusClass = "status-danger"; // à créer dans ton CSS
    } else if(data.bpm > 150 || data.temp > 38){
        statusText = "EFFORT INTENSE";
        statusClass = "status-warning"; // à créer dans ton CSS
    } else if(data.bpm < 60){
        statusText = "TROP FAIBLE";
        statusClass = "status-warning";
    }

    // Mettre à jour le div status
    const statusDiv = document.getElementById('status-message');
    statusDiv.innerHTML = `Statut du joueur : <span class="${statusClass}">${statusText}</span>`;
};
};