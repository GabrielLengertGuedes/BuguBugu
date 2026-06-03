# Documento de Arquitetura e Especificação Técnica — Site BUGU BUGU FC

> **Status:** v0.1 — documento vivo.
> **Última atualização:** 02/06/2026
> **Documento irmão:** `01-requisitos.md` (leia antes deste).
>
> **Para que serve este documento:** descrever *como* o site será construído — a tecnologia, a estrutura de pastas, cada tela, cada arquivo de dados editável, a parte de segurança, a conformidade com a LGPD e a hospedagem. Serve de guia para o desenho no Figma e para a programação no Claude Code.

---

## 1. Decisões de arquitetura (e o porquê de cada uma)

### 1.1 Tecnologia escolhida

**HTML + CSS + JavaScript puro (sem framework), com os dados em arquivos JSON.**

Por quê, ponto a ponto:

- **É site estático.** O conteúdo muda pouco e é atualizado manualmente. Um site estático é mais rápido, mais seguro (não tem servidor/banco para invadir), mais barato (hospedagem gratuita) e mais fácil de manter.
- **Sem framework (React/Vue) por enquanto.** Como o objetivo é *aprender a base*, fazer no "vanilla" primeiro ensina os fundamentos que todo framework usa por baixo. Dá para migrar para React depois, quando os fundamentos estiverem firmes.
- **Dados em JSON.** Separar o conteúdo (jogos, tabela, títulos, produto, notícias) da estrutura visual permite atualizar tudo editando um único arquivo de texto, sem tocar no código das páginas. É o que cumpre o requisito RF10.

### 1.2 O que é "banco de dados" aqui

O documento de requisitos fala em "banco de dados funcional". Vale esclarecer, porque é um ponto importante de entendimento:

Um banco de dados tradicional (MySQL, PostgreSQL) serve para guardar dados que **mudam o tempo todo** e vêm de **muitos usuários** (ex.: cada compra, cada cadastro). No nosso caso:

- Não há cadastro de usuário (decisão do projeto).
- Não há compra processada no site (vai pelo Instagram).
- Os dados (jogos, tabela) mudam poucas vezes por mês e são editados por uma só pessoa.

Para esse cenário, **os arquivos JSON cumprem o papel de banco de dados** de forma mais simples, segura e gratuita. Não há razão técnica para montar um banco relacional aqui — seria complexidade e custo sem benefício. Quando (e se) o site passar a vender com pagamento online ou tiver área de usuário, aí sim entra um banco de verdade. Está previsto na evolução (seção 9).

### 1.3 Renderização dos dados

As páginas HTML carregam os arquivos JSON via JavaScript (`fetch`) e montam o conteúdo na tela. Assim, quando você edita o JSON, a página reflete a mudança automaticamente no próximo carregamento — sem mexer no HTML.

---

## 2. Estrutura de pastas do projeto

```
bugu-bugu-fc/
│
├── index.html                  # Página inicial (Home)
│
├── paginas/                    # Demais páginas do site
│   ├── historia.html
│   ├── futebol.html
│   ├── esports.html
│   ├── loja.html
│   ├── noticias.html
│   ├── contato.html
│   ├── termos-de-uso.html
│   └── politica-de-privacidade.html
│
├── css/
│   ├── estilo-global.css        # Variáveis de cor, fontes, reset, layout base
│   └── componentes.css          # Estilos de cartões, botões, tabela, etc.
│
├── js/
│   ├── carregar-jogos.js        # Lê dados/jogos.json e monta a lista de jogos
│   ├── carregar-tabela.js       # Lê dados/classificacao.json e monta a tabela
│   ├── carregar-titulos.js      # Lê dados/titulos-esports.json
│   ├── carregar-produto.js      # Lê dados/produto.json e monta a página da loja
│   ├── carregar-noticias.js     # Lê dados/noticias.json
│   └── util.js                  # Funções reutilizáveis (formatar data, etc.)
│
├── dados/                      # ★ ARQUIVOS QUE VOCÊ EDITA NA MÃO ★
│   ├── jogos.json
│   ├── classificacao.json
│   ├── titulos-esports.json
│   ├── produto.json
│   └── noticias.json
│
├── imagens/
│   ├── escudo.png
│   ├── camisa-frente.png
│   ├── camisa-verso.png
│   └── noticias/                # Imagens das notícias
│
├── .gitignore                  # Lista o que NÃO vai para o repositório
├── .env.example                # Modelo de variáveis de ambiente (sem segredos reais)
└── README.md                   # Instruções de como rodar e atualizar o site
```

