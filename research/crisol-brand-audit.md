# Crisol Cerâmica: auditoria e direção da prévia

Pesquisa e briefing em **13/10/2026, America/Sao_Paulo**. Solicitação do operador: criar, testar, fazer commit e publicar uma prévia pública solicitada pelo cliente. Nenhuma mensagem enviada. O trabalho fica isolado do site institucional e dos dados comerciais privados.

## Identificação, fontes e condição comercial

**Instagram confirmado:** [@crisol_ceramica](https://www.instagram.com/crisol_ceramica/). Nome exibido: Crisol: Alquimia e Cerâmica. A bio foi lida e o perfil e suas imagens foram inspecionados no navegador. O link da bio conduz à [ficha do ateliê no Google Maps](https://maps.app.goo.gl/mrb1Uxv3EHemJJsJ6), com endereço e telefone compatíveis com o [diretório Fornos do Brasil](https://cesarabarbosa.github.io/fornosdobrasil/).

**Ausência de site próprio explicitamente confirmada.** Em resposta à pergunta de qualificação, o operador informou nesta conversa: “sim, confirmou hj mais cedo”. Data: 13/10/2026. Fonte/contexto: declaração da empresa repassada pelo operador. Não foi informado o canal da conversa com a empresa. A pesquisa pública, a ausência de link em diretório e o botão “Adicionar website” do Maps não foram tratados como prova.

O pedido do cliente para avaliar uma prévia e a autorização de publicação externa foram fornecidos na missão do operador. A autorização é para esta prévia isolada, não para alterar a produção, DNS, domínio principal ou enviar mensagens.

| Informação | Situação / uso |
| --- | --- |
| Crisol: Alquimia e Cerâmica | Confirmado no perfil oficial |
| Escola e ateliê em Curitiba | Confirmado no perfil e ficha Maps |
| Rua Barão de Guaraúna, 374, Alto da Glória, Curitiba, PR | Confirmado pela ficha acessada pelo link da bio |
| (41) 99539-2538 | Confirmado na ficha e diretório; WhatsApp fornecido pelo operador na missão |
| Aulas de modelagem manual e torno elétrico | Divulgadas na bio oficial; incluídas sem valores, duração ou disponibilidade inventados |
| Venda de peças | Divulgada na bio; encaminhamento ao acervo real no Instagram, sem catálogo/estoque fictício |
| CNPJ 36.266.677/0001-13, razão social, abertura | Apenas [Loqal](https://loqal.com.br/profissional/escola-de-ceramica-e-atelie-crisol-alto-da-gloria-31081), fonte secundária; omitidos da página |
| Horários, preços, vagas, cursos recorrentes, história nominal dos responsáveis | Não confirmados; omitidos |
| Avaliações | Ficha exibia 5,0 e 24 avaliações na consulta; sem depoimentos, nota ou schema de avaliações na prévia |

Detalhes, links de posts, divergências de diretórios e inventário de mídias públicas estão em [crisol-brand-evidence.md](crisol-brand-evidence.md). Ofertas históricas e nomes de destaques não foram convertidos em modalidades atuais.

## Identidade observada e proposta

O logo real é **serifado**, com vaso e raios solares creme sobre fundo terracota. A hipótese de lettering manuscrito da missão não corresponde ao avatar encontrado. Artes do perfil usam também creme, ocre e verde sálvia. Não foi localizado manual de marca, fonte original ou paleta oficial em hexadecimais.

Direção: uma apresentação editorial de matéria, gesto e convivência. Hero com duas linhas, fotografia em enquadramento inspirado na forma de um vaso, margem ampla, convite direto às aulas. Seções usam famílias distintas: composição editorial assimétrica, experiências horizontais, galeria de escalas diferentes, processo em disclosures nativos, apresentação tipográfica e contato com mapa sob escolha do visitante. Sem depoimentos, contadores, carrossel automático, cards SaaS ou efeitos de agência.

- **DESIGN_VARIANCE 7 / MOTION_INTENSITY 5 / VISUAL_DENSITY 3.** Assimetria com recomposição de coluna única abaixo de 768 px; movimento curto com propósito; leitura arejada.
- Tokens propostos: marfim `#F3EEE5`, areia `#EAE1D3`, marrom `#342820`, texto secundário `#6C5A4D`, terracota de contraste `#8B4932`. São aproximações da identidade e da paleta sugerida pelo operador, não cores oficiais certificadas.
- Cormorant Garamond 500 (SIL OFL), escolhido pela ligação com as serifas do logo e composição editorial; Plus Jakarta Sans (SIL OFL) para leitura. Fontes locais com `font-display:swap`; não dependem de Google Fonts.
- Tema claro fixo, como apresentação editorial em papel, coerente com o marfim explicitamente solicitado. O esquema escuro do sistema não inverte seções. Contraste e estabilidade são verificados no QA.
- Fotos de arquivo em retângulos; enquadramento do hero curvo com propósito de forma cerâmica; controles de contato arredondados. Camadas restritas ao skip link e diálogo nativo.
- Textos de apresentação são propostas criativas e identificados como tal. Não são citações oficiais.

## Fotografias, logo e limites

O acervo público da Crisol foi inventariado e inspecionado, mas **não foi localizada licença de republicação**. Retratos, anúncios, fotografias de alunos e peças da empresa permanecem em `tmp/crisol-brand-assets/`, fora do pacote publicado. Não se afirma que público equivale a autorizado.

A prévia usa fotografias reais de terceiros com licença livre verificada e identificação de referência na imagem principal, nas aulas, na galeria, nos textos alternativos, no lightbox e no rodapé. Elas não representam o ambiente, equipe, alunos, catálogo ou resultados da Crisol. A versão final deve receber o acervo autorizado do cliente. Autores, origem, processamento e licença estão em [crisol-photo-licenses.md](crisol-photo-licenses.md).

O avatar original (150 × 150) é usado em tamanho pequeno exclusivamente para identificação da empresa na proposta solicitada pelo operador e pelo cliente. Não há licença livre declarada; o uso não é apresentado como cessão de marca ou acervo. Fonte: perfil oficial. Solicitar arquivo original autorizado em alta resolução para a versão contratada. Nenhum símbolo foi inventado ou vendido como logo original.

Não houve geração de imagens por IA nem reconstrução 3D. Não há produto específico cuja reconstrução seja necessária. `imagegen` e `img2threejs` estão disponíveis, mas fotografia licenciada atende melhor este projeto; não foram forçados no fluxo.

## Referências e engenharia reversa

Três experiências foram inspecionadas visualmente: [Qalendula](https://loja.qalendula.com/), [Vida Feita à Mão](https://www.vidafeitaamao.com.br/) e [OOAK Creation](https://www.ooakcreation.com/). Registro em [crisol-references.md](crisol-references.md), com composição, hero, menus, mobile e limitações de observação.

Princípios adotados: escolha de experiência perto do contexto; fotografia ampla e planos simples; narrativa da materialidade; convite humano e localização acessível. Não foram copiados layout integral, fotos, textos, marca ou código proprietário. SkillUI estático foi aplicado; extrações diretas não capturaram tokens e a anotação de valores efetivamente observados foi separada das sugestões automáticas. Não foi utilizado repositório externo de engenharia reversa.

Skills aplicadas: design-taste-frontend, skillui, motion-design, gsap-core, gsap-scrolltrigger, gsap-performance, computer-use e Sites. Dois agentes de pesquisa e um de assets realizaram tarefas delimitadas; o agente principal cuidou da fonte e publicação. Um agente também escreveu a suíte de navegador própria.

## Implementação, motion e oportunidade comercial

Stack existente preservada: HTML/CSS/JavaScript, Express local, esbuild e GSAP já instalado. Fonte em `src/previews/crisol/`; build separado em `scripts/crisol-preview.cjs`. O build inclui apenas assets em allowlist e não lê `local-commercial/`. Exportação e checkout de hospedagem ficam em `tmp/crisol-site/`, ignorados pelo Git principal.

GSAP entra como melhoria progressiva sob demanda: entrada breve estabelece hierarquia, reveals orientam leitura e parallax de poucos pixels no desktop sugere profundidade. Apenas opacity/transform, sem pinning, scroll sequestrado, rAF permanente, Three.js ou Lenis. No mobile, IntersectionObserver e animações nativas curtas substituem o motor de desktop. Movimento reduzido e saveData evitam download; alterações da preferência revertem animações; falha de import mantém conteúdo visível.

Galeria abre em `dialog` nativo com anterior/próxima, teclado, Escape e retorno do foco. Sem JS, links abrem as imagens e os details continuam funcionais. Menu mobile com estado e fechamento por Escape/âncora. Todos os contatos usam dados confirmados; WhatsApp apenas abre conversa para ação do visitante. Sem envio automático ou formulário simulado. Mapa só carrega após clique; sem analytics ou rastreamento.

Oportunidade: reunir o que hoje está disperso em redes, dar caminho claro para aulas e peças, tornar o local encontrável e oferecer uma presença coerente com a marca. Sem prometer métricas, vendas, hospedagem permanente gratuita ou resultados comerciais.

Metadados e Open Graph são definidos. Por se tratar de prévia conceitual, `noindex,nofollow` e robots bloqueado evitam competir com a presença oficial futura. Não há schema de avaliações ou endereço/organização apresentado como nova presença oficial certificada.

## QA e publicação

Resultados verificáveis, capturas, commit e URL retornada pelo provedor serão registrados em [crisol-delivery.md](crisol-delivery.md). O deploy é isolado; `master`, VPS e DNS institucional não são alterados. O manifesto da hospedagem registra o ID real retornado pelo Sites; não se presume que o endereço seja público antes de confirmar o deploy e o acesso sem login.
