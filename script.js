const resultado = document.getElementById('resultado');
const botoes = document.querySelectorAll('button');

let expressao = '';

botoes.forEach(botao => {
    botao.onclick = function () {
        const valor = botao.innerText;

        if (valor === 'C') {
            expressao = '';
            resultado.innerText = '0';
        }

        else if (valor === '⌫') {
            expressao = expressao.slice(0, -1);
            resultado.innerText = expressao || '0';
        }

        else if (valor === '=') {
            try {
                let conta = expressao
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/−/g, '-')
                    .replace(/,/g, '.');

                // porcentagem igual calculadora real
                conta = conta.replace(/(\d+(?:\.\d+)?)([+\-])(\d+(?:\.\d+)?)%/g,
                    (match, a, op, b) => {
                        const percentual = (parseFloat(a) * parseFloat(b)) / 100;
                        return `${a}${op}${percentual}`;
                    }
                );

                conta = conta.replace(/(\d+(?:\.\d+)?)%/g,
                    (match, n) => parseFloat(n) / 100
                );

                expressao = eval(conta).toString().replace('.', ',');
                resultado.innerText = expressao;

            } catch {
                resultado.innerText = 'Erro';
                expressao = '';
            }
        }

        else {
            expressao += valor;
            resultado.innerText = expressao;
        }
    };
});