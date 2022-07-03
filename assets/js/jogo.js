//! Conta a quantidade de jogadas:
var jogadas = 0;

//! Arrays que salvam as posições dos cliques:
var jogadasDoX = [];
var jogadasDoO = [];


//! Variavel que guarda a condição da vez:
var condicao;

//! Variavel auxiliar na quantidade de jogadores:
var jogador = 0;

//! Função que recebe os nomes dos jogadores:
function ExibirPrompt(){
    //* Soma 1 na variavel jogador:
    jogador++;

    //* Cria a div auxiliar para pedir as informações:
    var div = document.createElement("div");
    div.id = "prompt";
    div.classList.add("absolute", "w-full", "h-full", "flex", "justify-center", "items-center", "bg-slate-700/[.6]");

    //* Cria a estrutura do prompt:
    var janelaPrompt = `
        <div class="bg-slate-600 text-gray-200 rounded-md shadow-md shadow-gray-600 mx-3">
            <div class="bg-slate-800 py-2 px-3 rounded-t-md font-bold text-lg">
                <h2>Jogador ${jogador}</h2>
            </div>
            <div class="flex flex-wrap justify-end py-2 px-3">
                <label for="nome" class="font-semibold w-full">Nome:</label>
                <input type="text" name="nome" id="nome" class="w-full rounded border-none px-2 py-1 ring-2 ring-slate-800 text-gray-700">

                <button onclick="ReceberJogador(${jogador})" class="text-right py-2 px-5 mt-2 rounded bg-slate-800">Salvar</button>
            </div>
        </div>
    `;

    //* Insere a estrutura modelo na div:
    div.innerHTML = janelaPrompt;

    //* Exibe os dados:
    document.body.appendChild(div);
}

//! Função que define o nome dos jogadores:
function ReceberJogador(numero){
    //* Pega o nome escrito:
    var nome = document.getElementById("nome").value;

    //* Remove a div da página:
    document.getElementById("prompt").remove();

    //* Verifica qual é o jogador:
    if(numero == 1){
        // Pega os elementos do jogador:
        divJogador = document.getElementById("jogador1");
        itemDeLista = divJogador.getElementsByClassName("nomeDoJogador")[0];
        paragrafoNome = itemDeLista.getElementsByTagName("p")[0];

        // Modifica o nome:
        paragrafoNome.innerText = nome;

        // Pede mais um nome:
        ExibirPrompt();
    }
    else{
        // Pega os elementos do jogador:
        divJogador = document.getElementById("jogador2");
        itemDeLista = divJogador.getElementsByClassName("nomeDoJogador")[0];
        paragrafoNome = itemDeLista.getElementsByTagName("p")[0];

        //Modifica o nome:
        paragrafoNome.innerText = nome;
    }
}

//! Função que sorteia o jogador que começa:
function SortearJogador(){
    //* Faz o sorteio de um número boolean:
    var numeroSorteado = Math.floor(Math.random() * 2);

    //* Define o primeiro jogador:
    if(numeroSorteado == 0){
        condicao = "jogadas % 2 == 0";
    }
    else{
        condicao = "!(jogadas % 2 == 0)";
    }
}

//! Função que coloca o elemento na região clicada:
function InserirJogada(elemento){
    //* Verifica se o elemento já possui uma jogada:
    if(elemento.innerHTML == ""){
        // Verifica se a jogada foi do primeiro jogador:
        if(eval(condicao)){
            // Adiciona o X no elemento
            elemento.innerHTML = `<ion-icon class="text-red-500 text-7xl" name="close-outline"></ion-icon>`;

            // Salva a posição da jogada:
            jogadasDoX.push(parseInt(elemento.id));
        }
        else{
            // Adiciona o O no elemento
            elemento.innerHTML = `<ion-icon class="text-blue-400 text-6xl" name="ellipse-outline"></ion-icon>`;

            // Salva a posição da jogada:
            jogadasDoO.push(parseInt(elemento.id));
        }

        // Incrementa um na quantidade de jogadas:
        jogadas++;

        // Chamada da função que verifica vitória:
        VerificarVitoria();

        // Atualiza a vez do jogador:
        AtualizarVezDoJogador();
    }
}

