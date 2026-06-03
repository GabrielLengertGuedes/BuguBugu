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

/* Monta o HTML de um jogo já realizado com placar e indicação de pênaltis. */
function montarJogoRealizado(jogo) {
  var dt = formatarData(jogo.data, 'mes-dia');
  var buguVenceuPenaltis = jogo.vencedorPenaltis === 'BUGU BUGU';

  // Placar com fundo dourado quando o Bugu Bugu ganhou os pênaltis (+1 ponto)
  var classePlacar = buguVenceuPenaltis ? 'res pen' : 'res';
  var tituloPlacar = buguVenceuPenaltis
    ? 'Vitória nos pênaltis ' + jogo.placarPenaltis + ' (+1 ponto)'
    : 'Derrota nos pênaltis';

  return [
    '<div class="jogo">',
    '  <div class="quando">' + dt.mes + '<b>' + dt.dia + '</b></div>',
    '  <div class="conf">',
    '    <span class="nosso">Bugu Bugu</span>',
    '    <span class="vstag"> vs </span>',
    '    ' + capitalizarNome(jogo.adversario),
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

  var dt = formatarData(jogo.data, 'mes-dia');
  return [
    '<div class="jogo">',
    '  <div class="quando">' + dt.mes + '<b>' + dt.dia + '</b></div>',
    '  <div class="conf">',
    '    <span class="nosso">Bugu Bugu</span>',
    '    <span class="vstag"> vs </span>',
    '    ' + capitalizarNome(jogo.adversario),
    '  </div>',
    '  <span class="vstag">a jogar</span>',
    '</div>'
  ].join('\n');
}

/* Monta o HTML interno da faixa dourada do próximo jogo na Home. */
function montarFaixaProximoJogo(jogo) {
  var dt = formatarData(jogo.data, 'mes-dia');
  return [
    '<span class="fj-rotulo">&#9658; Próxima rodada</span>',
    '<span class="fj-confronto">Bugu Bugu &nbsp;&times;&nbsp; ' + capitalizarNome(jogo.adversario) + '</span>',
    '<span class="fj-data">Sáb ' + dt.dia + ' ' + dt.mes + ' &middot; Rodada ' + jogo.rodada + '</span>'
  ].join('\n');
}

carregarJogos();