> **Princípio de organização (RNF11):** dados, estilos, scripts, páginas e documentos legais ficam em pastas separadas. A pasta `dados/` é a única que o administrador do site precisa tocar no dia a dia.

---

## 3. Especificação das telas

Cada tela abaixo descreve: o objetivo, os elementos visuais e o comportamento. Isto guia o Figma (passo 3) e a programação.

Todas as telas compartilham:
- **Cabeçalho fixo:** escudo + nome do clube à esquerda; menu de navegação (Início, História, Futebol, E-sports, Loja, Notícias, Contato) à direita. Em celular, o menu vira um ícone "hambúrguer".
- **Rodapé:** links para os dois Instagrams, link para Termos de Uso e Política de Privacidade, e o aviso "© BUGU BUGU FC".
- **Identidade visual:** fundo e detalhes em roxo (`--cor-primaria`) e amarelo/dourado (`--cor-secundaria`).

### 3.1 Home (`index.html`)
**Objetivo:** primeira impressão + atalhos para o que importa.
- Banner de destaque com o escudo e o nome do clube sobre fundo roxo.
- Card do **próximo jogo** (puxado de `jogos.json`, o primeiro jogo futuro).
- Faixa com atalhos para Futebol, E-sports e Loja.
- Prévia das **últimas notícias** (3 mais recentes de `noticias.json`).
- Chamada para a camisa oficial com botão "Ver na loja".

### 3.2 História (`historia.html`)
**Objetivo:** contar a trajetória do clube.
- Texto da história (do anexo 7.1.1 do doc de requisitos).
- Linha do tempo simples: 01/08/2023 (fundação) → conquistas de e-sports → presente.
- Imagens do clube (a fornecer).

### 3.3 Futebol (`futebol.html`)
**Objetivo:** jogos + resultados + classificação. É o coração do site.
- **Próximos jogos:** lista com data, rodada, confronto, e (quando houver) local. Vem de `jogos.json`.
- **Resultados:** jogos já realizados com placar e resultado dos pênaltis. Vem de `jogos.json` (mesmo arquivo, campo de status diferencia jogo futuro de realizado).
- **Tabela de classificação:** colunas Posição, Clube, V, E, D, Pts de pênalti, Pts. Vem de `classificacao.json`. Linha do BUGU BUGU destacada.
- Indicação do campeonato ("Sou Boleiro Sub-16 — Society / Liga FUT7").
- **Observação da regra:** uma nota explicando a regra dos pênaltis (+1 ponto), para o torcedor entender a pontuação.

### 3.4 E-sports (`esports.html`)
**Objetivo:** apresentar a equipe de EAFC e os títulos.
- Apresentação da equipe (EAFC 26).
- **Vitrine de títulos:** Campeão da Glória Cup (3x), Campeão de federação (5x). Vem de `titulos-esports.json`.
- Link para o Instagram @bugubuguesports.

### 3.5 Loja (`loja.html`)
**Objetivo:** mostrar a camisa e direcionar a compra.
- Fotos da camisa (frente e verso).
- Nome, descrição, preço (de `produto.json`).
- Seletor de tamanho (P, M, G, GG).
- Botão **"Comprar pelo Instagram"** → abre o Instagram do clube (@bugu_bugu_fc).
- Espaço reservado (oculto por ora) para botão de WhatsApp e, no futuro, pagamento online.
- Aviso: "A camisa oficial é vendida apenas pelos canais oficiais do clube."

### 3.6 Notícias (`noticias.html`)
**Objetivo:** destaques e novidades.
- Lista de notícias (título, data, imagem, resumo). Vem de `noticias.json`.
- Na v1 pode iniciar vazia ou com 1 notícia de exemplo; o clube adiciona depois.

### 3.7 Contato (`contato.html`)
**Objetivo:** canais oficiais, SEM coletar dados.
- Botões/links diretos: Instagram do clube, Instagram do e-sports, e (futuramente) WhatsApp.
- **Nenhum formulário, nenhum campo de dados pessoais.**

### 3.8 Termos de Uso e Política de Privacidade
Páginas de texto legal (ver seção 6). Linkadas no rodapé.

---

## 4. Arquivos de dados (o que você edita na mão)

