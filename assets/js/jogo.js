//! Conta a quantidade de jogadas:
var jogadas = 0;

//! Arrays que salvam as posições dos cliques:
var jogadasDoX = [];
var jogadasDoO = [];


//! Variavel que guarda a condição da vez:
var condicao;

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

    //* Faz a chamada da função que limpa o Jogos:
    LimparJogo();
}

//! Função de verificar se ocorreu um empate:
function VerificarEmpate(){
    //* Junta as jogadas dos dois jogadores:
    var todasJogadas = [...jogadasDoX, ...jogadasDoO];

    //* Verifica se a quantidade de jogadas é igual a 9:
    if(todasJogadas.length == 9){
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