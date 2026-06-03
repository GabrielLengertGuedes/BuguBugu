# Documento de Requisitos — Site do BUGU BUGU Futebol Clube

> **Status:** Documento vivo (v0.1). Vamos adicionando, removendo e ajustando conforme o projeto evolui.
> **Última atualização:** 02/06/2026
>
> **Como ler este documento:**
> - **RF** = Requisito Funcional (o que o site *faz*).
> - **RNF** = Requisito Não Funcional (*como* o site faz: segurança, desempenho, qualidade...).
> - **RN** = Regra de Negócio (restrições e lógicas do "mundo real" do time).
> - Cada requisito tem prioridade: **[Essencial]**, **[Importante]** ou **[Desejável]**.

---

## 1. Visão geral do projeto

Site institucional do **BUGU BUGU Futebol Clube** (Instagram: [@bugu_bugu_fc](https://www.instagram.com/bugu_bugu_fc/)), um clube que atua em duas modalidades (**futebol** e **e-sports**) sob a mesma marca. O site serve para apresentar o clube ao público, divulgar jogos e resultados, exibir o histórico de títulos e permitir a compra da camisa oficial.

**Identidade visual:** roxo e amarelo/dourado, com escudo (cervo sobre brasão).

**Público-alvo:** torcedores do time, familiares dos jogadores, e potenciais compradores da camisa.

**Objetivo secundário (do desenvolvedor):** projeto de aprendizado para entrar na área de desenvolvimento web, então o código precisa ser limpo, comentado e seguir boas práticas reais.

---

## 2. Requisitos Funcionais (RF)

### 2.1 Páginas e navegação

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF01 | O site deve ter uma página inicial (Home) com destaques, próximo jogo e atalhos para as seções principais. | Essencial |
| RF02 | O site deve ter um menu de navegação presente em todas as páginas, com acesso a: Início, História, Futebol, E-sports, Loja e Contato. | Essencial |
| RF03 | O site deve ser navegável tanto em computador quanto em celular (layout responsivo). | Essencial |
| RF04 | O rodapé deve conter links para redes sociais, Termos de Uso e Política de Privacidade. | Essencial |

### 2.2 História do clube

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF05 | Deve existir uma página "História" que conte a trajetória do clube em texto e imagens. | Essencial |
| RF06 | A página de história pode exibir uma linha do tempo com marcos importantes (fundação, conquistas, momentos marcantes). | Importante |

### 2.3 Futebol

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF07 | A seção de futebol deve exibir os **próximos jogos** do time (adversário, data, local, campeonato). | Essencial |
| RF08 | A seção de futebol deve exibir os **resultados** dos jogos já realizados (placar). | Essencial |
| RF09 | A seção de futebol deve exibir a **tabela/classificação** do campeonato, incluindo colunas de Vitórias, Empates, Derrotas, pontos de pênaltis e Pontos totais. | Essencial |
| RF09b | A tabela deve respeitar a **regra de pontuação do campeonato**: Vitória = 3 pts, Empate = 1 pt, Derrota = 0 pts, e **+1 ponto** para o vencedor da disputa de pênaltis que ocorre ao fim de toda partida. Os pontos totais podem ser digitados manualmente OU calculados pelo site a partir dos demais campos. | Essencial |
| RF10 | Todos os dados de jogos, resultados e tabela devem poder ser **atualizados manualmente** sem precisar mexer no código das páginas (editando um arquivo de dados separado). | Essencial |
| RF11 | (Futuro/Desejável) Possibilidade de integração automática para puxar resultados de uma fonte externa, caso o campeonato venha a ter API ou planilha pública. | Desejável |

> **Nota sobre os dados (importante):** Como hoje os jogos e resultados só existem no Instagram, e o Instagram **não oferece** uma forma confiável e gratuita de puxar esses dados automaticamente, a estratégia será **atualização manual via arquivo de dados** (um JSON). É mais simples, não depende de ninguém e funciona sempre. A automação fica como melhoria futura, só se o campeonato passar a publicar os dados de forma estruturada.

### 2.4 E-sports

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF12 | Deve existir uma seção de e-sports apresentando a equipe, que compete em **EAFC** (atualmente EAFC 26, com títulos também conquistados em versões anteriores do game). | Essencial |
| RF13 | A seção de e-sports deve exibir os **títulos e conquistas** da equipe (ex.: Campeão da Glória Cup 3x, Campeão de federação 5x). | Essencial |
| RF14 | Os títulos de e-sports devem poder ser atualizados manualmente pelo mesmo mecanismo de arquivo de dados. | Importante |
| RF14b | A seção de e-sports deve linkar para o Instagram próprio do e-sports (@bugubuguesports). | Importante |

### 2.5 Loja / Compra da camisa

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF15 | Deve existir uma página de produto exibindo a camisa oficial (fotos frente e verso, descrição, preço, tamanhos disponíveis: **P, M, G, GG**). | Essencial |
| RF16 | **Opção A (agora):** O botão de compra deve direcionar o torcedor para o **Instagram do clube (@bugu_bugu_fc)** com a intenção de compra. O WhatsApp será adicionado como segundo canal quando houver um número definido. | Essencial |
| RF16b | O **preço** da camisa deve ficar num arquivo de dados editável (não fixo no código), pois varia conforme a demanda/lote de produção. Valor inicial provisório: **R$ 100,00** (a ajustar). | Essencial |
| RF17 | **Opção B (futuro):** O sistema deve estar preparado para integrar um gateway de pagamento (ex.: Mercado Pago) para venda com pagamento online, quando o clube decidir vender de forma automatizada. | Desejável |
| RF18 | Caso a Opção B seja ativada, o pagamento **nunca** será processado pelo próprio site: será delegado ao gateway certificado. | Essencial (quando aplicável) |

### 2.6 Contato

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF19 | A forma de contato deve ser feita por **links diretos** para WhatsApp e redes sociais (Instagram do clube e do e-sports), **sem formulário** e **sem coleta de dados pessoais**. | Essencial |
| RF20 | ~~Formulário com consentimento~~ — **Removido.** Decisão do projeto: o site não coleta dados pessoais, portanto não há formulário. Isso simplifica drasticamente a conformidade com a LGPD. | — |
| RF21 | ~~Cadastro de torcedor / login~~ — **Removido.** Decisão do projeto: não há área de conta. O site é só de consulta (jogos, tabela, camisa) + contato via WhatsApp. | — |

### 2.7 Conteúdo / Notícias

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF22 | Deve existir uma seção de **notícias/destaques** na primeira versão, atualizável manualmente (semelhante à seção "Destaques" do site de exemplo). A estrutura entra agora; as notícias em si serão criadas depois pelo clube. | Importante |

---

## 3. Requisitos Não Funcionais (RNF)

### 3.1 Segurança e privacidade

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RNF01 | Segredos (chaves de API, tokens, credenciais) **nunca** devem ir para o repositório. Devem ficar em arquivo `.env`, listado no `.gitignore`. | Essencial |
| RNF02 | O site deve ser servido sob HTTPS (conexão criptografada). | Essencial |
| RNF03 | Qualquer dado pessoal coletado deve seguir a LGPD: finalidade clara, consentimento, e possibilidade de o usuário solicitar exclusão. | Essencial |
| RNF04 | Dados pessoais nunca devem trafegar em parâmetros de URL nem ser expostos publicamente. | Essencial |
| RNF05 | Formulários devem ter validação tanto no navegador quanto no servidor (quando houver servidor), para evitar dados maliciosos. | Essencial |
| RNF06 | O site deve ter um banner de cookies, caso utilize cookies não essenciais (ex.: analytics). | Importante |
| RNF07 | O processamento de pagamento, se ativado, deve ser 100% delegado a gateway certificado (PCI-DSS). O site não armazena dados de cartão. | Essencial (quando aplicável) |

### 3.2 Qualidade de código

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RNF08 | Nomes de funções e variáveis devem ser **autoexplicativos e em português** (ex.: `carregarProximosJogos`, `formatarPreco`). | Essencial |
| RNF09 | O código deve conter comentários essenciais — explicando o *porquê* de trechos não óbvios, sem poluir com comentários redundantes. | Essencial |
| RNF10 | Cada função deve ter uma única responsabilidade clara. | Importante |
| RNF11 | A estrutura de pastas deve separar claramente: dados, estilos, scripts, páginas e documentos legais. | Essencial |
| RNF12 | O conteúdo que muda (jogos, títulos, produtos) deve ser separado da estrutura visual, para facilitar a atualização manual. | Essencial |

### 3.3 Desempenho e acessibilidade

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RNF13 | As imagens devem ser otimizadas para carregar rápido. | Importante |
| RNF14 | O site deve seguir boas práticas básicas de acessibilidade (textos alternativos em imagens, contraste adequado, navegação por teclado). | Importante |
| RNF15 | O site deve funcionar nos navegadores modernos mais usados (Chrome, Firefox, Safari, Edge). | Essencial |

### 3.4 Hospedagem e custo

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RNF16 | O site deve ser hospedado em um serviço gratuito ou de baixo custo, com link/domínio real acessível ao público. | Essencial |
| RNF17 | O processo de publicação (deploy) deve ser simples e repetível. | Importante |

---

## 4. Regras de Negócio (RN)

| ID | Regra | Prioridade |
|----|-------|------------|
| RN01 | Os dados de jogos e títulos são de responsabilidade do clube e atualizados manualmente por quem administra o site. | Essencial |
| RN02 | A camisa oficial só pode ser vendida pelos canais oficiais do clube (evitar falsificação/concorrência indevida no próprio site). | Importante |
| RN03 | Imagens de jogadores, especialmente menores de idade, só podem ser publicadas com autorização (questão de imagem + LGPD). | Essencial |

---

## 5. Fora de escopo (por enquanto)

Listado aqui para deixar claro o que **não** vamos fazer agora, evitando confusão:

- Processamento de pagamento próprio (será sempre via gateway, e só no futuro).
- **Área de login / conta de usuário** (decisão definitiva: site é só de consulta).
- **Coleta de qualquer dado pessoal** (decisão definitiva: contato é via link direto).
- App mobile nativo (o site responsivo cobre o uso em celular).
- Integração automática com o Instagram (inviável de forma gratuita e confiável hoje).

---

## 6. Pendências / Decisões em aberto

Todas as decisões iniciais foram tomadas. ✅

- [x] ~~Definir o **nome oficial** do time~~ → **BUGU BUGU Futebol Clube** (@bugu_bugu_fc).
- [x] ~~Formulário que coleta dados ou só links diretos~~ → **Só links diretos, sem coleta de dados.**
- [x] ~~Quais jogos de e-sports a equipe disputa~~ → **EAFC (atual: EAFC 26).**
- [x] ~~Seção de notícias/destaques na v1~~ → **Sim, estrutura entra agora; conteúdo depois.**
- [x] ~~Canal oficial de venda~~ → **Instagram do clube (@bugu_bugu_fc) por enquanto; WhatsApp depois.**
- [x] ~~Preço e tamanhos da camisa~~ → **Tamanhos P, M, G, GG. Preço provisório R$ 100,00 (editável, varia por lote/demanda).**
- [x] ~~Texto da história do clube~~ → **Texto provisório registrado em 7.1.1 (a ajustar).**

**Pendências futuras (não bloqueiam o desenvolvimento):**
- [ ] Definir número de WhatsApp para adicionar como 2º canal de venda.
- [ ] Definir preço final da camisa conforme a demanda do lote.
- [ ] Produzir as notícias/destaques reais.
- [ ] Revisar/expandir o texto da história.

---

## 7. Anexo — Dados reais do clube (fonte: Instagram oficial)

> Transcrição fiel das imagens enviadas. **Os dados são transcritos exatamente como na fonte**, sem correções. Servirão de base para preencher os arquivos de dados do site.

### 7.1 Identidade
- **Nome:** BUGU BUGU Futebol Clube
- **Fundação:** 01/08/2023
- **Instagram (clube):** @bugu_bugu_fc
- **Instagram (e-sports):** @bugubuguesports
- **Cores:** roxo e amarelo/dourado
- **Escudo:** cervo (galhada) sobre brasão amarelo, fundo roxo

### 7.1.1 Texto da história (provisório — a ser ajustado pelo clube)
> O Bugu Bugu é um clube formado em 01/08/2023, atualmente disputando campeonatos sub-16. Temos também a parte de E-sports onde disputamos campeonatos de EAFC 26 e fomos Campeão da @gloriacup.ofc 3x e Campeão de federação 5x.

### 7.2 Títulos de e-sports (EAFC)
- Campeão da Glória Cup (@gloriacup.ofc) — **3x**
- Campeão de federação — **5x**
- *(Modalidade Society no e-sports: sem títulos no momento.)*

### 7.3 Futebol — Tabela de jogos (Campeonato Sou Boleiro Sub-16 de Society)
| Data | Rodada | Confronto | Resultado |
|------|--------|-----------|-----------|
| Sáb, 28/03/2026 | Rodada 1 | BUGU BUGU vs ONDA LARANJA | 6–6 (venceu pênaltis 2x1) |
| Sáb, 25/04/2026 | Rodada 2 | BUGU BUGU vs KSA | 1–5 (venceu pênaltis 3x2) |
| Sáb, 30/05/2026 | Rodada 3 | DESCANSO | — |
| Sáb, 27/06/2026 | Rodada 4 | BUGU BUGU vs PALMEIRAS | a jogar |
| Sáb, 25/07/2026 | Rodada 5 | BUGU BUGU vs FIFO | a jogar |
| Sáb, 29/08/2026 | Rodada 6 | BUGU BUGU vs SK SOCCER | a jogar |
| Sáb, 26/09/2026 | Rodada 7 | BUGU BUGU vs AUDAX | a jogar |

> Os dois primeiros jogos já foram realizados (fonte: posts do Instagram oficial). Ambos terminaram com vitória do Bugu Bugu na disputa de pênaltis. A exibição no site separa "Últimos jogos" de "Próximos jogos".

### 7.4 Futebol — Classificação (Liga FUT7)

**Regra de pontuação do campeonato (importante para o cálculo no site):**
- Vitória no tempo normal = **3 pontos**
- Empate no tempo normal = **1 ponto**
- Derrota = **0 pontos**
- **Ao fim de toda partida há uma disputa de pênaltis** (independente do resultado); o vencedor dos pênaltis ganha **+1 ponto** adicional.

Logo: `Pts = (Vitórias × 3) + (Empates × 1) + (Vitórias nos pênaltis × 1)`

| Pos | Clube | V | E | D | Pts de pênalti | Pts |
|-----|-------|---|---|---|--------------------------|-----|
| 1 | KSA | 2 | 0 | 0 | +1 | 7 |
| 2 | SK Soccer | 1 | 1 | 0 | +1 | 5 |
| 3 | Audax | 1 | 0 | 1 | — | 3 |
| 4 | **BUGU BUGU** | 0 | 1 | 1 | +2 | 3 |
| 5 | AGFF | 0 | 1 | 0 | +1 | 2 |
| 6 | Onda Laranja | 0 | 1 | 0 | — | 1 |
| 7 | Palmeiras | 0 | 0 | 1 | — | 0 |
| 8 | FIFO Sports | 0 | 0 | 1 | — | 0 |

> ✅ **Verificação:** todos os pontos fecham com a regra acima. A coluna "pts de pênalti" mostra quantos pontos extras cada clube somou vencendo disputas de pênaltis. Os dados da fonte oficial estão corretos.
