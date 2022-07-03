//! Importação da música:
const musica = new Audio("/assets/sounds/musica.mp3");

//! Pega o elemento de button e img que controla a música:
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
        musica.volume = 0.05;

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

//! Pega o elemento de button e img que controla a cor:
const buttonEstilo = document.getElementById("buttonEstilo");
const imgEstilo = document.getElementById("imgEstilo");

//! Função que define o estilo claro ou escuro para o site:
function DefinirEstiloPadrão(){
    //* Pega o esquema de cores do usuário:
    esquemaDeCores = window.matchMedia('(prefers-color-scheme: dark)')

    //* Verifica qual o modo de cor do dispositivo:
    if(esquemaDeCores.matches){
        //* Coloca a imagem da lua:
        imgEstilo.setAttribute("src", "/assets/images/lua.png");
    }
    else{
        //* Coloca a imagem do sol:
        imgEstilo.setAttribute("src", "/assets/images/sol.png");
    }
}

//! Função de definir a altura dos blocos pela largura:
function DefinirAltura(){
    //* Pega todos os blocos com a classe passada:
    const blocos = document.getElementsByClassName("bloco");
    var arrayBlocos = [...blocos];

    //* Percorre o array de blocos:
    arrayBlocos.forEach(function(bloco){
        // Define a altura baseado na largura:
        bloco.style.height = bloco.offsetWidth+"px";
    });
}

//! Comando caso a tela seja redimensionada:
document.body.onresize = function(){
    //* Executa a função de definir a altura dos blocos:
    DefinirAltura();
}

//! Comando caso o dispositivo mude de cor padrão:
window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", DefinirEstiloPadrão);

//! Executa a função de reproduzir a música:
PauseMusica();

//! Executa a função que define as alturas:
DefinirAltura();

//! Executa a função de pegar qual o tema em uso:
DefinirEstiloPadrão();