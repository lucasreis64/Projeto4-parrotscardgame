let escolha = 10,
    baralho = [1, 2, 3, 4, 5, 6, 7],
    posicao = [],
    final = false,
    par = 0,
    selecionado,
    select,
    rodada = 0;
const tempo = 800;
const superior = document.querySelector('.fileirasuperior');
const inferior = document.querySelector('.fileirainferior');

iniciarJogo();
cartear();


function iniciarJogo() {
    do {
        if ((escolha > 14 || escolha < 4 || escolha % 2 !== 0) || (escolha > 14 || escolha < 4 && escolha % 2 !== 0)) {
            alert("Valor inválido, tente novamente!");
        }
        escolha = prompt("Escolha o número de cartas (somente quantidade par de 4 à 14):");
    } while ((escolha > 14 || escolha < 4 || escolha % 2 !== 0) || (escolha > 14 || escolha < 4 && escolha % 2 !== 0)) console.log('17')
}

function cartear() {
    let cont2 = 0;
    const tamanho = escolha;
    baralho.sort(comparador);
    for (let cont = 0; cont < tamanho; cont += 2) {
        posicao[cont] = criarcarta(baralho[cont2]);
        posicao[cont + 1] = criarcarta(baralho[cont2]);
        cont2++;
    }

    posicao.sort(comparador);
    for (let cont = 0; cont < tamanho; cont++) {
        if (cont < tamanho / 2) {
            posicao[cont] = superior.appendChild(posicao[cont]);
        }
        if (cont >= tamanho / 2) {
            posicao[cont] = inferior.appendChild(posicao[cont]);
        }
    }
    return posicao;
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
        console.log(rodada);
        rodada++;
        const costas = this.querySelector('.costas');
        const frente = this.querySelector('.frente');
        this.classList.add("select");
        costas.classList.add("selecionado");
        frente.classList.add("selecionado");
        selecionado = document.querySelectorAll(".selecionado");
        select = document.querySelectorAll(".select");
        console.log(selecionado.length, select.length);
        if (select.length % 2 === 0) {
            if (select[0].id === select[1].id) {
                setTimeout(function () {
                    for (let cont = 0; cont < selecionado.length; cont++) {
                        selecionado[cont].classList.remove("selecionado");
                        selecionado[cont].classList.add("iguais");
                    }
                    for (let cont = 0; cont < select.length; cont++) {
                        select[cont].classList.remove("select");
                    }
                    par++;
                    if (rodada == 2) {
                        rodada = 0;
                    }
                }, tempo)

            } else {
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
            }
        }
    }

}