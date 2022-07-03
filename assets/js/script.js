//! Importação da música:
const musica = new Audio("/assets/sounds/musica.mp3");

//! Pega o elemento de input que controla a música:
const buttonMusica = document.getElementById("buttonMusica");
const imgMusica = document.getElementById("imgMusica");

//! Função de pausar a música:
function PauseMusica(){
    //* Pausa a música:
    musica.pause();

    //* Troca o icone:
    imgMusica.setAttribute("src", "/assets/images/musica-pause.png");

    //* Define a função do click:
    buttonMusica.onclick = function(){
        // Reproduz a música:
        musica.play();

        // Define o volume:
        musica.volume = 0.01;

        // Define a música como Loop:
        musica.loop = true;

        // Define o tempo de reprodução de uma música para outra:
        musica.playbackRate = 1;

        // Define a icone do button:
        imgMusica.setAttribute("src", "/assets/images/musica-play.png");

        // Troca a função de click:
        buttonMusica.onclick = function(){
            PauseMusica();
        }
    };
}

//! Executa a função de reproduzir a música:
PauseMusica();