//! Função que verifica se alguém ganhou:
function VerificarVitoria(){
    //* Lista com todas os jogos favoráveis:
    var jogosFavoraveis = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ]

    //* Organiza a ordem das jogadas:
    jogadasDoX.sort();
    jogadasDoO.sort();

    //* Verifica se algum dos jogadores ganhou:
    for(var i = 0; i < jogosFavoraveis.length; i++){
        // Cria a variavel que verifica se pelo menos 3 elementos das jogadas de X são iguais a uma das jogadas favoráveis:
        var acertosX = 0;

        // Percorre as jogadas de X:
        for(var j = 0; j < jogadasDoX.length; j++){
            // Conta mais um nos acertos nessa jogada em específico:
            if(jogosFavoraveis[i].includes(jogadasDoX[j])){
                acertosX++;
            }
        }

        // Cria a variavel que verifica se pelo menos 3 elementos das jogadas de O são iguais a uma das jogadas favoráveis:
        var acertosO = 0;

        // Percorre as jogadas de X:
        for(var j = 0; j < jogadasDoO.length; j++){
            // Conta mais um nos acertos nessa jogada em específico:
            if(jogosFavoraveis[i].includes(jogadasDoO[j])){
                acertosO++;
            }
        }

        //Verifica se o jogador X ou O tiveram 3 acertos na jogada:
        if(acertosX == 3){
            ContarVitoria(1)
            
            // Salva que aconteceu uma vitória:
            var vitoria = true;
        }
        else if(acertosO == 3){
            ContarVitoria(2)

            // Salva que aconteceu uma vitória:
            var vitoria = true;
        }
    }
    
    //* Verifica se acontecey um empate:
    if(!vitoria){
        VerificarEmpate();
    }

}

//! Função que conta a vitória do jogador:
function ContarVitoria(jogador){
    //* Verifica qual jogador ganhou:
    if(jogador == 1){
        var divJogador = document.getElementById("jogador1");
    }
    else{
        var divJogador = document.getElementById("jogador2");
    }

    //* Pega o nome e os pontos do jogador vencedor:
    var nomeJogador = divJogador.getElementsByClassName("nomeDoJogador")[0].getElementsByTagName("p")[0];
    var pontosJogador = divJogador.getElementsByClassName("pontosDoJogador")[0].getElementsByTagName("p")[0];

    //* Aumenta 1 na pontuação:
    pontosJogador.innerText = parseInt(pontosJogador.innerText) + 1;

    //* Reproduz música de vitória:
    var musicaVitoria = new Audio("/assets/sounds/vitoria.mp3");
    musicaVitoria.volume = 0.1;
    musicaVitoria.play();

    //* Exibe os confetis:
    var imagem = document.createElement("img");
    imagem.src = "/assets/images/confetti.gif";
    imagem.id = "imagemTemporaria";
    imagem.classList.add("absolute", "bottom-1/2");
    document.body.appendChild(imagem);

    //* Faz a chamada da função que limpa o Jogos:
    LimparJogo();

    //* Remove a imagem após um determinado tempo:
    setInterval(function(){
        document.getElementById("imagemTemporaria").remove();
    }, 2750);
}

//! Função de verificar se ocorreu um empate:
function VerificarEmpate(){
    //* Junta as jogadas dos dois jogadores:
    var todasJogadas = [...jogadasDoX, ...jogadasDoO];

    //* Verifica se a quantidade de jogadas é igual a 9:
    if(todasJogadas.length == 9){
        // Toca música de empate:
        var musicaEmpate = new Audio("/assets/sounds/empate.mp3");
        musicaEmpate.volume = 0.1
        musicaEmpate.play();

        // Limpa o jogo:
        LimparJogo();
    }
}

//! Função que limpa o jogo:
function LimparJogo(){
    //* Limpa a quantida de jogadas:
    jogadas = 0;

    //* Limpa os dados das jogadas nos Arrays:
    jogadasDoX = [];
    jogadasDoO = [];

    //* Recebe um array dos blocos:
    var blocos = document.getElementsByClassName("bloco");
    var arrayBlocos = [...blocos];

    //* Limpa todos os blocos:
    arrayBlocos.forEach(function(bloco){
        bloco.innerHTML = "";
    });

    //* Sorteia um jogador:
    SortearJogador();
}

//! Função que deixa em foco o jogador da vez:
function AtualizarVezDoJogador(){
    //* Verifica se é o primeiro ou segundo jogador o da vez:
    if(eval(condicao)){
        // Pega o jogador da vez e o outro:
        var jogador = document.getElementById("jogador1");
        var jogadorFora = document.getElementById("jogador2");
    }
    else{
        // Pega o jogador da vez e o outro:
        var jogador = document.getElementById("jogador2");
        var jogadorFora = document.getElementById("jogador1");
    }

    //* Adiciona e remove a classe de destaque:
    jogador.classList.add("shadow-lg", "shadow-red-200");
    jogadorFora.classList.remove("shadow-lg", "shadow-red-200");
}

//! Sorteia um jogador e atualiza a vez:
SortearJogador();
AtualizarVezDoJogador();

//! Exibe os prompt do nome dos jogadores:
ExibirPrompt();