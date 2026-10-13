# Crisol — referências de composição e interação

Inspeção em 13/10/2026. Referências externas são material de estudo, não fontes de serviços, preços, provas sociais ou identidade da Crisol. Nenhum asset, fotografia ou código dessas páginas foi reutilizado.

## Método e limites

Skills lidas: `skillui` e `computer-use`, incluindo guidance e confirmations. Navegação e screenshots por `cua_repl` no navegador in-app, usando `tab.screenshot`. Inspeção desktop aproximadamente 1265 px e viewport estreito 390 × 844. Não houve emulação de user agent de telefone. Valores de cor e fonte da Qalendula foram lidos de estilos computados do DOM renderizado, em modo somente leitura.

SkillUI 1.3.4 foi executado em modo `default`, com saída isolada em `tmp/design-references/crisol`, sem empacotamento de skill e sem modo ultra. A extração direta das URLs Qalendula e Lelek produziu zero tokens; o CLI informou ausência de Playwright e pulou estilos computados. Os arquivos gerados nessas tentativas contêm recomendações padrão, que **não são observações das páginas**. Para obter um artefato útil, registramos valores observados no DOM da Qalendula em um CSS de anotação escrito para esta pesquisa e passamos esse diretório pelo mesmo CLI estático. A extração resultante reconheceu três cores; fontes e demais valores estão no registro de observação original. Os papéis de cor, grid de 4 px e raio de 8 px sugeridos automaticamente pelo CLI não foram validados e não devem ser copiados.

Artefatos: `tmp/design-references/crisol/qalendula-observed/tokens.css` e `tmp/design-references/crisol/qalendula-observed-design/DESIGN.md`. Esses tokens pertencem à referência, não à Crisol.

## 1. Qalendula — escola, ateliê e loja

Fonte primária: https://loja.qalendula.com/

**Observado:** cabeçalho lavanda, logo à esquerda, navegação horizontal, pesquisa e ícones de conta/carrinho. Hero em carrossel ocupa toda a largura. Um slide contrasta fundo oliva, headline serifada creme à esquerda e selo circular desenhado à direita; outro usa fundo amarelo quente, título lavanda, formas geométricas laterais e quatro fotos em faixa. A narrativa muda de sensação para oferta: hero → escolha da experiência → três caminhos com fotos grandes → workshop → blocos alternados de imagem e texto → apresentação do espaço → provas sociais → rodapé de contato. As cards são planas, com imagens retangulares e filetes discretos, sem pilha de cartões arredondados. CTA persistente de WhatsApp no canto inferior direito.

**Valores observados no DOM:** header `#c2a2ea`, texto do header `#faf1dc`, corpo preto sobre branco, WhatsApp `#4dc247`. Navegação e parágrafos usam Roboto Mono em 12 px; títulos de seção usam DM Sans em 28 px; títulos de cards em 16 px. A headline serifada vista no slide faz parte de composição visual do banner e não foi identificada como fonte DOM. Não atribuir nome de fonte à headline sem prova.

**Hierarquia e conversão:** separa aula experimental, torno e workshops por interesse, antes de exigir cadastro ou pagamento. Isso pode inspirar caminhos claros de interesse da Crisol somente após comprovar seus serviços.

**Motion observado:** slides diferentes apareceram entre observações sem clique no carrossel; há setas e indicadores. Não foi medido easing, duração ou comportamento de reduced motion. Não assumir que animações reveladas por rolagem existem.

**Mobile observado:** no viewport estreito a navegação vira ícones de busca/conta/carrinho e hamburger. O banner se recompõe com headline, texto, CTA e mosaico de quatro fotos. O menu aberto ocupa a tela inteira branca com links espaçados verticalmente e subnível de Produtos. A barra de cookies permanece no rodapé. Esse é um exemplo útil de recomposição, não apenas redução da versão desktop.

**Performance:** alguns blocos de imagem fora da dobra apareceram como placeholders na captura de página inteira sem rolagem prévia. Isso é compatível com carregamento sob demanda, mas não prova erro de imagem nem implementação específica. Sem medições Lighthouse, rede, bytes ou Core Web Vitals.

**Princípio transferível:** tornar o gesto da cerâmica e a escolha de experiência visíveis; usar imagens grandes em planos simples, com respiro e CTA perto do contexto. Não transferir lavanda, selo, composição geométrica ou textos.

## 2. Vida Feita à Mão — presença física e convite

Fonte primária: https://www.vidafeitaamao.com.br/

**Observado:** grande cabeçalho branco com logo preto central, ícones sociais no alto à esquerda e menu horizontal central abaixo. Hero dominado por foto real do ateliê: luz natural, plantas, bancadas, peças e pessoa trabalhando. CTA terracota sobre a borda inferior da foto. A estrutura textual do DOM mostra aulas, cursos regulares, eventos, história e bloco final de localização/horários/contato.

**Hierarquia:** identidade e espaço real vêm antes do argumento comercial. O convite é direto e humano. O DOM disponibilizou um h1 sem texto legível; não copiar essa falha de semântica. A prévia precisa de h1 real que comunique o que é a Crisol.

