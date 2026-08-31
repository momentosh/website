# Política de privacidade

Atualizada em 24 de agosto de 2026.

O Momento é a plataforma de acompanhamento do programa de mentoria Momento. O acesso é
por convite: cada pessoa entra como mentora, mentorada ou parte da equipe do programa.
Esta política descreve que dados o Momento guarda, por quê, e como você tira os seus de lá.

## Que dados o Momento guarda

**Da sua conta.** Nome, e-mail e, se você enviar, foto de perfil. O e-mail é como o convite
chega e como você entra.

**Do programa.** Seu par de mentoria, as sessões do ciclo, o que ficou combinado em cada
conversa e as notas que mentor e mentorada escrevem. Nota marcada como privada é visível só
para quem a escreveu.

**Do Google, se você conectar sua conta.** O e-mail da conta Google que consentiu, para a
tela poder dizer conectado como quem, e as credenciais que permitem ao Momento criar e
editar os eventos que ele mesmo cria na sua agenda.

O Momento **não** lê sua agenda. O escopo pedido é `calendar.events`, que é o menor que faz
o trabalho: dá para criar e editar evento, e não dá para listar nem apagar o que já estava
lá.

## Para que os dados são usados

Para mostrar seu ciclo de mentoria a você e ao seu par, avisar por e-mail quando um
pareamento é criado, e — se você conectar o Google — colocar os encontros na sua agenda com
sala do Meet e convite para a outra pessoa.

Nada mais. Não há publicidade no Momento, seus dados não são vendidos nem alugados, e não
existe perfilamento para terceiros.

## Uso limitado dos dados do Google

O uso e a transferência, pelo Momento, de informações recebidas das APIs do Google seguem a
[Política de Dados do Usuário dos Serviços de API do Google](https://developers.google.com/terms/api-services-user-data-policy),
incluindo os requisitos de Uso Limitado.

Na prática, e para não deixar dúvida:

- os dados do Google são usados apenas para criar e manter os eventos de mentoria na sua
  agenda, dentro de uma ação sua;
- não são transferidos para terceiros, exceto o necessário para operar o serviço, por
  exigência legal ou com o seu consentimento;
- não são usados para publicidade;
- **não são usados para treinar modelos de inteligência artificial**, nossos ou de
  terceiros;
- nenhuma pessoa lê esses dados, salvo com o seu consentimento explícito, para suporte que
  você pediu, ou por obrigação legal.

## Onde os dados ficam

Em um banco Postgres gerenciado pelo Supabase, em região do Brasil. O acesso é isolado por
linha: o banco só entrega a você o que é seu ou do seu par — a regra é do banco, não de uma
checagem na tela.

As credenciais da sua conta Google ficam **cifradas em repouso**, em AES-256-GCM, com chave
que existe só no ambiente do aplicativo. Elas nunca aparecem em tela, em log, nem em
resposta de API.

O evento no seu calendário é criado **dentro de uma requisição sua, com a sua credencial**.
Não existe caminho em que a credencial de uma pessoa escreva na agenda de outra.

## Como remover

**Só o Google:** no Momento, em Meu perfil, use *Desconectar*. A autorização é revogada no
Google e as credenciais guardadas são apagadas na hora. Os eventos que já estão na sua
agenda continuam lá; apague-os pelo Google Calendar se quiser.

Você também pode revogar em
[myaccount.google.com/permissions](https://myaccount.google.com/permissions), sem passar
pelo Momento.

**A conta inteira:** peça pelo e-mail abaixo. A conta, as notas escritas por você e o
histórico do seu ciclo são apagados. O que a outra pessoa do par escreveu continua sendo
dela.

## E-mail

Convites e links de acesso saem por e-mail (Resend), e o convite de calendário sai pelo
Google quando o encontro é criado na agenda. O Momento não manda mala direta.

## Contato

equipe.momento.sh@gmail.com
