let escolha = 10, baralho = [1, 2, 3, 4, 5, 6, 7], posicao = [], par = 0, 
selecionado, select, rodada = 0, jogada = 0, centesimos=0, centesimosid, tempofinal;
const crono= document.querySelector(".cronometro");
const tempo = 1000;
const tempinho = 100;
const tabuleiro = document.querySelector('.tabuleiro');

setTimeout(iniciarJogo, tempinho);

function iniciarJogo() {
    par = 0; rodada = 0; posicao = []; jogada = 0; centesimos=0;
    do {
        if ((escolha > 14 || escolha < 4 || escolha % 2 !== 0) || (escolha > 14 || escolha < 4 && escolha % 2 !== 0)) {
            alert("Valor inválido, tente novamente!");
        }
        escolha = prompt("Escolha o número de cartas (somente quantidade par de 4 à 14):");
    } while ((escolha > 14 || escolha < 4 || escolha % 2 !== 0) || (escolha > 14 || escolha < 4 && escolha % 2 !== 0));
    cartear();
    intervalo();
}
function cartear() {
    let cont2 = 0;
    const tamanho = escolha;
    baralho.sort(comparador);
    tabuleiro.style.width = `${largura()}px`;
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
            rodada = 0;
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
                setTimeout(mantercarta, tempo);
                jogada++;
                par++;
                setTimeout(fimdejogo, tempinho);
            } else {
                setTimeout(removercarta, tempo);
                jogada++;
            }
        } else if (rodada == 2 && this === select[0]) {
            setTimeout(rodada=1, tempo);
        }
    }
    console.log('jogada:', jogada, '\nrodada:', rodada, '\nPar:', par);
}
function mantercarta() {
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
}
function removercarta() {
    for (let cont = 0; cont < selecionado.length; cont++) {
        selecionado[cont].classList.remove("selecionado");
    }
    for (let cont = 0; cont < select.length; cont++) {
        select[cont].classList.remove("select");
    }
    if (rodada == 2) {
        rodada = 0;
    }
}
function fimdejogo() {
    
    const acabou = escolha / 2;
    const jogadas = jogada * 2;
    if (par == acabou) {
        clearInterval(centesimosid);
        alert(`Você ganhou em ${jogadas} jogadas no tempo de ${tempofinal}!`);
        let certo = 0;
        do {
            const final = prompt("Você gostaria de reiniciar a partida? (sim/não)");
            if (final === 'não') {
                certo++;
                return 0;
            }
            else if (final === 'sim') {
                deletartabuleiro();
                iniciarJogo();
                certo++;
            }
            else {
                alert("Resposta inválida: tente novamente!");
            }
        } while (certo == 0);
    }
}
function largura() {
    const cartasfileira = escolha / 2;
    const gap = 34;
    const quantidadegap = cartasfileira - 1;
    const largcarta = 117;
    const larg = cartasfileira * largcarta + gap * quantidadegap;
    return larg;
}
function deletartabuleiro() {
    while (tabuleiro.firstChild) {
        tabuleiro.removeChild(tabuleiro.firstChild);
    }
}
function cronometro() {
    centesimos++;
    let minutos = parseInt(centesimos/6000);
    let segundos = parseInt((centesimos%6000)/100);
    let cents = ((centesimos%6000)%100)%100;
    if (minutos<10){minutos='0'+minutos;}
    if (segundos<10){segundos='0'+segundos;}
    if (cents<10){cents='0'+cents;}
    crono.innerHTML = `${minutos}:${segundos}:${cents}`;
    tempofinal = `${minutos}min e ${segundos},${cents}s`;
}
function intervalo() {
    const centesimo = 10;
    centesimosid = setInterval(cronometro, centesimo);
}
