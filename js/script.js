// Mostra os números e operadores clicados pelo usuário na tela
function display(valor){
    document.getElementById('resultado').value += valor;
    return valor;
}

// Calcula a expressão inserida pelo usuário e retorna o valor para a tela
function solucao(){
    let historicoRecuperado = recuperaHistorico();

    let expressao = document.getElementById('resultado').value;
    let resultado = eval(expressao);
    document.getElementById('resultado').value = resultado;
    
    let objetoResultado = {
        expressao: expressao,
        solucao: resultado};
    salvarHistorico(objetoResultado);

    return resultado;
}

// Limpa a tela 
function limparTela(){
    document.getElementById('resultado').value = '';
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