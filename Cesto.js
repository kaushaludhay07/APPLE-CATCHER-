// === 1. OGGETTO CESTO ===
var basket = {
    width: 70, // Larghezza del cestino
    height: 50, // Altezza del cestino
    image: basketImg, // Immagine usata per il cesto
    x: 365, // Posizione orizzontale iniziale (al centro)
    y: 330, // Posizione verticale iniziale (in basso)
    speedX: 0, // Velocità orizzontale iniziale

    update: function() { // Metodo per disegnare il cesto a schermo
        var ctx = myGameArea.context; // Prende il contesto grafico
        if (this.image) { // Se l'immagine è caricata
            // Disegna l'immagine del cesto alle coordinate correnti
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    },

    move: function() { // Metodo per calcolare il movimento del cesto
        this.speedX = 0; // Azzera la velocità ad ogni frame
        // Se la freccia Sinistra è premuta
        if (myGameArea.keys && myGameArea.keys["ArrowLeft"]) {
            this.speedX = -7; // Imposta la velocità a sinistra
        }
        // Se la freccia Destra è premuta
        if (myGameArea.keys && myGameArea.keys["ArrowRight"]) {
            this.speedX = 7; // Imposta la velocità a destra
        }

        this.x += this.speedX; // Applica il movimento alla posizione X

        // Limite sinistro dello schermo
        if (this.x < 0) {
            this.x = 0; // Non permette al cesto di uscire a sinistra
        }
        // Limite destro dello schermo
        if (this.x + this.width > myGameArea.canvas.width) {
            this.x = myGameArea.canvas.width - this.width; // Non permette al cesto di uscire a destra
        }
    },

    crashWith: function(otherobj) { // Gestione della collisione tra il cesto e altri oggetti
        var myleft = this.x; // Lato sinistro del cesto
        var myright = this.x + this.width; // Lato destro del cesto
        var mytop = this.y; // Lato superiore del cesto
        var mybottom = this.y + this.height; // Lato inferiore del cesto
       
        var otherleft = otherobj.x; // Lato sinistro della mela
        var otherright = otherobj.x + otherobj.width; // Lato destro della mela
        var othertop = otherobj.y; // Lato superiore della mela
        var otherbottom = otherobj.y + otherobj.height; // Lato inferiore della mela
       
        var crash = true; // Presume che ci sia collisione
        // Se la mela si trova completamente fuori dai 4 lati del cesto
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false; // La collisione non c'è
        }
        return crash; // Ritorna l'esito della collisione (true/false)
    }
};

// === 2. LOGICA E CICLO DI GIOCO ===
var score = 0; // Variabile globale per il punteggio
var lives = 3; // Variabile globale per le vite

function startGame() { // Prepara e avvia una nuova partita
    document.getElementById("start-screen").classList.add("hidden"); // Nasconde la schermata di avvio
    document.getElementById("game-over-screen").classList.add("hidden"); // Nasconde la schermata di game over
   
    score = 0; // Azzera il punteggio
    lives = 3; // Ripristina le 3 vite
    gestioneMele.lista = []; // Svuota la lista delle mele della partita precedente
   
    basket.x = 365; // Riposiziona il cesto al centro
    basket.y = 330; // Riposiziona il cesto in basso
   
    myGameArea.start(); // Fai partire il ciclo di gioco principale
}

function restartGame() { // Funzione di riavvio
    startGame(); // Richiama semplicemente startGame()
}

function gameOver() { // Gestisce il Game Over
    myGameArea.stop(); // Interrompe il loop di gioco
    document.getElementById("final-score").innerText = score; // Mostra il punteggio finale nell'HTML
    document.getElementById("game-over-screen").classList.remove("hidden"); // Mostra l'overlay di Game Over
}

function updateGameArea() { // Funzione principale chiamata a ogni frame (~50 volte al secondo)
    myGameArea.clear(); // Pulisce il canvas
    myGameArea.frameNo += 1; // Incrementa il contatore dei frame

    // Gestione cesto
    basket.move(); // Calcola la nuova posizione del cesto
    basket.update(); // Ridisegna il cesto

    // Gestione mele
    gestioneMele.genera(); // Controlla se generare una nuova mela
    gestioneMele.aggiorna(); // Aggiorna posizione, collisioni e ridisegna le mele

    // Disegno dell'HUD (Punteggio e Vite a schermo)
    var ctx = myGameArea.context; // Prende il contesto grafico
    ctx.fillStyle = "#ffffff"; // Colore del testo bianco per il punteggio
    ctx.font = "bold 18px 'Segoe UI'"; // Imposta il carattere del punteggio
    ctx.fillText("Mele Raccolte: " + score, 15, 30); // Scrive il punteggio in alto a sinistra
   
    ctx.fillStyle = "#ff4d4d"; // Colore del testo rosso per le vite
    // Disegna il testo delle vite concatenando l'emoji del cuore per ogni vita rimanente
    ctx.fillText("Vite: " + "❤️".repeat(lives), myGameArea.canvas.width - 120, 30);
}


