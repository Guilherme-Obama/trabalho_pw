document.getElementById("resultado").focus(); // Retorna o usuário para o campo de input
const campoInput = document.getElementById("resultado"); // Constante de validação do input
const regex = /^([-+]?\d*\.?\d+)(?:\s*([-+*\/])\s*([-+]?\d*\.?\d+))*$/ // Expressão regex para validação do input

// Evento para quando o usuário pressionar tecla Enter, Esc e "c"
campoInput.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        solucao();
    } else if (event.key === "Escape" || event.key === "c") {
        limparTela();
    }
})

// Filtra o input para operadores e números válidos
function filtroInput(event){
    const validacaoValor = event.target.value;
    const valorFiltrado = validacaoValor.replace(/[^-+*/\d.]/g, ''); // Substitui inputs inválidos por vazio 
    event.target.value = valorFiltrado;
}

campoInput.addEventListener('input', filtroInput); // Executa o filtro de input

// Mostra os números e operadores clicados pelo usuário na tela da calculadora
function display(valor){
    document.getElementById("resultado").value += valor;
    document.getElementById("resultado").focus();
    return valor;
}

// Calcula a expressão inserida pelo usuário e retorna o valor para a tela
function solucao(){
    let historicoRecuperado = recuperaHistorico();
  
    let expressao = document.getElementById("resultado").value;
    try {
        let resultado = eval(expressao);
        if (resultado == Infinity) {
            alert("Erro! Divisão por zero!");
            document.getElementById("resultado").value = '';
            return;
        }
        document.getElementById("resultado").value = resultado.toFixed(2);
        
        let objetoResultado = {
            expressao: expressao,
            solucao: resultado.toFixed(2)};
        salvarHistorico(objetoResultado);
        
    } catch (error) {
        document.getElementById("resultado").value = '';
        alert("Expressão: " + expressao + " inválida!")
    }
    
    document.getElementById("resultado").focus();
    return resultado;
}

// Limpa a tela 
function limparTela(){
    document.getElementById("resultado").value = '';
    document.getElementById("resultado").focus();
}

// Recupera o resultado da solucao()
function recuperaHistorico() {
    let historico = localStorage.getItem("historico");

    if(!historico) {
        return [];
    }

    let historicoObjeto = JSON.parse(historico);

    return historicoObjeto;
}

// Salva o resultado como histórico
function salvarHistorico(resultado) {
    let historico = recuperaHistorico(); // histórico é um array de obj
    
    historico.push(resultado);
    historico = JSON.stringify(historico);
    localStorage.setItem("historico", historico);

    }