Formato: **JSON**. Regras para não quebrar o site:
- Sempre manter as aspas `"` e as vírgulas entre itens.
- Não colocar vírgula depois do último item de uma lista.
- Datas no formato `AAAA-MM-DD` (ano-mês-dia) **dentro do arquivo**, para ordenar corretamente. ⚠️ **Importante:** este é apenas o formato de armazenamento (padrão internacional ISO 8601). Você escreve `2026-04-25` no arquivo, mas o **site exibe automaticamente em formato brasileiro** ("25/04" ou "25 Abr") através da função `formatarData()`. O torcedor nunca vê o formato AAAA-MM-DD; ele só existe no bastidor para o computador ordenar os jogos na ordem cronológica certa.

### 4.1 `dados/jogos.json`
Cada jogo tem um `status`: `"futuro"` ou `"realizado"`. Jogos realizados têm placar.

```json
{
  "campeonato": "Sou Boleiro Sub-16 — Society",
  "jogos": [
    {
      "data": "2026-03-28",
      "rodada": 1,
      "adversario": "ONDA LARANJA",
      "local": "A definir",
      "status": "realizado",
      "golsBuguBugu": 6,
      "golsAdversario": 6,
      "vencedorPenaltis": "BUGU BUGU",
      "placarPenaltis": "2x1"
    },
    {
      "data": "2026-04-25",
      "rodada": 2,
      "adversario": "KSA",
      "local": "A definir",
      "status": "realizado",
      "golsBuguBugu": 1,
      "golsAdversario": 5,
      "vencedorPenaltis": "BUGU BUGU",
      "placarPenaltis": "3x2"
    },
    {
      "data": "2026-05-30",
      "rodada": 3,
      "adversario": "DESCANSO",
      "local": "",
      "status": "descanso"
    },
    {
      "data": "2026-06-27",
      "rodada": 4,
      "adversario": "PALMEIRAS",
      "local": "A definir",
      "status": "futuro"
    },
    {
      "data": "2026-07-25",
      "rodada": 5,
      "adversario": "FIFO",
      "local": "A definir",
      "status": "futuro"
    },
    {
      "data": "2026-08-29",
      "rodada": 6,
      "adversario": "SK SOCCER",
      "local": "A definir",
      "status": "futuro"
    },
    {
      "data": "2026-09-26",
      "rodada": 7,
      "adversario": "AUDAX",
      "local": "A definir",
      "status": "futuro"
    }
  ]
}
```
> **Dados reais** (fonte: posts do @bugu_bugu_fc). O site deve separar a exibição em **"Últimos jogos"** (status `realizado`, mostra placar) e **"Próximos jogos"** (status `futuro` ou `descanso`). Quando um jogo acontecer, basta mudar o `status` de `futuro` para `realizado` e preencher o placar.

### 4.2 `dados/classificacao.json`
A regra de pontos: `Pts = vitorias*3 + empates*1 + vitoriasPenaltis*1`.
O site pode **calcular** o total automaticamente a partir desses campos (recomendado, evita erro de conta), ou você pode informar o total manualmente no campo `pontos`.

```json
{
  "liga": "Liga FUT7",
  "calcularPontosAutomaticamente": true,
  "times": [
    { "nome": "KSA",          "vitorias": 2, "empates": 0, "derrotas": 0, "vitoriasPenaltis": 1 },
    { "nome": "SK SOCCER",    "vitorias": 1, "empates": 1, "derrotas": 0, "vitoriasPenaltis": 1 },
    { "nome": "AUDAX",        "vitorias": 1, "empates": 0, "derrotas": 1, "vitoriasPenaltis": 0 },
    { "nome": "BUGU BUGU",    "vitorias": 0, "empates": 1, "derrotas": 1, "vitoriasPenaltis": 2 },
    { "nome": "AGFF",         "vitorias": 0, "empates": 1, "derrotas": 0, "vitoriasPenaltis": 1 },
    { "nome": "ONDA LARANJA", "vitorias": 0, "empates": 1, "derrotas": 0, "vitoriasPenaltis": 0 },
    { "nome": "PALMEIRAS",    "vitorias": 0, "empates": 0, "derrotas": 1, "vitoriasPenaltis": 0 },
    { "nome": "FIFO SPORTS",  "vitorias": 0, "empates": 0, "derrotas": 1, "vitoriasPenaltis": 0 }
  ]
}
```
> O site deve **ordenar** os times por pontos (maior para menor) ao exibir, e **destacar** a linha do BUGU BUGU.

