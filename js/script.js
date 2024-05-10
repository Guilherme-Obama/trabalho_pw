const campoInput = document.getElementById("resultado"); // Seleciona o campo de input da calculadora

const regex = /^([-+]?\d*\.?\d+)(?:\s*([-+*\/])\s*([-+]?\d*\.?\d+))*$/ // Expressão regular para validar o input

// Retorna o foco para o campo de input quando o usuário clicar em qualquer lugar da página
document.body.addEventListener('click', function () {
    document.getElementById("resultado").focus();
})

// Evento para lidar com ações do teclado: Enter, Esc e "c"
campoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") { // Se a tecla pressionada for Enter, executa a função solucao()
        solucao();
    } else if (event.key === "Escape" || event.key === "c") { // Se a tecla pressionada for Esc ou "c", limpa o campo de input
        limparTela();
    }
})

// Filtra o input para permitir apenas operadores e números válidos
function filtroInput(event) {
    const validacaoValor = event.target.value;
    const valorFiltrado = validacaoValor.replace(/[^-+*/\d.]/g, ''); // Remove caracteres inválidos
    event.target.value = valorFiltrado;
}

campoInput.addEventListener('input', filtroInput); // Executa o filtro de input quando o valor do input muda

// Função para exibir números e operadores clicados pelo usuário na tela da calculadora
function display(valor) {
    document.getElementById("resultado").value += valor;
    return valor;
}

// Função para calcular a expressão inserida pelo usuário e exibir o resultado na tela
function solucao() {
    let historicoRecuperado = recuperaHistorico(); // Recupera o histórico de cálculos

    let expressao = document.getElementById("resultado").value;
    try {
        let resultado = eval(expressao); // Avalia a expressão
        if (resultado == Infinity) {
            alert("Erro! Divisão por zero!");
            document.getElementById("resultado").value = ''; // Limpa o campo de input em caso de erro
            return;
        }
        
        if (Number.isInteger(resultado)) { // Check if the result is an integer
            document.getElementById("resultado").value = resultado; // Display the integer value
        } else {
            document.getElementById("resultado").value = resultado.toFixed(2); // Display the result with two decimal places
        }

        let objetoResultado = { // Cria um objeto com a expressão e a solução
            expressao: expressao,
            solucao: resultado.toFixed(2)
        };
        salvarHistorico(objetoResultado); // Salva o resultado no histórico

    } catch (error) { // Trata erros na expressão
        document.getElementById("resultado").value = ''; // Limpa o campo de input
        alert("Expressão: " + expressao + " inválida!") // Exibe mensagem de erro
    }

    document.getElementById("resultado").focus(); // Retorna o foco para o campo de input
    return resultado;
}

// Limpa o campo de input
function limparTela() {
    document.getElementById("resultado").value = '';
}

// Recupera o histórico de cálculos do armazenamento local
function recuperaHistorico() {
    let historico = localStorage.getItem("historico");

    if (!historico) { // Se não houver histórico, retorna um array vazio
        return [];
    }

    let historicoObjeto = JSON.parse(historico); // Converte o histórico de JSON para objeto JavaScript

    return historicoObjeto;
}

// Salva o resultado como histórico
function salvarHistorico(resultado) {
    let historico = recuperaHistorico(); // Recupera o histórico de cálculos

    historico.push(resultado); // Adiciona o resultado ao histórico
    historico = JSON.stringify(historico); // Converte o histórico para JSON
    localStorage.setItem("historico", historico); // Armazena o histórico no armazenamento local

    // Após salvar, exibe o histórico atualizado
    displayHistorico();
}

// Função para limpar o histórico de cálculos
function clearHistorico() {
    // Remove os dados do armazenamento local
    localStorage.removeItem("historico");

    // Atualiza a exibição do histórico
    displayHistorico();
}

// Função para exibir o histórico de cálculos na tela
function displayHistorico() {
    const historicoDiv = document.getElementById("historico"); // Seleciona o elemento div onde o histórico será exibido

    historicoDiv.innerHTML = ''; // Limpa o conteúdo anterior da div

    // Cria o botão para limpar o histórico
    const clearButton = document.createElement("button");
    clearButton.innerText = "Limpar Histórico";
    clearButton.addEventListener("click", clearHistorico);

    // Recupera o histórico de cálculos do armazenamento local
    let historico = recuperaHistorico();

    // Verifica se há cálculos no histórico
    if (historico.length === 0) {
        historicoDiv.innerText = "Nenhum histórico de cálculo disponível.";
        return;
    }

    // Loop para exibir cada cálculo no histórico
    historico.forEach(function(item, index) {
        let expressao = item.expressao;
        let solucao = item.solucao;

        // Cria um novo elemento de parágrafo para exibir o cálculo no histórico
        let paragraph = document.createElement("p");
        paragraph.innerText = "Expressão: " + expressao + " | Solução: " + solucao;

        // Adiciona o elemento de parágrafo à div do histórico
        historicoDiv.appendChild(paragraph);
    });

    // Adiciona o botão de limpar histórico à div do histórico
    historicoDiv.appendChild(clearButton);
}
