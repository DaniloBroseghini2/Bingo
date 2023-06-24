function desenharCartela() {
    const cartela = gerarCartela();

    // Selecionar onde criar o elemento
    const pai_div_cartela = document.getElementById('body_cartelas');

    // Criar uma div para a cartela
    const div_cartela = document.createElement('div');
    div_cartela.className = 'cartela';

    // Criar um elemento de texto para o nome do jogador
    const input_jogador = document.createElement('input');
    input_jogador.type = 'text';
    input_jogador.placeholder = 'Nome do jogador';

    // Adicionar um evento para capturar o nome do jogador
    input_jogador.addEventListener('change', function () {
        // Verificar se o campo do nome do jogador não está vazio
        if (input_jogador.value.trim() !== '') {
            const nome_jogador = input_jogador.value.trim();

            // Remover o input do nome do jogador e adicionar o nome como texto
            div_cartela.removeChild(input_jogador);
            const nome_jogador_texto = document.createElement('p');
            nome_jogador_texto.innerText = nome_jogador;
            div_cartela.appendChild(nome_jogador_texto);

            // Criar a tabela do bingo
            const tabela = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            // Criar os elementos do thead
            const thB = document.createElement('th');
            const thI = document.createElement('th');
            const thN = document.createElement('th');
            const thG = document.createElement('th');
            const thO = document.createElement('th');

            thB.innerText = 'B';
            thI.innerText = 'I';
            thN.innerText = 'N';
            thG.innerText = 'G';
            thO.innerText = 'O';

            // Inserir os ths no thead
            thead.appendChild(thB);
            thead.appendChild(thI);
            thead.appendChild(thN);
            thead.appendChild(thG);
            thead.appendChild(thO);

            // Criar as células da tabela
            let count = 0;
            for (let i = 0; i < 5; i++) {
                const tr = document.createElement('tr');
                for (let j = 0; j < 5; j++) {
                    const td = document.createElement('td');
                    td.innerText = cartela[count];
                    tr.appendChild(td);
                    count++;
                }
                tbody.appendChild(tr);
            }

            // Inserir o thead e o tbody na tabela
            tabela.appendChild(thead);
            tabela.appendChild(tbody);

            // Inserir a tabela na div da cartela
            div_cartela.appendChild(tabela);
        }
    });

    // Adicionar o input do nome do jogador à div da cartela
    div_cartela.appendChild(input_jogador);

    // Inserir a div no elemento pai
    pai_div_cartela.appendChild(div_cartela);
}


//Gerar números da cartela
function gerarCartela() {
    const cartela = [];

    while (cartela.length < 25) {
        const aleatorio = Math.floor(Math.random() * 75 + 1);
        if (!cartela.includes(aleatorio)) {
            cartela.push(aleatorio);
        }
    }

    console.log(cartela);
    return cartela;
}


// Função Reniciar
function limparCartelas() {
    const pai_div_cartela = document.getElementById('body_cartelas');
    while (pai_div_cartela.firstChild) {
        pai_div_cartela.removeChild(pai_div_cartela.firstChild);
    }

    // Reiniciar o contador
    const divNumeros = document.getElementById('body_numeros');
    divNumeros.innerHTML = '';

    // Limpar o intervalo de tempo
    clearInterval(intervalId);
}

// Função Jogar 

function jogar() {
    // Gerar números sorteados
    const numerosSorteados = [];
    while (numerosSorteados.length < 75) {
        const numero = Math.floor(Math.random() * 75 + 1);
        if (!numerosSorteados.includes(numero)) {
            numerosSorteados.push(numero);
        }
    }

    // Selecionar a div onde os números serão exibidos
    const divNumeros = document.getElementById('body_numeros');

    // Limpar o conteúdo anterior
    divNumeros.innerHTML = '';

    // Exibir os números sorteados gradualmente
    for (let i = 0; i < numerosSorteados.length; i++) {
        const numeroSorteado = numerosSorteados[i];
        setTimeout(function () {
            const numeroElemento = document.createElement('span');
            numeroElemento.textContent = numeroSorteado;
            divNumeros.appendChild(numeroElemento);

            // Selecionar todas as cartelas
            const cartelas = document.getElementsByClassName('cartela');

            // Iterar sobre as cartelas
            let cartelaCompleta = false;
            let cartelaVencedora = null; // Variável para armazenar a tabela vencedora
            let nomeJogadorVencedor = ''; // Variável para armazenar o nome do jogador vencedor
            for (let j = 0; j < cartelas.length; j++) {
                const cartela = cartelas[j];
                const tabela = cartela.querySelector('table');
                const celulas = tabela.getElementsByTagName('td');

                // Marcar as células correspondentes ao número sorteado
                for (let k = 0; k < celulas.length; k++) {
                    const celula = celulas[k];
                    const numeroCartela = parseInt(celula.innerText, 10);

                    // Verificar se o número sorteado está presente na cartela
                    if (numeroCartela === numeroSorteado) {
                        celula.style.backgroundColor = 'yellow';
                    }

                    // Verificar se a tabela está completa
                    const todasMarcadas = Array.from(celulas).every(function (celula) {
                        return celula.style.backgroundColor === 'yellow';
                    });

                    if (todasMarcadas) {
                        cartelaCompleta = true;
                        cartelaVencedora = cartela;
                        nomeJogadorVencedor = cartela.querySelector('p').innerText;
                        break;
                    }
                }

                if (cartelaCompleta) {
                    break;
                }
            }

            // Se uma tabela estiver completa, anunciar a tabela vencedora e parar de marcar as outras cartelas
            if (cartelaCompleta) {
                alert(`Bingo! A cartela do jogador ${nomeJogadorVencedor} está completa!`);
                for (let j = 0; j < cartelas.length; j++) {
                    if (cartelas[j] !== cartelaVencedora) {
                        const tabela = cartelas[j].querySelector('table');
                        const celulas = tabela.getElementsByTagName('td');
                        for (let k = 0; k < celulas.length; k++) {
                            celulas[k].style.backgroundColor = 'transparent';
                        }
                    }
                }
                return; // Parar a execução do jogo
            }
        }, i * 100); // Intervalo de exibição dos números (1 segundo)
    }
}

