function display(valor){
    document.getElementById('resultado').value += valor;
    return valor
}

function solve(){
    let x = document.getElementById('result').value
    let y = eval(x);
    document.getElementById('result').value = y
    return y
}

function clearScreen(){

    document.getElementById('result').value = ''

}