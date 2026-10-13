# Crisol: prévia conceitual

Fonte isolada em HTML, CSS e JavaScript; stack Node/Express existente e GSAP empacotado com esbuild. Nenhuma rota institucional ou operação do CRM é alterada.

```powershell
node scripts/crisol-preview.cjs
node scripts/crisol-preview.cjs --serve
$env:PLAYWRIGHT_MODULE='C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'
node tests/browser-crisol.cjs
```

O build escreve `tmp/crisol-site/dist`, com assets em allowlist, e restaura a identidade em `tmp/crisol-site/.openai/hosting.json` caso ainda não exista. A pasta é independente de `public/` e não contém dados operacionais, pesquisa ou credenciais. `CRISOL_ORIGIN` permite substituir o endereço de Open Graph. `CRISOL_PORT` muda a porta local, padrão 3113. A identidade Sites é preservada no arquivo fonte `hosting.json`; não registrar outro Site para a mesma prévia nem substituir um manifesto de outra empresa.

Fotografias licenciadas de terceiros são identificadas como referências. O acervo real permanece no inventário interno até autorização. Logo oficial em baixa resolução é usado exclusivamente para identificação nesta proposta solicitada de apresentação; fonte e limite registrados na auditoria. Substituir por arquivo autorizado de alta resolução na versão final.

Sem rastreamento, formulários de envio, biblioteca 3D ou mensagens automáticas. O mapa só conecta ao Google depois do clique em carregar. Contatos abrem canais externos para ação do visitante. Prévia usa `noindex`, `nofollow` e robots bloqueado para evitar disputar SEO da futura presença oficial.
