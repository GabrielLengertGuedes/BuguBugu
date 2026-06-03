/* ============================================================
   CARREGAR-TITULOS.JS — BUGU BUGU FC
   Lê dados/titulos-esports.json e monta a vitrine de troféus
   na página de E-Sports.
   ============================================================ */

async function carregarTitulos() {
  var base = obterBasePath();
  try {
    var resposta = await fetch(base + 'dados/titulos-esports.json');
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
    var dados = await resposta.json();

    // Vitrine de troféus
    var elTitulos = document.getElementById('titulos-esports');
    if (elTitulos) {
      elTitulos.innerHTML = dados.titulos.map(montarCartaoTitulo).join('');
    }

    // Nome do jogo no hero da seção
    var elJogo = document.getElementById('esports-jogo');
    if (elJogo) elJogo.textContent = dados.jogo;

    // Link para o Instagram do e-sports
    var elLink = document.getElementById('link-instagram-esports');
    if (elLink && dados.instagram) {
      elLink.href = dados.instagram;
    }

  } catch (erro) {
    console.error('Erro ao carregar títulos:', erro);
    mostrarErro('titulos-esports', 'Não foi possível carregar os títulos. Tente recarregar a página.');
  }
}

/* Monta o HTML de um cartão de troféu. */
function montarCartaoTitulo(titulo) {
  var orgHTML = titulo.organizador
    ? '<div class="org">Organização ' + titulo.organizador + '</div>'
    : '';

  return [
    '<div class="titulo">',
    '  <div class="qtd">' + titulo.quantidade + '<span>&times;</span></div>',
    '  <div class="lbl">' + titulo.nome + '</div>',
    '  ' + orgHTML,
    '</div>'
  ].join('\n');
}

carregarTitulos();
