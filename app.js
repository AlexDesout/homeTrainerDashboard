// Connexion WebSocket (dashboard)
const ws = new WebSocket("ws://192.168.0.165:1880/ws/dashboard");

// WebSocket pour login/logout (séparée)
const wsAuth = new WebSocket("ws://192.168.0.165:1880/ws/login");

ws.onopen = () => {
  console.log("Connecté au dashboard ✅");
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Mise à jour des valeurs
    document.getElementById('val-speed').textContent = data.speed;
    document.getElementById('val-bpm').textContent = data.bpm;
    document.getElementById('val-spo2').textContent = data.spo2;
    document.getElementById('val-temp').textContent = data.temp;

    // Statut
    let statusText = "EFFORT OPTIMAL";
    let statusClass = "status-ok";

    if(data.bpm > 180 || data.temp > 39){
        statusText = "DANGER !";
        statusClass = "status-danger";
    } else if(data.bpm > 150 || data.temp > 38){
        statusText = "EFFORT INTENSE";
        statusClass = "status-warning";
    } else if(data.bpm < 60){
        statusText = "TROP FAIBLE";
        statusClass = "status-warning";
    }

    document.getElementById('status-message').innerHTML =
        `Statut du joueur : <span class="${statusClass}">${statusText}</span>`;
};

// 👉 Bouton logout
document.getElementById("logout-btn").addEventListener("click", () => {
    
    console.log("Déconnexion...");

    // Envoyer info à Node-RED
    wsAuth.send(JSON.stringify({
        login: false
    }));

    // Fermer la connexion dashboard
    ws.close();

    // Optionnel : reset affichage
    document.getElementById('val-speed').textContent = "—";
    document.getElementById('val-bpm').textContent = "—";
    document.getElementById('val-spo2').textContent = "—";
    document.getElementById('val-temp').textContent = "—";

    document.getElementById('status-message').innerHTML =
        'Statut du joueur : <span class="status-warning">DÉCONNECTÉ</span>';

    window.location.href = "index.html";
});