/* ============================================================
   CARREGAR-NOTICIAS.JS — BUGU BUGU FC
   Lê dados/noticias.json e monta a lista de notícias.
   Usado tanto na página de Notícias (lista completa) quanto
   na Home (prévia das 3 mais recentes com layout diferenciado).

   Parâmetros aceitos por carregarNoticias(opcoes):
     elementoId  — ID do elemento que receberá as notícias (obrigatório)
     limite      — máximo de notícias a exibir (padrão: todas)
     modoHome    — se true, o primeiro card é "grande" e os demais menores
   ============================================================ */

async function carregarNoticias(opcoes) {
  var elementoId = opcoes.elementoId;
  var limite     = opcoes.limite || null;
  var modoHome   = opcoes.modoHome || false;
  var base = obterBasePath();

  try {
    var resposta = await fetch(base + 'dados/noticias.json');
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
    var dados = await resposta.json();

    // Ordena por data ISO decrescente (mais recente primeiro)
    var ordenadas = dados.noticias.slice().sort(function (a, b) {
      return b.data.localeCompare(a.data);
    });

    var filtradas = limite ? ordenadas.slice(0, limite) : ordenadas;

    var elContainer = document.getElementById(elementoId);
    if (!elContainer) return;

    if (filtradas.length === 0) {
      elContainer.innerHTML = '<p class="sem-dados">Nenhuma notícia publicada ainda.</p>';
      return;
    }

    elContainer.innerHTML = filtradas.map(function (noticia, indice) {
      var grande = modoHome && indice === 0;
      return montarCardNoticia(noticia, grande, base);
    }).join('');

  } catch (erro) {
    console.error('Erro ao carregar notícias:', erro);
    mostrarErro(elementoId, 'Não foi possível carregar as notícias. Tente recarregar a página.');
  }
}

/* Monta o HTML de um card de notícia. */
function montarCardNoticia(noticia, grande, base) {
  var classeGrande = grande ? ' grande' : '';
  var dataFormatada = formatarData(noticia.data, 'longo-texto');

  var fotoHTML = noticia.imagem
    ? '<img src="' + base + noticia.imagem + '" alt="' + noticia.titulo + '" class="foto-noticia">'
    : '<div class="foto"></div>';

  var categoriaHTML = noticia.categoria
    ? '<div class="cat">' + noticia.categoria + '</div>'
    : '';

  var resumoHTML = (grande && noticia.resumo)
    ? '<p>' + noticia.resumo + '</p>'
    : '';

  var conteudo = [
    '  ' + fotoHTML,
    '  ' + categoriaHTML,
    '  <div class="data-n">' + dataFormatada + '</div>',
    '  <h3>' + noticia.titulo + '</h3>',
    '  ' + resumoHTML,
  ].join('\n');

  var href = null;
  if (noticia.link) {
    href = noticia.link;
  } else if (noticia.id) {
    href = base ? 'noticia.html?id=' + noticia.id : 'paginas/noticia.html?id=' + noticia.id;
  }

  if (href) {
    var attrs = noticia.link ? ' target="_blank" rel="noopener noreferrer"' : '';
    return '<a class="news' + classeGrande + '" href="' + href + '"' + attrs + '>\n' + conteudo + '\n</a>';
  }
  return '<article class="news' + classeGrande + '">\n' + conteudo + '\n</article>';
}
