let escolha = 10,
    baralho = [1, 2, 3, 4, 5, 6, 7],
    posicao = [],
    final = false,
    par = 0,
    selecionado,
    select,
    rodada = 0,
    jogada = 0;
const tempo = 1000;
const tabuleiro = document.querySelector('.tabuleiro');

iniciarJogo();
cartear();


function iniciarJogo() {
    do {
        if ((escolha > 14 || escolha < 4 || escolha % 2 !== 0) || (escolha > 14 || escolha < 4 && escolha % 2 !== 0)) {
            alert("Valor inválido, tente novamente!");
        }
        escolha = prompt("Escolha o número de cartas (somente quantidade par de 4 à 14):");
    } while ((escolha > 14 || escolha < 4 || escolha % 2 !== 0) || (escolha > 14 || escolha < 4 && escolha % 2 !== 0));
}

function cartear() {
    let cont2 = 0;
    const tamanho = escolha;
    baralho.sort(comparador);
    tabuleiro.style.width=`${largura()}px`;
    for (let cont = 0; cont < tamanho; cont += 2) {
        posicao[cont] = criarcarta(baralho[cont2]);
        posicao[cont + 1] = criarcarta(baralho[cont2]);
        cont2++;
    }

    posicao.sort(comparador);
    for (let cont = 0; cont < tamanho; cont++) {
            posicao[cont] = tabuleiro.appendChild(posicao[cont]);
    }   
}

function criarcarta(num) {
    const frente = document.createElement("div");
    const costas = document.createElement("div");
    const carta = document.createElement("div");

    frente.classList.add("frente", "conteudocarta");
    img = document.createElement("img");
    img.src = "./imagens/front.png";
    frente.appendChild(img);

    costas.classList.add("costas", "conteudocarta");
    img = document.createElement("img");
    img.src = `./imagens/costas${num}.gif`;
    costas.appendChild(img);

    carta.classList.add("carta");
    carta.appendChild(frente);
    carta.appendChild(costas);
    carta.id = num;
    carta.addEventListener("click", selecionarcarta);
    return carta;
}

function comparador() {
    return Math.random() - 0.5;
}

function selecionarcarta() {
    if (rodada < 2) {
        rodada++;
        const costas = this.querySelector('.costas');
        const frente = this.querySelector('.frente');
        
        if (this.classList.contains("iguais")) {
            console.log(this)
            rodada=0;
            return;
        } else {
            this.classList.add("select");
            costas.classList.add("selecionado");
            frente.classList.add("selecionado");
        }
        selecionado = document.querySelectorAll(".selecionado");
        select = document.querySelectorAll(".select");

        if (select.length % 2 == 0) {
            if (select[0].id === select[1].id) {
                mantercarta();
            } else {
                removercarta();
            }
        }
    }

    console.log('jogada:', jogada, '\nrodada:', rodada, '\nPar:', par)
}

function mantercarta() {
    setTimeout(function () {
        for (let cont = 0; cont < selecionado.length; cont++) {
            selecionado[cont].classList.remove("selecionado");
            selecionado[cont].classList.add("iguais");
        }
        for (let cont = 0; cont < select.length; cont++) {
            select[cont].classList.remove("select");
            select[cont].classList.add("iguais");
        }
        if (rodada == 2) {
            rodada = 0;
        }
    }, tempo);
    jogada++;
    par++;
    fimdejogo();
}

function removercarta() {
    setTimeout(function () {
        for (let cont = 0; cont < selecionado.length; cont++) {
            selecionado[cont].classList.remove("selecionado");
        }
        for (let cont = 0; cont < select.length; cont++) {
            select[cont].classList.remove("select");
        }
        if (rodada == 2) {
            rodada = 0;
        }
    }, tempo);
    jogada++;
}

function fimdejogo() {
    const tempinho = tempo / 6;
    setTimeout(function () {
        const acabou = escolha / 2;
        const jogadas = jogada * 2;
        if (par == acabou) {
            alert(`Você ganhou em ${jogadas} jogadas!`);
        }
    }, tempinho);
}

function largura(){
    const cartasfileira = escolha/2;
    const gap = 34;
    const quantidadegap = cartasfileira-1;
    const largcarta = 117;
    const larg = cartasfileira*largcarta+gap*quantidadegap;
    return larg;
}