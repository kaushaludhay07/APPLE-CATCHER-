// Funzione costruttore per definire la singola mela
function AppleComponent(width, height, imgObject, x, y) {
    this.width = width; // Assegna la larghezza della mela
    this.height = height; // Assegna l'altezza della mela
    this.image = imgObject; // Salva il riferimento all'immagine
    this.x = x; // Posizione X di partenza
    this.y = y; // Posizione Y di partenza
    this.speedY = 4; // Imposta la velocità di caduta verso il basso
}

// Oggetto gestore per l'insieme di tutte le mele
var gestioneMele = {
    lista: [], // Array che conterrà tutte le mele attive

    genera: function() { // Metodo per creare nuove mele
        // Genera la mela al primo frame o ogni 45 frame
        if (myGameArea.frameNo == 1 || everyinterval(45)) {
            var size = 35; // Dimensione in pixel della mela
            // Calcola una posizione orizzontale X casuale dentro i bordi del canvas
            var x = Math.floor(Math.random() * (myGameArea.canvas.width - size));
            var y = -size; // Posiziona la mela appena fuori dal bordo superiore
           
            // Crea una nuova mela con "new" e la aggiunge all'array lista
            this.lista.push(new AppleComponent(size, size, appleImg, x, y));
        }
    },

    aggiorna: function() { // Metodo per muovere, controllare e ridisegnare le mele
        // Scorre l'array al contrario per poter rimuovere elementi in sicurezza
        for (var i = this.lista.length - 1; i >= 0; i--) {
            var mela = this.lista[i]; // Prende la mela corrente
            mela.y += mela.speedY; // Muove la mela verso il basso
            this.disegna(mela); // Ridisegna la mela nella nuova posizione

            // Controllo 1: Se il cesto prende la mela
            if (basket.crashWith(mela)) {
                score += 1; // Aumenta il punteggio di 1
                this.lista.splice(i, 1); // Rimuove la mela presa dall'array
                continue; // Passa alla prossima mela
            }

            // Controllo 2: Se la mela tocca il fondo dello schermo
            if (mela.y + mela.height >= myGameArea.canvas.height) {
                this.lista.splice(i, 1); // Rimuove la mela caduta dall'array
                lives -= 1; // Sottrae una vita

                // Se le vite finiscono scatta il Game Over
                if (lives <= 0) {
                    gameOver(); // Chiama la funzione di game over
                    return; // Interrompe il ciclo
                }
            }
        }
    },

    disegna: function(mela) { // Metodo per disegnare la mela sul canvas
        var ctx = myGameArea.context; // Prende il contesto di disegno
        if (mela.image) { // Se l'immagine della mela esiste
            // Traccia l'immagine alle coordinate specificate
            ctx.drawImage(mela.image, mela.x, mela.y, mela.width, mela.height);
        }
    }
};
