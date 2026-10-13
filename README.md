# Crisol Cerâmica: prévia editorial

Projeto independente preservado para continuar em outra máquina. Inclui fontes editáveis, assets e licenças, pesquisa, build, teste de navegador e a versão estática já pronta em `site/`.

## Continuar o desenvolvimento

Requer Node.js 24, 25 ou 26 e Git. A instalação independente por `npm ci` e o build foram executados com sucesso.

```sh
git clone https://github.com/LIPE308/crisol-ceramica-preview.git
cd crisol-ceramica-preview
npm ci
npm start
```

Abra http://127.0.0.1:3113/. `npm run build` exporta para `tmp/crisol-site/dist`. O manifesto da hospedagem existente é restaurado de `src/previews/crisol/hosting.json`, sem cadastrar outro Site.

## Ver a versão pronta

`site/` contém HTML, CSS, JS e assets completos, sem precisar de build. Sirva essa pasta com um servidor HTTP estático. Ela é uma cópia da versão salva no provedor; novas alterações devem partir de `src/previews/crisol/`.

## Testar em outra máquina

Com `npm start` ativo em um terminal:

```sh
npx playwright install chromium
npm run test:browser
```

O teste usa Edge no Windows quando disponível; nos demais sistemas usa Chromium do Playwright. `BROWSER_EXE` substitui o executável, `CRISOL_URL` substitui a origem e `CRISOL_PORT` substitui a porta do servidor. Relatórios novos ficam em `tmp/crisol/`.

## Pesquisa, procedência e estado de entrega

Leia `research/crisol-brand-audit.md` e `research/crisol-delivery.md`. Fotografias são referências licenciadas de terceiros e não são fotografias da Crisol. Fontes OFL e seus textos de licença acompanham os assets. A identidade e os serviços vêm do perfil oficial e de referências cruzadas.

Capturas desktop/mobile e relatórios da rodada realizada estão em `review/`. 36 testes do repositório KORVY passaram, a suíte comercial passou e 19 verificações específicas da Crisol passaram. Lighthouse local: desempenho 93, acessibilidade 100, boas práticas 100. Estes valores não garantem desempenho de usuários reais.

Deploy real: https://crisol-ceramica-previa.korvy10.chatgpt.site . Atualmente privado por escolha explícita do operador em 13/10/2026. Não alterar a visibilidade sem novo pedido. Nenhum DNS ou deploy da KORVY foi alterado.

## Próxima ação

Preservar o acesso privado escolhido pelo operador. O código já está pronto e pode continuar sendo refinado a partir das fontes; não há pendência de autorização pública na tarefa atual. Não publicar `local-commercial`, backups, segredos ou o CRM.

Este repositório não contém dados operacionais, autenticação, credenciais de deploy ou o site institucional. Nenhuma mensagem foi enviada ao cliente. Para usar o plugin Sites em outra máquina, conectar a mesma conta e reutilizar o project_id persistido; obter uma credencial nova pela ferramenta, nunca salvar tokens no repositório.

## Máquina com 4 GB de RAM

Executar uma validação por vez. Fechar abas de pesquisa ao concluir cada consulta e encerrar servidores temporários depois do QA. Evitar Lighthouse e Playwright concorrentes. O build estático não exige manter um navegador aberto.
