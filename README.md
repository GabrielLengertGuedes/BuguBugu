# BUGU BUGU FC — Site Oficial

Site oficial do **BUGU BUGU Futebol Clube**, time Sub-16 de Society e e-sports.  
Construído com HTML, CSS e JavaScript puro — sem frameworks, sem backend.

🌐 **[bugubugu.github.io/BuguBugu](https://gabriellengguedes.github.io/BuguBugu/)**

---

## Páginas

| Página | Arquivo |
|--------|---------|
| Home | `index.html` |
| Futebol (jogos + tabela) | `paginas/futebol.html` |
| E-Sports | `paginas/esports.html` |
| Loja | `paginas/loja.html` |
| Notícias | `paginas/noticias.html` |
| História | `paginas/historia.html` |
| Contato | `paginas/contato.html` |

---

## Como rodar localmente

O site usa `fetch()` para carregar os JSONs, então precisa de um servidor local — não funciona abrindo o arquivo diretamente no navegador.

**Opção recomendada:** extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code.  
Clique com o botão direito no `index.html` → *Open with Live Server*.

---

## Como atualizar os dados

Todos os dados do site ficam na pasta `dados/`. Edite os arquivos JSON para atualizar o site — sem precisar tocar no código.

### Adicionar resultado de jogo — `dados/jogos.json`

Mude o `status` de `"futuro"` para `"realizado"` e preencha os gols:

```json
{
  "rodada": 4,
  "data": "2026-06-27",
  "adversario": "Palmeiras",
  "local": "Arena Sou Boleiro",
  "status": "realizado",
  "golsBuguBugu": 3,
  "golsAdversario": 2,
  "vencedorPenaltis": "",
  "placarPenaltis": ""
}
```

Se o jogo foi para pênaltis, preencha também `vencedorPenaltis` (`"BUGU BUGU"` ou o nome do adversário) e `placarPenaltis` (ex: `"3 x 2"`).

### Atualizar a tabela — `dados/classificacao.json`

Edite as estatísticas de cada time após cada rodada (vitórias, empates, derrotas, vitórias por pênaltis). A pontuação é calculada automaticamente.

> **Regra de pontos:** V×3 + E×1 + VitPênaltis×1

### Publicar uma notícia — `dados/noticias.json`

Adicione um objeto ao array `noticias`:

```json
{
  "id": 5,
  "data": "2026-06-27",
  "categoria": "Futebol",
  "titulo": "Título da notícia",
  "resumo": "Parágrafo curto exibido na listagem.",
  "imagem": "imagens/noticias/nome-da-imagem.jpg",
  "conteudo": [
    "Primeiro parágrafo do artigo completo.",
    "Segundo parágrafo.",
    "Terceiro parágrafo."
  ]
}
```

Coloque a imagem em `imagens/noticias/` com o mesmo nome usado no campo `imagem`.  
O `id` deve ser único — use sempre o próximo número da sequência.

### Atualizar a camisa — `dados/produto.json`

Edite `preco`, `tamanhos` ou `linkWhatsApp` (quando disponível).

---

## Subir atualizações

Após editar qualquer arquivo:

```bash
git add .
git commit -m "descrição do que mudou"
git push
```

O site atualiza automaticamente em cerca de 1 minuto.

---

## Estrutura de pastas

```
bugu-bugu-fc/
├── index.html
├── paginas/
├── css/
│   ├── estilo-global.css
│   └── componentes.css
├── js/
│   ├── util.js
│   ├── navegacao.js
│   ├── carregar-jogos.js
│   ├── carregar-tabela.js
│   ├── carregar-noticias.js
│   ├── carregar-artigo.js
│   ├── carregar-titulos.js
│   └── carregar-produto.js
├── dados/
│   ├── jogos.json
│   ├── classificacao.json
│   ├── noticias.json
│   ├── titulos-esports.json
│   └── produto.json
└── imagens/
    └── noticias/
```
