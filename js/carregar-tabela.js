/* ============================================================
   CARREGAR-TABELA.JS — BUGU BUGU FC
   Lê dados/classificacao.json, calcula os pontos de cada time
   e monta a tabela de classificação ordenada.

   Regra de pontuação do campeonato:
     Pts = (Vitórias × 3) + (Empates × 1) + (VitóriasPênaltis × 1)
   Toda partida tem disputa de pênaltis — independente do resultado
   no tempo normal — e o vencedor recebe +1 ponto.
   ============================================================ */

async function carregarTabela() {
  var base = obterBasePath();
  try {
    var resposta = await fetch(base + 'dados/classificacao.json');
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
    var dados = await resposta.json();

    // Adiciona o campo 'pontos' calculado a cada time
    var timesComPontos = dados.times.map(function (time) {
      return Object.assign({}, time, { pontos: calcularPontos(time) });
    });

    // Ordena por pontos (desc); em caso de empate, mais vitórias sobe
    timesComPontos.sort(function (a, b) {
      if (b.pontos !== a.pontos) return b.pontos - a.pontos;
      return b.vitorias - a.vitorias;
    });

    var elCorpo = document.getElementById('tabela-corpo');
    if (elCorpo) {
      elCorpo.innerHTML = timesComPontos.map(function (time, indice) {
        return montarLinhaDaTabela(time, indice + 1);
      }).join('');
    }

    // Atualiza o nome da liga no subtítulo
    var elLiga = document.getElementById('liga-nome');
    if (elLiga) elLiga.textContent = dados.liga;

  } catch (erro) {
    console.error('Erro ao carregar classificação:', erro);
    mostrarErro('tabela-corpo', 'Não foi possível carregar a tabela. Tente recarregar a página.');
  }
}

/**
 * Calcula os pontos de um time conforme a regra do campeonato.
 * Pts = (Vitórias × 3) + (Empates × 1) + (VitóriasPênaltis × 1)
 */
function calcularPontos(time) {
  return (time.vitorias * 3) + (time.empates * 1) + (time.vitoriasPenaltis * 1);
}

/* Monta o HTML de uma linha <tr> da tabela para um time. */
function montarLinhaDaTabela(time, posicao) {
  var ehNossoTime = time.nome.toUpperCase() === 'BUGU BUGU';
  var classeNos = ehNossoTime ? ' class="nos"' : '';

  return [
    '<tr' + classeNos + '>',
    '  <td class="posn">' + posicao + '</td>',
    '  <td class="clube">' + time.nome + '</td>',
    '  <td>' + time.vitorias + '</td>',
    '  <td>' + time.empates + '</td>',
    '  <td>' + time.derrotas + '</td>',
    '  <td>' + time.vitoriasPenaltis + '</td>',
    '  <td class="pts">' + time.pontos + '</td>',
    '</tr>'
  ].join('\n');
}

carregarTabela();