### 4.3 `dados/titulos-esports.json`
```json
{
  "equipe": "BUGU BUGU E-Sports",
  "jogo": "EAFC 26",
  "instagram": "https://www.instagram.com/bugubuguesports/",
  "titulos": [
    { "nome": "Campeão da Glória Cup", "quantidade": 3, "organizador": "@gloriacup.ofc" },
    { "nome": "Campeão de Federação",  "quantidade": 5, "organizador": "" }
  ]
}
```

### 4.4 `dados/produto.json`
```json
{
  "nome": "Camisa Oficial BUGU BUGU FC",
  "descricao": "Camisa oficial do clube, nas cores roxo e amarelo.",
  "preco": 100.00,
  "moeda": "BRL",
  "tamanhos": ["P", "M", "G", "GG"],
  "imagemFrente": "imagens/camisa-frente.png",
  "imagemVerso": "imagens/camisa-verso.png",
  "linkInstagram": "https://www.instagram.com/bugu_bugu_fc/",
  "linkWhatsApp": ""
}
```
> O `preco` é editável aqui — basta trocar o número. O `linkWhatsApp` fica vazio por enquanto; quando houver número, o botão de WhatsApp aparece automaticamente.

### 4.5 `dados/noticias.json`
```json
{
  "noticias": [
    {
      "data": "2026-06-01",
      "titulo": "Exemplo de notícia",
      "resumo": "Este é um texto de exemplo. Substitua pela notícia real.",
      "imagem": "imagens/noticias/exemplo.png"
    }
  ]
}
```

---

## 5. Segurança

Mesmo sendo um site simples, seguimos boas práticas reais. A boa notícia: como **não coletamos dados pessoais nem processamos pagamento**, a superfície de risco é muito pequena. Ainda assim:

### 5.1 Segredos e o arquivo `.env` (RNF01)
- Qualquer chave ou token (ex.: futura chave do Mercado Pago, chave do Google Analytics) **nunca** vai escrito no código nem no repositório.
- Vai num arquivo `.env`, que fica **só na sua máquina / no painel da hospedagem**.
- O repositório recebe apenas um `.env.example` — um modelo com os nomes das variáveis e valores em branco, para quem for rodar o projeto saber o que precisa preencher.

**`.gitignore`** (lista do que o Git deve ignorar — nunca enviar):
```
.env
node_modules/
.DS_Store
*.log
```

**`.env.example`** (modelo, vai para o repositório):
```
# Preencha com seus valores reais num arquivo .env (que NÃO vai para o Git)
ANALYTICS_ID=
MERCADOPAGO_TOKEN=
```

> **Por que isso importa:** se um segredo vaza num repositório público, qualquer pessoa pode usá-lo (gerar cobranças, acessar serviços no seu nome). Manter no `.env` é a prática padrão da indústria.

### 5.2 HTTPS (RNF02)
O site será servido sob HTTPS (cadeado), criptografando a conexão. As hospedagens recomendadas (seção 7) já fornecem HTTPS gratuito e automático.

### 5.3 Sem dados na URL (RNF04)
Nenhuma informação sensível trafega em parâmetros de URL.

### 5.4 Validação (RNF05)
Como não há formulário que envia dados, não há entrada de usuário para validar no momento. Se um formulário for adicionado no futuro, ele deverá validar tanto no navegador quanto no servidor.

### 5.5 Conteúdo de terceiros
Links externos (Instagram, futuros gateways) abrem em nova aba com `rel="noopener noreferrer"` — prática que evita que a página aberta tenha acesso à nossa.

---

## 6. LGPD e documentos legais

> **Importante (e honesto):** eu não sou advogado. Os textos abaixo são **modelos de ponto de partida** que refletem a realidade do site. Para um clube que vende produto, o ideal é uma revisão por um profissional antes de publicar. Dito isso, como o site **não coleta dados pessoais**, a obrigação legal é mínima.

### 6.1 Por que a LGPD aqui é simples
A LGPD trata do **tratamento de dados pessoais**. Nosso site:
- Não tem cadastro nem login.
- Não tem formulário de contato.
- Não processa pagamento.
- Não armazena nome, e-mail, telefone de ninguém.

Ou seja: **não tratamos dados pessoais**, então a maior parte das obrigações da LGPD nem se aplica. O que precisamos cobrir:

