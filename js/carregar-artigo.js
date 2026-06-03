async function carregarArtigo() {
  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get('id'), 10);
  var base = obterBasePath();
  var elContainer = document.getElementById('artigo-container');

  if (!id) {
    elContainer.innerHTML = '<p class="sem-dados">Notícia não encontrada.</p>';
    return;
  }

  try {
    var resposta = await fetch(base + 'dados/noticias.json');
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
    var dados = await resposta.json();

    var noticia = dados.noticias.find(function (n) { return n.id === id; });

    if (!noticia) {
      elContainer.innerHTML = '<p class="sem-dados">Notícia não encontrada.</p>';
      return;
    }

    document.title = noticia.titulo + ' — BUGU BUGU FC';

    var imagemHTML = noticia.imagem
      ? '<img src="' + base + noticia.imagem + '" alt="' + noticia.titulo + '" class="artigo-imagem">'
      : '';

    var categoriaHTML = noticia.categoria
      ? '<div class="cat">' + noticia.categoria + '</div>'
      : '';

    var paragrafos = noticia.conteudo || [noticia.resumo];
    var conteudoHTML = paragrafos.map(function (p) {
      return '<p>' + p + '</p>';
    }).join('');

    elContainer.innerHTML = [
      '<div class="artigo-header">',
      '  ' + categoriaHTML,
      '  <div class="data-n">' + formatarData(noticia.data, 'longo-texto') + '</div>',
      '  <h2>' + noticia.titulo + '</h2>',
      '</div>',
      imagemHTML,
      '<div class="artigo-corpo">',
      conteudoHTML,
      '</div>'
    ].join('\n');

  } catch (erro) {
    console.error('Erro ao carregar artigo:', erro);
    elContainer.innerHTML = '<p class="erro-carregamento">Não foi possível carregar a notícia. Tente recarregar a página.</p>';
  }
}

carregarArtigo();
