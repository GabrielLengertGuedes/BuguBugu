/* ============================================================
   UTIL.JS — BUGU BUGU FC
   Funções reutilizáveis carregadas em todas as páginas.
   Deve ser o primeiro script incluído nas páginas.
   ============================================================ */

/**
 * Converte uma data no formato ISO "AAAA-MM-DD" para exibição em português.
 *
 * Formatos disponíveis:
 *   'mes-dia'      → objeto { mes: "Mar", dia: "28" }  (para o display de jogos)
 *   'curto'        → "28/03"
 *   'longo-texto'  → "28 Mar 2026"                     (para cards de notícias)
 *   padrão         → "28/03/2026"
 *
 * Obs: usamos a data local (split manual) para evitar o fuso UTC do new Date().
 */
function formatarData(dataISO, formato) {
  const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const partes = dataISO.split('-');
  const ano = Number(partes[0]);
  const mes = Number(partes[1]);
  const dia = Number(partes[2]);

  const diaStr = String(dia).padStart(2, '0');
  const mesStr = String(mes).padStart(2, '0');

  if (formato === 'mes-dia') {
    return { mes: MESES[mes - 1], dia: diaStr };
  }
  if (formato === 'curto') {
    return `${diaStr}/${mesStr}`;
  }
  if (formato === 'longo-texto') {
    return `${diaStr} ${MESES[mes - 1]} ${ano}`;
  }
  return `${diaStr}/${mesStr}/${ano}`;
}

/**
 * Formata um número como moeda brasileira.
 * Ex.: formatarPreco(100, 'BRL') → "R$ 100,00"
 */
function formatarPreco(valor, moeda) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: moeda || 'BRL'
  }).format(valor);
}

/**
 * Exibe uma mensagem de erro amigável dentro do elemento com o ID fornecido.
 * Usado quando um fetch de JSON falha.
 */
function mostrarErro(elementoId, mensagem) {
  const elemento = document.getElementById(elementoId);
  if (!elemento) return;
  elemento.innerHTML = mensagem
    ? `<p class="erro-carregamento">${mensagem}</p>`
    : '';
}

/**
 * Capitaliza corretamente nomes de times armazenados em maiúsculas no JSON.
 * Siglas curtas (até 4 letras, tudo maiúsculo) são preservadas.
 * Ex.: "ONDA LARANJA" → "Onda Laranja"  |  "KSA" → "KSA"
 */
function capitalizarNome(nome) {
  return nome.split(' ').map(function(palavra) {
    if (palavra.length <= 4 && palavra === palavra.toUpperCase()) {
      return palavra; // mantém siglas: KSA, FIFO, AGFF
    }
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
  }).join(' ');
}

/**
 * Retorna o prefixo de caminho correto com base na localização da página.
 * Páginas em /paginas/ precisam de '../' para chegar à raiz.
 */
function obterBasePath() {
  return window.location.pathname.includes('/paginas/') ? '../' : '';
}
