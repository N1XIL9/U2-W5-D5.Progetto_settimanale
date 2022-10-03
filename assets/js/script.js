
// CREO UNA VARIABILE ARRAY CON GLI ELEMENTI E VARABILI PER GLI EFFETTI AUDIO
let arrayCards  = ['🎩', '🦉', '🌎','🎹','🦄', '🤣', '🐝', '💣','⏰','🎩','🦉', '🌎','🎹','🦄', '🤣', '🐝','💣','⏰'];
let audio = new Audio ('./assets/audio/audio_backg.mp3');
let audiocard = new Audio ('./assets/Sound/exatcards.mp3');
let flipaudio = new Audio ('./assets/Sound/flipsound.mp3');
let loseSound = new Audio ('./assets/Sound/losesound.mp3');
let winsound = new Audio ('./assets/Sound/win.mp3');
let clicksound = new Audio ('./assets/Sound/click.mp3');



// DEVO GENERARE UN ARRAY E QUINDI CREARE UNA FUNZIONE CHE GENERA IN MANIERA RANDOM GLI ELEMENTI IN UN ARRAY. 
function shuffle(a) {
    let currentIndex = a.length;
    let temporaryValue, randomIndex;
                      
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
                      

// CREO LA VARIABILE PER RIPULIRE OGNI VOLTA CHE SI INIZIA IL GIOCO 
let interval;

function startTimer(){
  
  let s = 6;
  let timer = document.getElementById('timer');
    interval = setInterval(function(){
    timer.innerHTML = `Time: ${s} sec`;
        s--;
        if(s < 0){
          clearInterval(interval);
          let lose = document.getElementById('finishGame')
          audio.pause();
          loseSound.play();
          audio.currentTime = 0;
          lose.classList.add('active')
        }
    },1000);   
}

// REALIZZO LA FUNZIONE CHE SI OCCUPA SI FAR PARTIRE IL TUTTO E LA CHIAMO STARTGAME 
// FACCIAMO PARTIRE LA FUNZIONE AL CLICK DEL PULSANTE START 


function startGame(){
    let arrayShuffle = shuffle(arrayCards); 
    clicksound.play();
    audio.play();


    // RILUPISCO LA VARIABILE INTERVAL CHE TIENE TRACCIA DEL TEMPO TRASCORSO E AZZERO L'ArrayComparison 
    // E CREO UN ARRAY arrayComparison PER CONFRONTARE OGNI VOLTA LE DUE CARTE SCOPERTE.
    clearInterval(interval);
    arrayComparison = [];

    // RIPULISCO IL CONTENUTO DEL CONTENITORE 'GRID'
    let lista = document.getElementById('grid');
        while (lista.hasChildNodes()){
        lista.removeChild(lista.firstChild);
    }
    // CREO UN ELEMENTO DIV CHE CONTIENE DENTRO UN ALTRO DIV CON CLASSE ICON E LO FACCIO CON UN CICLO FOR 
    for(let i = 0; i < 18; i++){    
        let box = document.createElement('div');
        let element = document.createElement('div');
        element.className = 'icon';
        document.getElementById('grid')
           .appendChild(box).appendChild(element);
        element.innerHTML = arrayShuffle[i];
    }

    // RICHIAMO LA FUNZIONE START TIMER PER CREARE L'AZIONE DI FAR PARTIRE AL CLICK DELLA CARD IL TIMER

    startTimer();
    let icon = document.getElementsByClassName('icon');
    let icons = [...icon];

    for (let i = 0; i < icons.length; i++) {
        icons[i].addEventListener('click', displayIcon);
        icons[i].addEventListener('click', openWindow);
    }   
}

// CREO LA FUNZIONE displayIcon CON LO SCOPO DI LEGGERE TUTTE LE ICONE CARICATE E ATTIVARE PER CIASCUNA CARTA SCOPERTA LA CLASSE = SHOW .


function displayIcon(){

    let iconsFind = document.getElementsByClassName("find");
    let icon = document.getElementsByClassName("icon");
    let icons = [...icon];
  
    // FACCIO GIRARE LA CARTA E INSERISCO LA CARTA SCOPERTA NELL'ARRAY COMPArISON. 
    flipaudio.play();
    flipaudio.currentTime = 0;
    this.classList.toggle("show");
    arrayComparison.push(this);
  
    // DETERMINO LA LUNGHEZZA DELL'ARRAY
    let len = arrayComparison.length;

    // SE È DUE CONFRONTA LE CARTE 
    if(len === 2){
        //SE UGUALI AGGIUNGO LE CLASSI 'FIND' PER ATTIVARE L'EFFETTO E 'DISABLE' PER DISATTIVAER IL CLICK 
      if(arrayComparison[0].innerHTML === arrayComparison[1].innerHTML){
        arrayComparison.forEach(function(elemento){
            elemento.classList.add("find","disabled");
            audiocard.play();
            audiocard.currentTime = 0
        });
        arrayComparison = [];  
        // SE NON SONO UGUALI AGGIUNGO LA CLASSE DISABLE PER DISATTIVARE OGNI ELEMENTO              
      } else {
        icons.forEach(function(item){
          item.classList.add('disabled');
        });
        // CREAO LA FUNZIONE PER FAR RIMANERE LE DUE CARTE SCOPERTE PER 700 MILLISECONDI
        setTimeout(function(){
          arrayComparison.forEach(function(elemento){
              elemento.classList.remove("show");
          });
          icons.forEach(function(item){
            item.classList.remove('disabled');
            for(var i = 0; i < iconsFind.length; i++){
                iconsFind[i].classList.add("disabled");
              }
          });
          arrayComparison = [];
        },700); 
       }
    }
}
  
// CREO LA FINESTRA CHE DEVE APPARIRE QUANDO INDOVINO TUTTE LE COMBINAZIONI
  
let modal = document.getElementById("modal");
let timer = document.querySelector("#timer");
let finishGame = document.getElementById('finishGame');

// SE MI TROVA LA LUNGHEZZA DI TUTTE LE 20 CARDS MI DEVE PULIRE L'INTERVALLO E USCIRE IL MESSAGGIO 'WOW! YOU HAVE A GREAT MEMORY!!! 🧠
let iconsFind = document.getElementsByClassName("find");

function openWindow(){  

  if (iconsFind.length >= 18){
    clearInterval(interval);
    document.getElementById('totalTime').innerHTML = timer.innerHTML
    modal.classList.add("active");
    winsound.play();
    audio.pause();
    audio.currentTime = 0;
    closeWindows();
  }
}

function closeWidows(){  
  closeicon.addEventListener("click", function(e){
    modal.classList.remove("active");
    startGame();
  });
}

// CREO LA FUNZIONE 'PLAY AGAIN' PER USCIRE DALLA FINESTRA DI MESSAGGIO DI SCONFITTA

function playAgain(){
  finishGame.classList.remove('active');
  modal.classList.remove("active");
  startGame();
}

