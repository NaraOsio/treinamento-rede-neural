let treinamentoArray = [
    { entradas: [1,1,1,1,1], saidaEsperada: 1 },
    { entradas: [1,0,1,1,0], saidaEsperada: 1 },
    { entradas: [0,1,1,0,0], saidaEsperada: 0 },
    { entradas: [0,0,0,0,0], saidaEsperada: 0 },
];

let pesos = [-1,-1,-1,-1,-1];

let ajustes;
let somaTotal;
let saida;
let quantidadeAjustes = 0;
let quantidadeRepeticoes = 0;

do {
    ajustes = 0;

    for (let i = 0; i < treinamentoArray.length; i++) {
        let dado = treinamentoArray[i];

        somaTotal = soma(dado.entradas);
        saida = limiteRapido(somaTotal); 
        if (saida != dado.saidaEsperada) {
            ajustarPesos(dado.entradas, dado.saidaEsperada, saida);
            ajustes++;
            quantidadeAjustes++;
        }
    }

    quantidadeRepeticoes++;

} while (ajustes != 0);

function soma(entradas) {
    let total = 0;

    for (let i = 0; i < entradas.length; i++) {
        total += entradas[i] * pesos[i];
    }

    return total;
}


function limiteRapido(valor) {
    if (valor <= 0) {
        return 0;
    } else {
        return 1;
    }
}

function rampa(valor) {
    if (valor < 0) {
        return 0;
    }
    if (valor <= 1) {
        return valor;
    }
    return 1;
}
function sigmoide(valor) {
    return valor / (1 + Math.abs(valor));
}
function ajustarPesos(entradas, desejado, obtido) {
    for (let i = 0; i < entradas.length; i++) {
        pesos[i] = pesos[i] + (desejado - obtido) * entradas[i];
    }
}

console.log("Pesos finais:");
for (let i = 0; i < pesos.length; i++) {
    console.log(pesos[i]);
}

console.log("\nTestando funções com a primeira entrada:");

let teste = soma(treinamentoArray[0].entradas);

console.log("Soma:", teste);
console.log("Limite rápido:", limiteRapido(teste));
console.log("Rampa:", rampa(teste));
console.log("Sigmoide:", sigmoide(teste));

console.log("\nQuantidade de ajustes:", quantidadeAjustes);
console.log("Quantidade de repetições:", quantidadeRepeticoes);