let possiveisRespostas = [
    "Xuxa",
    "Michael Jackson",
    "Neymar",
    "Wagner Moura"
];

let arrayPerguntas = [
    {
        "id": "index",
        "pergunta": "A pessoa que você pensou é mulher?",
        "sim": {"resposta": "Xuxa"},
        "nao": {"redireciona": "isSinger"}
    },
    {
        "id": "isSinger",
        "pergunta": "A pessoa que você pensou é um cantor?",
        "sim": {"resposta": "Michael Jackson"},
        "nao": {"redireciona": "isSoccerPlayer"}
    },
    {
        "id": "isSoccerPlayer",
        "pergunta": "A pessoa que você pensou é um jogador de futebol?",
        "sim": {"resposta": "Neymar"},
        "nao": {"resposta": "Wagner Moura"}
    }
];


async function lerEntrada(mensagem) {
    process.stdout.write(mensagem);
    let buffer = "";
    const stdin = process.stdin;
    stdin.resume();
    stdin.setEncoding('utf8');
    
    return new Promise((resolve) => {
        stdin.on('data', function(data) {
            buffer += data;
            stdin.pause();
            resolve(buffer.trim());
        });
    });
}
let descobriuAResposta = false;
let indicePergunta = "index";

while (descobriuAResposta == false) {
    for (const pergunta of arrayPerguntas) {
        if (pergunta.id == indicePergunta) {
            console.log("Digite 1 = sim, 2 = não");
            let resposta = await lerEntrada(pergunta.pergunta);

            if (resposta == 1 || resposta == "1") {
                //sim
                if ("resposta" in pergunta.sim) {
                    console.log("A resposta é: " + pergunta.sim.resposta);
                    descobriuAResposta = true;
                }
                indicePergunta = pergunta.sim.redireciona;
            } else {
                //não
                if ("resposta" in pergunta.nao) {
                    console.log("A resposta é: " + pergunta.nao.resposta);
                    descobriuAResposta = true;
                }
                indicePergunta = pergunta.nao.redireciona;
            }
        }
    }
}

console.log("Pense em uma pessoa desta lista e eu irei descobrir em quem voce pensou!");
console.log(possiveisRespostas);