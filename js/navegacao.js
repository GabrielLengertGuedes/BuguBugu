/* ============================================================
   NAVEGACAO.JS — BUGU BUGU FC
   Injeta o cabeçalho (header + barra de topo) e o rodapé em todas
   as páginas, evitando repetição de HTML.

   Como usar: cada página deve ter <div id="cabecalho"></div> e
   <div id="rodape"></div>. Este script preenche esses elementos.

   A página ativa é identificada pelo atributo data-pagina no <body>:
     <body data-pagina="futebol">
   ============================================================ */

(function () {
  var base = obterBasePath(); // definida em util.js
  var paginaAtual = document.body.dataset.pagina || 'index';

  var itensNav = [
    { id: 'index',    href: base + 'index.html',             rotulo: 'Início'   },
    { id: 'historia', href: base + 'paginas/historia.html',  rotulo: 'História' },
    { id: 'futebol',  href: base + 'paginas/futebol.html',   rotulo: 'Futebol'  },
    { id: 'esports',  href: base + 'paginas/esports.html',   rotulo: 'E-Sports' },
    { id: 'loja',     href: base + 'paginas/loja.html',      rotulo: 'Loja'     },
    { id: 'noticias', href: base + 'paginas/noticias.html',  rotulo: 'Notícias' },
    { id: 'contato',  href: base + 'paginas/contato.html',   rotulo: 'Contato'  }
  ];

  var linksNav = itensNav.map(function (item) {
    var classeAtivo = item.id === paginaAtual ? ' class="ativo"' : '';
    return '<a href="' + item.href + '"' + classeAtivo + '>' + item.rotulo + '</a>';
  }).join('');

  var srcEscudo = base + 'imagens/escudo.png';

  var htmlCabecalho = [
    '<div class="barra-topo">Clube de Futebol &amp; E-Sports &middot; Fundado em 2023</div>',
    '<header>',
    '  <div class="header-inner">',
    '    <a class="marca" href="' + base + 'index.html">',
    '      <img src="' + srcEscudo + '" alt="Escudo BUGU BUGU FC">',
    '      <div class="nome">Bugu Bugu<small>Futebol Clube</small></div>',
    '    </a>',
    '    <button class="menu-btn" aria-label="Abrir menu de navegação"',
    '      onclick="this.closest(\'header\').querySelector(\'nav\').classList.toggle(\'aberto\')">&#9776;</button>',
    '    <nav id="nav">',
    '      ' + linksNav,
    '    </nav>',
    '  </div>',
    '</header>'
  ].join('\n');

  var htmlRodape = [
    '<footer>',
    '  <div class="footer-inner">',
    '    <img src="' + srcEscudo + '" alt="Escudo BUGU BUGU FC">',
    '    <div class="footer-links">',
    '      <a href="https://www.instagram.com/bugu_bugu_fc/" target="_blank" rel="noopener noreferrer">Instagram FC</a>',
    '      <a href="https://www.instagram.com/bugubuguesports/" target="_blank" rel="noopener noreferrer">Instagram E-Sports</a>',
    '      <a href="' + base + 'paginas/termos-de-uso.html">Termos de Uso</a>',
    '      <a href="' + base + 'paginas/politica-de-privacidade.html">Privacidade</a>',
    '    </div>',
    '    <div class="copy">&copy; 2026 Bugu Bugu Futebol Clube &mdash; Todos os direitos reservados</div>',
    '  </div>',
    '</footer>'
  ].join('\n');

  function injetar() {
    var elCabecalho = document.getElementById('cabecalho');
    var elRodape = document.getElementById('rodape');
    if (elCabecalho) elCabecalho.innerHTML = htmlCabecalho;
    if (elRodape) elRodape.innerHTML = htmlRodape;
  }

  // Garante que o DOM já está pronto antes de injetar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injetar);
  } else {
    injetar();
  }
})();
