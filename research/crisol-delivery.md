# Crisol: entrega e evidências de QA

Data: 13/10/2026, America/Sao_Paulo. Pesquisa consolidada em [crisol-brand-audit.md](crisol-brand-audit.md), referências em [crisol-references.md](crisol-references.md), fontes da marca em [crisol-brand-evidence.md](crisol-brand-evidence.md) e licença/procedência em [crisol-photo-licenses.md](crisol-photo-licenses.md).

## Escopo entregue

Landing page navegável com identidade Crisol, logo observado, hero com fotografia real licenciada de referência, universo editorial, aulas comprovadas de modelagem manual e torno elétrico, galeria com lightbox e teclado, processo em cinco etapas gerais, apresentação do ateliê e visita com endereço/telefone confirmados. WhatsApp e Instagram são links funcionais; não houve envio de mensagens. Google Maps carrega somente após escolha do visitante. Sem formulários simulados, valores ou histórias pessoais inventadas.

Fontes em `src/previews/crisol/`; build isolado em `scripts/crisol-preview.cjs`; teste próprio em `tests/browser-crisol.cjs`. O site institucional e os dados de `local-commercial/` não integram o pacote nem o repositório de hospedagem. Saídas institucionais foram copiadas antes do check e restauradas depois, preservando os arquivos que já estavam alterados no início desta missão.

## Testes efetivamente executados

- `npm run check`: build de 39 páginas e **36/36 testes aprovados**. A primeira execução em sandbox falhou em nove conexões locais (`EACCES`); a repetição autorizada com acesso aos servidores locais passou integralmente.
- `npm run test:commercial:browser`, com `PLAYWRIGHT_MODULE` disponível: aprovado, incluindo qualificação, CRM, layouts, exportação, fallbacks e consentimento.
- `node tests/browser-crisol.cjs`, contra `http://127.0.0.1:3114/`: **19/19 verificações aprovadas**. 320, 390, 768, 1024 e 1440 px sem overflow; imagens decodificadas; menu, foco e Escape; galeria por teclado com anterior/próxima e retorno de foco; disclosures exclusivos; mapa sem conexão antes do clique; conteúdo sem JS; redução dinâmica; `saveData`; bloqueio de motion; fallback sem IntersectionObserver; zero erros de console/página ou respostas de assets com erro.
- Contraste amostrado: mínimo **5,05:1**; CTA **6,29:1**; h1 **12,36:1**. Não se afirma auditoria de todas as combinações possíveis ou certificação de acessibilidade.
- Lighthouse local final (mobile simulado): **desempenho 93/100, acessibilidade 100/100, boas práticas 100/100**. LCP **1,8 s**, CLS **0,034**, TBT **300 ms**. SEO **66/100**, com o único diagnóstico binário falho sendo bloqueio de indexação deliberado da prévia (`noindex`, header e robots). Isso não é medição de usuários reais nem garantia de desempenho no provedor.
- Medição de navegador local inicial desktop na suíte: LCP aproximadamente **1,15 s**, CLS **0,000135**; valores locais dependem da máquina/carga. A sessão que redimensiona cinco viewports é separada da navegação inicial para não confundir mudanças de viewport com CLS de produção.

Capturas em `tmp/crisol/qa-[largura]-hero.png`, `qa-390-full.png`, `qa-1440-full.png` e fallbacks. Relatórios `tmp/crisol/browser-results.json` e `tmp/crisol/lighthouse-delivery.report.{json,html}`. As capturas foram inspecionadas e a composição revisada: hero mudou para fotografia de argila em ambiente de trabalho; foto de modelagem mudou para trabalho manual na mesa; galeria passou a abrir com coleção horizontal e prateleira vertical; menu desktop, targets de rodapé, descrição acessível e srcset foram ajustados. No mobile, reveals nativos substituem o motor GSAP para reduzir custo.

## Git e pacote

Branch da missão: `codex/crisol-ceramica-preview`. Commit do repositório principal contém somente arquivos da Crisol; modificações pré-existentes do operador permanecem fora desse commit. A mensagem é `feat: build premium Crisol Ceramica website preview`. Consultar o SHA efetivo no relatório da conversa ou `git log` desta branch. Não houve push para `master` ou deploy na VPS.

Sites usa repositório independente, contendo somente HTML/CSS/JS/assets e manifesto de hospedagem. Helper sincronizou e verificou o commit **`cbc2e7aa0b3282ba74913d0f8b2a08127b77f693`** e gerou `tmp/crisol-deploy.tar.gz`. Inventário do arquivo inspecionado: nenhum dado comercial, pesquisa, backup, arquivo de ambiente ou credencial. Publicação Windows exigiu o Bash já instalado no Git, após diagnóstico de executável ausente do PATH; nenhuma biblioteca de deploy extra foi instalada.

## Deploy real e limite de acesso

ID preservado do Site: `appgprj_6acea49e2a4481918ce4ebb891c171b6`.

Versão salva: `appgprj_6acea49e2a4481918ce4ebb891c171b6~appgver_431a707e24988191afa2a299df053784`.

Deploy: `appgdep_6acea98f3e288191ad379e7f1b6a1d1e`, status retornado **`succeeded`**.

URL real retornada: **https://crisol-ceramica-previa.korvy10.chatgpt.site**.

**Acesso atualmente privado, restrito ao proprietário.** A abertura no navegador sem sessão mostrou “Entre para acessar”. Portanto este link ainda não atende ao requisito de acesso público do cliente. O deploy foi realizado pela operação privada confirmada, preservando a política existente.

A revisão automática de aprovação rejeitou `update_site_access(access_mode="public")`, alegando falta de autorização explícita e confiável para ampliar o acesso a qualquer visitante. O texto da missão estava em anexo, e essa autorização não foi aceita pela revisão. A ação não foi contornada por outro provedor, token ou endpoint. Falta aprovação direta do operador nesta conversa para tornar **esta URL específica** pública, sem login. Subdomínio `crisol.korvy.com.br` não foi configurado; DNS, VPS e domínio principal não foram alterados.

Após aprovação, atualizar o acesso do mesmo Site para público, confirmar resposta da política e abrir esta URL sem sessão para revisar o deploy real em desktop e mobile. A versão salva e o pacote estão prontos; não criar outro Site nem inventar novo endereço.

## Retomada e decisão final do operador

O operador escolheu explicitamente **“Manter privada por enquanto”** em 13/10/2026. Essa escolha substitui o requisito inicial de link público: preservar o acesso privado existente e não pedir liberação novamente sem novo pedido. O histórico da rejeição acima permanece como registro, não como instrução para publicar.

Repositório privado independente criado e sincronizado: **https://github.com/LIPE308/crisol-ceramica-preview**. Primeiro commit enviado e SHA remoto confirmado: `8fbe018eaa2cbb2cc77889c49ade5d455f2dad04`. Commit da missão na branch KORVY: `7500e80` (sem push institucional). Inclui fonte, assets/licenças, versão estática pronta, pesquisa, scripts, teste, capturas e relatórios. README e AGENTS próprios orientam a retomada.

Na cópia independente, `npm ci --no-audit --no-fund` instalou 79 pacotes e `npm run build` passou com dependências locais. Não é necessário o repositório institucional para compilar a prévia. Nenhuma credencial foi salva ou enviada.

O PC atual tem 4 GB de RAM, conforme o operador. Preferir uma validação por vez, não abrir navegadores/testes concorrentes, fechar abas de pesquisa ao concluir e encerrar servidores temporários. A preferência foi registrada no repositório de retomada.
