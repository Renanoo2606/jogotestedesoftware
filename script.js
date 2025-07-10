const todosModulos = [
  { nome: "Função de cálculo de média", resposta: "unitário", dica: "Você está testando uma função pequena e isolada." },
  { nome: "Conexão com banco de dados", resposta: "integração", dica: "Precisa verificar a comunicação entre componentes." },
  { nome: "Fluxo completo do sistema", resposta: "sistema", dica: "Tudo está conectado e funcionando junto." },
  { nome: "Interface de login para o usuário", resposta: "aceitação", dica: "Você quer saber se o usuário consegue usar corretamente." },
  { nome: "Verificação de e-mail", resposta: "unitário", dica: "É uma função bem específica." },
  { nome: "Integração entre API e frontend", resposta: "integração", dica: "Você está unindo partes distintas do sistema." },
  { nome: "Teste da jornada do usuário", resposta: "aceitação", dica: "Envolve o comportamento do usuário real." },
  { nome: "Verificação de CPF", resposta: "unitário", dica: "É uma pequena regra de negócio." },
  { nome: "Envio de email após cadastro", resposta: "integração", dica: "Testa um processo encadeado entre sistemas." },
  { nome: "Relatório final do sistema", resposta: "sistema", dica: "É o resultado de vários módulos trabalhando juntos." }
];

let modulosSelecionados = [];
let indice = 0;
let pontuacao = 0;
let cronometro;
let tempoRestante = 10;
let dicaFoiUsada = false;
let acertosSeguidos = 0;

function embaralhar(lista) {
  return lista.sort(() => Math.random() - 0.5);
}

function iniciarJogo(dificuldade) {
  document.getElementById("selecao-dificuldade").style.display = "none";
  document.getElementById("jogo").style.display = "block";

  let totalPerguntas = {
    fácil: 4,
    médio: 6,
    difícil: 8
  }[dificuldade];

  modulosSelecionados = embaralhar(todosModulos).slice(0, totalPerguntas);
  indice = 0;
  pontuacao = 0;
  acertosSeguidos = 0;
  document.getElementById("pontuacao").textContent = pontuacao;
  document.getElementById("barra-progresso").style.width = `0%`;

  carregarModulo();
}

function carregarModulo() {
  clearInterval(cronometro);
  dicaFoiUsada = false;
  document.getElementById("dica").textContent = "";

  if (indice < modulosSelecionados.length) {
    document.getElementById("texto-modulo").textContent =
      "Módulo: " + modulosSelecionados[indice].nome;
    document.getElementById("retorno").textContent = "";
    tempoRestante = 10;
    document.getElementById("cronometro").textContent = tempoRestante;
    cronometro = setInterval(contagemRegressiva, 1000);
  } else {
    clearInterval(cronometro);
    document.getElementById("opcoes").style.display = "none";
    document.getElementById("area-dica").style.display = "none";

    const pontuacaoMaxima = modulosSelecionados.length * 10;
    const mediaMinima = Math.ceil(pontuacaoMaxima * 0.7);

    if (pontuacao >= mediaMinima) {
      document.getElementById("texto-modulo").textContent = "Parabéns! Você venceu!";
      document.getElementById("retorno").textContent = `Cobertura total atingida com ${pontuacao} pontos de ${pontuacaoMaxima}!`;
      document.getElementById("retorno").style.color = "green";
    } else {
      document.getElementById("texto-modulo").textContent = "Você não passou.";
      document.getElementById("retorno").textContent = `Pontuação final: ${pontuacao} de ${pontuacaoMaxima}. Tente novamente!`;
      document.getElementById("retorno").style.color = "red";
    }
  }
}

function contagemRegressiva() {
  tempoRestante--;
  document.getElementById("cronometro").textContent = tempoRestante;
  if (tempoRestante <= 0) {
    clearInterval(cronometro);
    document.getElementById("retorno").textContent = "Tempo esgotado!";
    document.getElementById("retorno").style.color = "red";
    acertosSeguidos = 0;
    indice++;
    setTimeout(carregarModulo, 1000);
  }
}

function selecionarTeste(respostaUsuario) {
  clearInterval(cronometro);
  const respostaCorreta = modulosSelecionados[indice].resposta;
  const retorno = document.getElementById("retorno");

  if (respostaUsuario === respostaCorreta) {
    let pontos = dicaFoiUsada ? 5 : 10;
    acertosSeguidos++;

    if (acertosSeguidos > 0 && acertosSeguidos % 3 === 0) {
      pontos += 10;
      retorno.innerHTML = "Correto! Bônus por 3 acertos seguidos!";
    } else {
      retorno.textContent = "Correto!";
    }

    pontuacao += pontos;
    retorno.style.color = "green";
  } else {
    retorno.textContent = `Errado! Resposta correta: ${respostaCorreta}`;
    retorno.style.color = "red";
    acertosSeguidos = 0;
  }

  document.getElementById("pontuacao").textContent = pontuacao;
  document.getElementById("barra-progresso").style.width = `${(pontuacao / (modulosSelecionados.length * 10)) * 100}%`;

  indice++;
  setTimeout(carregarModulo, 1000);
}

function mostrarDica() {
  dicaFoiUsada = true;
  const dica = modulosSelecionados[indice].dica;
  document.getElementById("dica").textContent = "Dica: " + dica;
}

function reiniciarJogo() {
  clearInterval(cronometro);
  document.getElementById("selecao-dificuldade").style.display = "block";
  document.getElementById("jogo").style.display = "none";
  document.getElementById("opcoes").style.display = "block";
  document.getElementById("area-dica").style.display = "block";
  document.getElementById("dica").textContent = "";
}
