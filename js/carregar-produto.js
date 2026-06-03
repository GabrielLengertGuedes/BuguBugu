/* ============================================================
   CARREGAR-PRODUTO.JS — BUGU BUGU FC
   Lê dados/produto.json e monta a página da Loja:
   fotos, nome, preço, seletor de tamanho e botão de compra.
   ============================================================ */

async function carregarProduto() {
  var base = obterBasePath();
  try {
    var resposta = await fetch(base + 'dados/produto.json');
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
    var dados = await resposta.json();

    preencherInfoProduto(dados, base);
    montarTamanhos(dados.tamanhos);
    configurarBotaoCompra(dados);

  } catch (erro) {
    console.error('Erro ao carregar produto:', erro);
    mostrarErro('produto-conteudo', 'Não foi possível carregar as informações do produto. Tente recarregar a página.');
  }
}

/* Preenche nome, descrição, preço e imagens com os dados do JSON. */
function preencherInfoProduto(dados, base) {
  var campos = {
    'produto-nome':     dados.nome,
    'produto-descricao': dados.descricao
  };

  Object.keys(campos).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.textContent = campos[id];
  });

  var elPreco = document.getElementById('produto-preco');
  if (elPreco) {
    elPreco.innerHTML = formatarPreco(dados.preco, dados.moeda) +
      '<small>Valor sujeito a ajuste conforme o lote de produção</small>';
  }

  // Caminhos de imagem no JSON são relativos à raiz do projeto
  var elFrente = document.getElementById('imagem-frente');
  if (elFrente) {
    elFrente.src = base + dados.imagemFrente;
    elFrente.alt = dados.nome + ' - frente';
  }

  var elVerso = document.getElementById('imagem-verso');
  if (elVerso) {
    elVerso.src = base + dados.imagemVerso;
    elVerso.alt = dados.nome + ' - verso';
  }
}

/* Gera os botões de tamanho e ativa o primeiro por padrão. */
function montarTamanhos(tamanhos) {
  var elTamanhos = document.getElementById('tamanhos');
  if (!elTamanhos) return;

  elTamanhos.innerHTML = tamanhos.map(function (tam, i) {
    return '<button type="button"' + (i === 0 ? ' class="sel"' : '') +
           ' aria-label="Tamanho ' + tam + '">' + tam + '</button>';
  }).join('');

  // Seleção de tamanho é apenas visual (sem envio de dados)
  elTamanhos.addEventListener('click', function (evento) {
    if (evento.target.tagName !== 'BUTTON') return;
    elTamanhos.querySelectorAll('button').forEach(function (btn) {
      btn.classList.remove('sel');
    });
    evento.target.classList.add('sel');
  });
}

/* Configura o link de compra pelo Instagram e, se disponível, pelo WhatsApp. */
function configurarBotaoCompra(dados) {
  var elInstagram = document.getElementById('link-compra-instagram');
  if (elInstagram) elInstagram.href = dados.linkInstagram;

  // Botão de WhatsApp só aparece quando o número estiver configurado no JSON
  var elWhatsApp = document.getElementById('link-compra-whatsapp');
  if (elWhatsApp) {
    if (dados.linkWhatsApp) {
      elWhatsApp.href = dados.linkWhatsApp;
      elWhatsApp.style.display = 'inline-flex';
    }
    // Se não há link, o elemento permanece oculto (display:none no HTML)
  }
}

carregarProduto();
