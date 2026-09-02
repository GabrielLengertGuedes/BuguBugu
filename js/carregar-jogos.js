/* ============================================================
   CARREGAR-JOGOS.JS — BUGU BUGU FC
   Lê dados/jogos.json e monta:
     - Seção "Últimos jogos" (status: realizado) na página de futebol
     - Seção "Próximos jogos" (status: futuro / descanso) na página de futebol
     - Faixa do próximo jogo na Home (elemento #proximo-jogo-home)
   ============================================================ */

async function carregarJogos() {
  var base = obterBasePath();
  try {
    var resposta = await fetch(base + 'dados/jogos.json');
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
    var dados = await resposta.json();

    var jogosRealizados = dados.jogos.filter(function (j) { return j.status === 'realizado'; });
    var jogosFuturos    = dados.jogos.filter(function (j) { return j.status === 'futuro' || j.status === 'descanso'; });

    // Página de futebol: ultimos jogos
    var elUltimos = document.getElementById('ultimos-jogos');
    if (elUltimos) {
      elUltimos.innerHTML = jogosRealizados.length > 0
        ? jogosRealizados.map(montarJogoRealizado).join('')
        : '<p class="sem-dados">Nenhum jogo realizado ainda.</p>';
    }

    // Página de futebol: próximos jogos
    var elProximos = document.getElementById('proximos-jogos');
    if (elProximos) {
      elProximos.innerHTML = jogosFuturos.length > 0
        ? jogosFuturos.map(montarJogoFuturo).join('')
        : '<p class="sem-dados">Nenhum jogo agendado.</p>';
    }

    // Kicker com o nome do campeonato
    var elCampeonato = document.getElementById('campeonato-nome');
    if (elCampeonato) elCampeonato.textContent = dados.campeonato;

    // Home: faixa com o próximo jogo real (primeiro com status 'futuro')
    var elFaixaHome = document.getElementById('proximo-jogo-home');
    if (elFaixaHome) {
      var proximoJogo = dados.jogos.find(function (j) { return j.status === 'futuro'; });
      elFaixaHome.innerHTML = proximoJogo
        ? montarFaixaProximoJogo(proximoJogo)
        : '<span class="fj-rotulo">Nenhum jogo agendado no momento</span>';
    }

  } catch (erro) {
    console.error('Erro ao carregar jogos:', erro);
    mostrarErro('ultimos-jogos',  'Não foi possível carregar os jogos. Tente recarregar a página.');
    mostrarErro('proximos-jogos', '');
    mostrarErro('proximo-jogo-home', '');
  }
}

/* Monta o HTML de um jogo já realizado com placar e indicação de pênaltis ou W.O. */
function montarJogoRealizado(jogo) {
  var dt = formatarData(jogo.data, 'mes-dia');
  var buguVenceuPenaltis = jogo.vencedorPenaltis === 'BUGU BUGU';

  // Jogo decidido por W.O. (adversário desistiu da liga): sem disputa de pênaltis
  var classePlacar, tituloPlacar;
  if (jogo.wo) {
    classePlacar = 'res wo';
    tituloPlacar = 'Resultado por W.O.';
  } else if (jogo.vencedorPenaltis) {
    // Placar com fundo dourado quando o Bugu Bugu ganhou os pênaltis (+1 ponto)
    classePlacar = buguVenceuPenaltis ? 'res pen' : 'res';
    tituloPlacar = buguVenceuPenaltis
      ? 'Vitória nos pênaltis' + (jogo.placarPenaltis ? ' ' + jogo.placarPenaltis : '') + ' (+1 ponto)'
      : 'Derrota nos pênaltis';
  } else {
    classePlacar = 'res';
    tituloPlacar = 'Resultado no tempo normal';
  }

  return [
    '<div class="jogo">',
    '  <div class="quando">' + dt.mes + '<b>' + dt.dia + '</b></div>',
    '  <div class="conf">',
    '    <span class="nosso">Bugu Bugu</span>',
    '    <span class="vstag"> vs </span>',
    '    ' + capitalizarNome(jogo.adversario),
    (jogo.wo ? '    <span class="vstag"> (W.O.)</span>' : ''),
    '  </div>',
    '  <div class="' + classePlacar + '" title="' + tituloPlacar + '">',
    '    ' + jogo.golsBuguBugu + '–' + jogo.golsAdversario,
    '  </div>',
    '</div>'
  ].join('\n');
}

/* Monta o HTML de um jogo futuro ou de um rodada de descanso. */
function montarJogoFuturo(jogo) {
  if (jogo.status === 'descanso') {
    var dt = formatarData(jogo.data, 'mes-dia');
    return '<div class="jogo folga">' + dt.dia + ' ' + dt.mes + ' &middot; Rodada ' + jogo.rodada + ' &mdash; Descanso</div>';
  }

  // Rodada ainda sem data marcada: mostra "Rodada N" no lugar do dia/mês
  var temData = jogo.data && jogo.data.indexOf('-') !== -1;
  var quando = temData
    ? formatarData(jogo.data, 'mes-dia')
    : { mes: 'Rodada&nbsp;', dia: jogo.rodada };

  return [
    '<div class="jogo">',
    '  <div class="quando">' + quando.mes + '<b>' + quando.dia + '</b></div>',
    '  <div class="conf">',
    '    <span class="nosso">Bugu Bugu</span>',
    '    <span class="vstag"> vs </span>',
    '    ' + capitalizarNome(jogo.adversario),
    '  </div>',
    '  <span class="vstag">' + (temData ? 'a jogar' : 'data a definir') + '</span>',
    '</div>'
  ].join('\n');
}

/* Monta o HTML interno da faixa dourada do próximo jogo na Home. */
function montarFaixaProximoJogo(jogo) {
  var temData = jogo.data && jogo.data.indexOf('-') !== -1;
  var dataTexto = 'Data a definir';
  if (temData) {
    var dt = formatarData(jogo.data, 'mes-dia');
    dataTexto = 'Sáb ' + dt.dia + ' ' + dt.mes;
  }
  return [
    '<span class="fj-rotulo">&#9658; Próxima rodada</span>',
    '<span class="fj-confronto">Bugu Bugu &nbsp;&times;&nbsp; ' + capitalizarNome(jogo.adversario) + '</span>',
    '<span class="fj-data">' + dataTexto + ' &middot; Rodada ' + jogo.rodada + '</span>'
  ].join('\n');
}

carregarJogos();