1. **Política de Privacidade** declarando que o site não coleta dados pessoais. Se um dia usarmos uma ferramenta de estatística de acesso (ex.: Google Analytics), ela precisa ser mencionada, pois usa cookies — e aí entra o aviso de cookies.
2. **Termos de Uso** com regras básicas: propriedade do conteúdo, uso permitido, isenção de responsabilidade, e o fato de que a compra é feita por canal externo (Instagram).
3. **Aviso de cookies** — só necessário SE usarmos cookies não essenciais (analytics). Se não usarmos nenhum, nem precisa.

### 6.2 Conteúdo mínimo da Política de Privacidade
- Identificação do clube e forma de contato (Instagram).
- Declaração de que **não há coleta de dados pessoais** pelo site.
- Menção a cookies (se houver) e como recusá-los.
- Aviso de que links externos (Instagram) têm suas próprias políticas.
- Direitos do titular conforme a LGPD (mesmo que não coletemos, é boa prática informar como exercer, ainda que seja "não tratamos dados").

### 6.3 Conteúdo mínimo dos Termos de Uso
- O conteúdo (escudo, fotos, textos) pertence ao clube; não pode ser copiado sem autorização.
- A camisa oficial é vendida apenas pelos canais oficiais.
- A compra é combinada por canal externo (Instagram); o site não processa pagamento.
- Isenção: o site é informativo; informações de jogos/tabela podem ter atraso de atualização.
- Imagens de atletas (especialmente menores) são publicadas com autorização (RN03).

> Os textos completos serão escritos como páginas HTML no passo de programação. Aqui ficam apenas os pontos que devem constar.

---

## 7. Hospedagem (gratuita, com link real e HTTPS)

**Recomendação principal: GitHub Pages** ou **Netlify**. Ambos:
- São gratuitos para um site estático como este.
- Fornecem HTTPS automático.
- Dão um link/subdomínio real (ex.: `bugubugufc.netlify.app`).
- Permitem ligar um domínio próprio depois (ex.: `bugubugufc.com.br`), se o clube quiser comprar um.

**Sugestão de fluxo (deploy):**
1. Código versionado no GitHub (com `.env` no `.gitignore`).
2. Conectar o repositório ao Netlify (ou ativar o GitHub Pages).
3. Cada vez que você atualiza um JSON e envia para o GitHub, o site republica sozinho.

> **Por que estático ajuda na hospedagem:** sem servidor/banco para manter, o custo é zero e não há servidor para invadir. Ideal para o estágio atual do clube.

---

## 8. Qualidade de código (RNF08–RNF12)

Regras que o Claude Code deve seguir ao programar:
- **Nomes em português e autoexplicativos:** `carregarProximosJogos()`, `formatarData()`, `calcularPontos()`, `montarLinhaDaTabela()`.
- **Comentários essenciais:** explicar o *porquê* de trechos não óbvios (ex.: a regra dos pênaltis no cálculo de pontos). Não comentar o óbvio.
- **Uma responsabilidade por função.**
- **Separação de conteúdo e código:** nenhum dado de jogo/título/preço escrito direto no HTML ou JS — sempre vem dos JSON.
- **Tratamento de erro:** se um JSON falhar ao carregar, a página mostra uma mensagem amigável em vez de quebrar.
- **Acessibilidade:** todas as imagens com texto alternativo (`alt`), contraste adequado, navegação por teclado.

---

## 9. Evolução futura (fora do escopo atual)

Registrado para orientar decisões, sem implementar agora:
- **Pagamento online:** integração com gateway (Mercado Pago), que exigirá um pequeno backend e um `.env` com o token — daí a estrutura de `.env` já preparada.
- **WhatsApp como canal de venda:** basta preencher `linkWhatsApp` em `produto.json`.
- **Migração para framework (React):** quando os fundamentos estiverem firmes.
- **Banco de dados real:** só se surgir cadastro de usuário ou venda automatizada.
- **Automação de dados de jogos:** só se o campeonato passar a publicar dados de forma estruturada.

---

## 10. Mapa de telas para o Figma (passo 3)

Telas a desenhar, na ordem de prioridade:
1. Home
2. Futebol (jogos + tabela) — *a mais importante*
3. E-sports
4. Loja
5. História
6. Notícias
7. Contato
8. Termos de Uso / Política de Privacidade (layout de texto simples)

Mais os dois estados de navegação: **menu desktop** e **menu mobile (hambúrguer)**.