**Menu:** quatro entradas principais; Aulas regulares apresenta subnível expansível. Evitar uma árvore de navegação extensa em uma landing page curta.

**Motion observado:** existem controles de produto anterior/próximo para listas. Não foi confirmado autoplay ou animação de scroll. Não foram medidas transições.

**Viewport estreito observado:** houve recorte lateral e rolagem horizontal, com logo/menu parcialmente fora da tela. Como não foi usado user agent mobile, isso não prova o comportamento da versão Wix servida a telefones. É um alerta para testar a Crisol tanto por viewport quanto, se possível, em dispositivo real; não aceitar captura estreita recortada como QA aprovado.

**Performance:** site se identifica no rodapé como Wix. Não houve auditoria de rede ou execução. A presença de sliders e plataforma não permite afirmar lentidão. Imagem de hero exige otimização, dimensões estáveis e fallback na implementação própria.

**Princípio transferível:** imagem honesta do espaço/gesto transmite proximidade melhor que métricas genéricas. Usar foto pública verificável da Crisol se disponível e adequada; caso contrário, uma visualização claramente ilustrativa sem fingir ser a sede ou turma real.

## 3. OOAK Creation — editorial de objetos

Fonte primária: https://www.ooakcreation.com/

**Observado:** fundo branco quente, faixa preta fina para anúncio, marca pequena central e menu em linha. Hero apresenta fotografia grande, contida por margens laterais, sem card, sombra ou botão gigante sobre a peça. Tipografia leve e espaçada acompanha, abaixo da imagem, uma proposição curta e autoria. A página inteira alterna coleção em grade 3 × 3, história do processo, colaboração para mesa, newsletter e bloco de eventos em fundo cinza quente. Filetes horizontais curtos criam pausas entre assuntos. A fotografia usa luz lateral, madeira, fundos neutros e textura de esmalte visível.

**Hierarquia:** qualidade do objeto e narrativa do fazer sustentam a apresentação. Os CTAs são discretos e localizados após o texto pertinente. A coleção é vista antes da história longa, mantendo o interesse visual.

**Menu observado:** dez entradas no desktop e submenus em shop/collections. É adequado ao catálogo existente da referência, mas excessivo para a prévia curta da Crisol.

**Motion observado:** slideshow com indicador 1/9 e depois 2/9 sem clique, além de faixa superior cujo anúncio mudou entre observações. Não foi medido tempo, easing, pausa no hover, acessibilidade de controles ou reduced motion.

**Viewport estreito observado:** conteúdo desktop permaneceu largo e recortado; banner de cookies se adaptou à largura. A mesma limitação de user agent se aplica: não concluir falha do site em telefone real. Não usar esse estado como modelo responsivo.

**Performance:** fotografia e galeria dominam; capturas não revelam custo em bytes. É inferência de implementação que imagens responsivas, lazy loading abaixo da dobra e primeiro hero com prioridade adequada reduziriam custo. Isso deve ser medido na prévia, não anunciado como resultado das referências.

**Princípio transferível:** deixar a materialidade liderar; composição editorial com margens, poucas palavras, filetes e planos simples pode elevar a percepção sem efeitos excessivos. Não copiar fotografias, afirmações de colaboração, nome da coleção ou linguagem de autoria.

## Direção proposta para a Crisol

Combinar o convite acessível da escola brasileira com a leitura editorial do objeto: um hero com título em HTML, espaço de imagem de argila/gesto ou peça claramente documentado, CTA principal curto e uma informação local confirmada; depois uma seleção de experiências **apenas se comprovadas**, seção de processo e contato contextual. A identidade deve vir da Crisol, nunca da KORVY ou das referências.

Se faltarem provas da oferta, a composição pode falar de cerâmica artesanal e abrir uma conversa sem inventar calendário, cursos, preços, avaliações, fundadores ou resultados. Imagens geradas devem receber identificação de ilustração conceitual. Proposta de motion: uma entrada breve de título e imagem, revelações discretas por seção e estados de hover/foco; sem carrossel automático necessário, sem scroll sequestrado e sem animações contínuas que distraiam da materialidade. Isso é decisão de projeto proposta, não comportamento copiado ou já implementado.

Requisitos próprios de QA: reflow real em 390 px e desktop, zero overflow horizontal, menu operável por teclado/Escape, foco visível, targets confortáveis, contraste medido, conteúdo acessível sem JS/motion, `prefers-reduced-motion`, largura/altura explícitas dos assets e medições de carregamento. As referências fornecem princípios, não certificação de qualidade ou desempenho.

## Referência adicional não adotada

https://www.lelekstudio.com/ apareceu em pesquisa com contexto de estúdio cerâmico em Berlim, mas a navegação no navegador expirou e não foi possível verificar a página visualmente. A tentativa SkillUI também produziu zero tokens. Não conta entre as três referências inspecionadas e nenhuma decisão de composição se baseia nela.
