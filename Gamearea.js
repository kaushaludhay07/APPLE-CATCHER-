// Oggetto letterale che gestisce il Canvas e il ciclo di esecuzione del gioco
var myGameArea = {
    canvas: document.createElement("canvas"), // Crea il tag <canvas> nel DOM
    frameNo: 0, // Contatore dei frame di gioco trascorsi
    init: function() { // Metodo per inizializzare il canvas
        this.canvas.width = 800; // Imposta la larghezza del canvas a 800 pixel
        this.canvas.height = 400; // Imposta l'altezza del canvas a 400 pixel
        this.context = this.canvas.getContext("2d"); // Ottiene il contesto di disegno 2D
        document.getElementById("game-wrapper").appendChild(this.canvas); // Inserisce il canvas nell'HTML

        // Registra la pressione dei tasti della tastiera
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []); // Crea l'array delle chiavi se non esiste
            myGameArea.keys[e.key] = true; // Imposta il tasto premuto come true
        });
        // Registra il rilascio dei tasti della tastiera
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.key] = false; // Imposta il tasto rilasciato come false
        });
    },
    start: function() { // Avvia il ciclo di gioco
        this.frameNo = 0; // Azzera il conteggio dei frame
        this.interval = setInterval(updateGameArea, 20); // Chiama updateGameArea ogni 20ms (~50 FPS)
    },
    clear: function() { // Cancella la schermata
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Pulisce tutto il canvas
    },
    stop: function() { // Interrompe il gioco
        clearInterval(this.interval); // Blocca il timer del loop
    }
};

// Funzione di utilità per verificare se sono passati N frame
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 === 0) { // Controlla se frameNo è un multiplo di n
        return true; // Restituisce vero
    }
    return false; // Restituisce falso
}

// Quando la pagina web ha finito di caricarsi, inizializza l'area di gioco
window.onload = function() {
    myGameArea.init(); // Esegue il metodo init
};
