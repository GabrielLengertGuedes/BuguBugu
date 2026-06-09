/* ============================================================
   CARREGAR-PRODUTO.JS — BUGU BUGU FC
   Lê dados/produto.json e renderiza um card por produto,
   cada um com carrossel independente de imagens.
   ============================================================ */

async function carregarProduto() {
  var base = obterBasePath();
  try {
    var resposta = await fetch(base + 'dados/produto.json');
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
    var dados = await resposta.json();

    var elContainer = document.getElementById('produto-conteudo');
    if (!elContainer) return;

    elContainer.innerHTML = dados.produtos.map(function (produto) {
      return montarCard(produto, base);
    }).join('');

    elContainer.querySelectorAll('.produto-card').forEach(setupCard);

  } catch (erro) {
    console.error('Erro ao carregar produto:', erro);
    mostrarErro('produto-conteudo', 'Não foi possível carregar as informações dos produtos. Tente recarregar a página.');
  }
}

/* Gera o HTML completo de um card de produto. */
function montarCard(produto, base) {
  var fotos = produto.imagens.map(function (img, i) {
    return '<img class="carr-foto' + (i === 0 ? ' ativo' : '') + '" src="' + base + img + '" alt="' + produto.nome + '">';
  }).join('');

  var dots = produto.imagens.map(function (_, i) {
    return '<button class="carr-dot' + (i === 0 ? ' ativo' : '') + '" data-idx="' + i + '" aria-label="Imagem ' + (i + 1) + '"></button>';
  }).join('');

  var tamanhos = produto.tamanhos.map(function (tam, i) {
    return '<button type="button"' + (i === 0 ? ' class="sel"' : '') + ' aria-label="Tamanho ' + tam + '">' + tam + '</button>';
  }).join('');

  var btnWpp = produto.linkWhatsApp
    ? '<a class="btn" href="' + produto.linkWhatsApp + '" target="_blank" rel="noopener noreferrer" style="margin-top:.6rem">Comprar pelo WhatsApp</a>'
    : '';

  return '<div class="produto-card">' +
    '<div class="carrossel">' +
      '<button class="carr-btn carr-prev" aria-label="Imagem anterior">&#8249;</button>' +
      '<div class="carr-track">' + fotos + '</div>' +
      '<button class="carr-btn carr-next" aria-label="Próxima imagem">&#8250;</button>' +
    '</div>' +
    '<div class="carr-dots">' + dots + '</div>' +
    '<div class="prod-info">' +
      '<h3 class="prod-nome">' + produto.nome + '</h3>' +
      '<p class="prod-desc">' + produto.descricao + '</p>' +
      '<div class="preco">' + formatarPreco(produto.preco, produto.moeda) +
        '<small>Valor sujeito a ajuste conforme o lote de produção</small>' +
      '</div>' +
      '<div class="tam-label">Tamanho</div>' +
      '<div class="tamanhos" role="group" aria-label="Selecione um tamanho">' + tamanhos + '</div>' +
      '<div class="btns-compra">' +
        '<a class="btn" href="' + produto.linkInstagram + '" target="_blank" rel="noopener noreferrer">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>' +
          'Comprar pelo Instagram' +
        '</a>' +
        btnWpp +
      '</div>' +
      '<p class="aviso">Vendida <strong>apenas pelos canais oficiais</strong> do clube. Desconfie de vendas não autorizadas.</p>' +
    '</div>' +
  '</div>';
}

/* Configura o carrossel e interações de um card. */
function setupCard(card) {
  var fotos = card.querySelectorAll('.carr-foto');
  var dots  = card.querySelectorAll('.carr-dot');
  var atual = 0;

  function irPara(idx) {
    atual = (idx + fotos.length) % fotos.length;
    fotos.forEach(function (f, i) { f.classList.toggle('ativo', i === atual); });
    dots.forEach(function  (d, i) { d.classList.toggle('ativo', i === atual); });
  }

  card.querySelector('.carr-prev').addEventListener('click', function () { irPara(atual - 1); });
  card.querySelector('.carr-next').addEventListener('click', function () { irPara(atual + 1); });

  card.querySelector('.carr-dots').addEventListener('click', function (ev) {
    var btn = ev.target.closest('.carr-dot');
    if (btn) irPara(parseInt(btn.dataset.idx, 10));
  });

  card.querySelector('.tamanhos').addEventListener('click', function (ev) {
    if (ev.target.tagName !== 'BUTTON') return;
    card.querySelectorAll('.tamanhos button').forEach(function (b) { b.classList.remove('sel'); });
    ev.target.classList.add('sel');
  });
}

carregarProduto();
