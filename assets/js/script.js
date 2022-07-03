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
    if(localStorage.theme === "dark" || (("theme" in localStorage) && esquemaDeCores.matches)){
        // Chama a função de deixar no modo escuro:
        AtivarModoEscuro();
    }
    else{
        // Chama a função de deixar no modo claro:
        AtivarModoClaro();
    }
}

//! Função de ativar o modo escuro:
function AtivarModoEscuro(){
    //* Adiciona a classe de dark na página:
    document.documentElement.classList.add("dark");

    //* Coloca a imagem da lua:
    imgEstilo.setAttribute("src", "/assets/images/lua.png");

    //* Salva a configuração no computador:
    localStorage.theme = "dark";

    //* Define que o botão deverá ter a função de ativar o modo claro:
    buttonEstilo.onclick = function(){
        AtivarModoClaro();
    };
}

//! Função de ativar o modo claro:
function AtivarModoClaro(){
    //* Remove a classe de dark na página:
    document.documentElement.classList.remove("dark");

    //* Coloca a imagem do sol:
    imgEstilo.setAttribute("src", "/assets/images/sol.png");

    //* Salva a configuração no computador:
    localStorage.removeItem("theme");

    //* Define que o botão deverá ter a função de ativar o modo escuro:
    buttonEstilo.onclick = function(){
        AtivarModoEscuro();
    };
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