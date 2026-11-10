---
title: Como o Momento decide quem mentora quem
description: Por dentro do algoritmo que transforma interesses, preferências e escolhas do formulário em pareamentos — a nota de cada par, o modelo de otimização e o que ele não faz.
date: 2026-11-10
author: Equipe Momento
---

Todo ciclo começa com a mesma pergunta: quem conversa com quem? Dezenas de mentores, cada
um com uma área, uma trajetória e um limite de mentorados, e centenas de pessoas querendo
entrar. Feito à mão, esse pareamento vira uma planilha enorme e uma decisão que ninguém
consegue explicar depois — por que a Ana ficou com o João e não com a Maria?

Para resolver isso, construímos um modelo de otimização — e as decisões de produto ficam
embutidas nele.

## O problema não é escolher um par. É escolher todos.

Imagine 30 mentores e 50 mentorados, com cada mentor atendendo de uma a três pessoas. O
número de pareamentos possíveis é gigantesco, mas o problema não é o tamanho: as escolhas
competem entre si.

Se você pegar o mentorado com a melhor combinação e der a ele o mentor dos sonhos, pode
ter tirado esse mentor de alguém que só tinha aquela opção boa. A escolha individualmente
perfeita pode ser a pior para o grupo. É esse tipo de decisão que a intuição não resolve —
e a matemática resolve bem.

## Do formulário ao número

O ponto de partida é o formulário de inscrição, lido direto de planilhas do Google ou de
CSV. Antes de qualquer cálculo, os dados passam por três etapas:

- **Mapeamento de colunas**: o formulário muda de ciclo para ciclo, então o sistema traduz
  os nomes das colunas para os que o modelo espera, sem tocar no código.
- **Combinação de colunas**: quando a mesma informação está espalhada em duas perguntas
  (duas colunas de carreira, por exemplo), elas são juntadas antes do mapeamento.
- **Validação**: colunas obrigatórias, IDs duplicados, interesses e carreiras fora do
  previsto. O que passa disso é avisado, não escondido.

O que sai daí, para cada pessoa: interesses, caminhos de carreira que quer explorar,
preferências sobre quem a mentora, o nome de um mentor específico se houver — e, no caso
dos mentores, quantas pessoas aceita atender.

## A nota de compatibilidade

Para cada par possível, o modelo calcula uma nota entre 0 e 1: a soma ponderada de quatro
sinais — **mentor preferido (50%)**, **preferências (30%)**, **interesses (10%)** e
**carreira (10%)**. O que cada um mede:

### Mentor preferido

Vale 1 se o nome escrito pelo mentorado é o do mentor, 0 se não é. A comparação ignora
maiúsculas e aceita nome parcial, para dar conta de quem escreveu só o primeiro nome ou
esqueceu um sobrenome.

Com metade do peso total, a escolha direta é o sinal mais forte. Ela não é absoluta: se
aquele mentor não tem vaga, ou se outro mentorado depende dele para não ficar sem ninguém,
a otimização pode alocar diferente. O peso grande diz que a preferência quase sempre
ganha — não que ganha sempre.

### Preferências

O mentorado marca quais aspectos importam — gênero, mesma universidade, mesmo curso. A
nota é a fração dessas preferências que o mentor satisfaz. Quem marca uma e é atendido
tira 1; quem marca duas e é atendido em uma tira 0,5. Quem não marca nada recebe 0 nesse
critério, e ele simplesmente não pesa na decisão.

### Interesses

Cada área de interesse tem um peso próprio, o que faz diferença quando mentor e mentorado
compartilham mais de uma área. O modelo soma os pesos das áreas em comum, divide pelo
total de interesses do mentorado e limita o resultado a 1. Compartilhar uma área de peso
maior conta mais.

### Carreira

O mentorado pode marcar mais de um caminho — startup, big tech, empreendedorismo,
pesquisa. A nota é a fatia desses caminhos em que o mentor tem experiência. Se o mentorado
quer startup e pesquisa e o mentor só tem startup, a nota é 0,5. Um mentor com trajetória
variada tende a se sair melhor, porque cobre mais do que a pessoa quer explorar.

### Um exemplo

Uma mentorada de Ciência da Computação da UFPE marcou interesses em **Backend** e
**Ciência de Dados**, quer explorar **startup** e pediu alguém **da mesma universidade**.
Dois mentores disputam a vaga dela:

- **Mentor A** — interesses em Backend e Pesquisa Operacional, experiência em startup, da
  mesma universidade. Interesse 1,00, carreira 1,00, preferência 1,00. **Nota final: 0,50.**
- **Mentor B** — interesse em Ciência de Dados, experiência em big tech, de outra
  universidade. Interesse 0,80, carreira 0,00, preferência 0,00. **Nota final: 0,08.**

Se a mentorada tivesse escrito o nome do Mentor B no formulário, ele somaria mais 0,5 e
passaria à frente (0,58). É assim que a preferência direta funciona na prática.

## O grupo inteiro, não cada par

Com todas as notas calculadas, o problema vira uma **programação linear inteira**. Cada
par possível tem uma variável de decisão: 1 se for pareado, 0 se não. O objetivo é
maximizar a soma das notas de todos os pareamentos:

```
maximizar   Σ b(i,j) · x(i,j)

sujeito a
  Σ x(i,j) = 1          para cada mentorado j
  Σ x(i,j) ≤ capacidade  para cada mentor i
  x(i,j) ∈ {0, 1}
```

As duas primeiras restrições são o coração do modelo. A primeira diz que **cada mentorado
tem exatamente um mentor** — não é um bônus a alcançar, é uma regra. Se não houver vaga
para todo mundo, o modelo não devolve uma lista com gente de fora: fica inviável, e o time
precisa agir (aumentar capacidade, abrir mais vagas) antes de rodar de novo. A segunda
impede que um mentor receba mais gente do que se dispôs a atender.

Há ainda uma restrição opcional: todos os mentores precisam ter pelo menos um mentorado.
Ela garante que ninguém fique de fora do programa, e é desligada automaticamente quando há
menos mentorados do que mentores — caso em que a exigência seria impossível.

> O que o solver entrega não é o melhor mentor para cada pessoa. É a melhor combinação de
> todos os pares ao mesmo tempo. Às vezes alguém não fica com a primeira opção para que
> duas ou três outras pessoas fiquem com uma opção muito melhor.

## Quem resolve

O modelo é resolvido pelo **HiGHS**, um solver open source de otimização. Num cenário de
teste, 50 mentores e 75 mentorados geram 3.750 variáveis binárias — e a solução ótima saiu
em cerca de 0,05 segundo. Não é força bruta: o solver prova que não existe combinação
melhor para o modelo dado.

A frase tem uma parte importante escondida: **para o modelo dado**. O ótimo é ótimo em
relação às notas e restrições que definimos. A matemática não decide se mentor preferido
vale mais que interesses; essa é uma decisão de produto, tomada por gente e revisada a cada
ciclo.

## O que o algoritmo não faz

Vale ser explícito sobre os limites:

- **Não mede química.** O que entra é o que a pessoa escreveu no formulário. Duas pessoas
  com nota alta podem não se dar bem; duas com nota média podem construir uma relação
  excelente.
- **Não lê texto livre.** Respostas abertas, se existirem, ficam para quem lê a inscrição —
  não entram no cálculo.
- **Não padroniza tudo.** Nomes de universidade e de curso ainda dependem de escrita
  consistente entre as pessoas. É um ponto conhecido de melhoria.
- **Pode ter mais de uma solução ótima.** Quando duas combinações empatam, o solver escolhe
  uma. Diferenças pequenas de nota entre pareamentos não devem ser lidas como veredito.
- **Não aprende com as sessões.** O que acontece nas conversas ainda não volta para o
  modelo. Esse é o próximo passo natural.

## Um resultado que dá para auditar

A saída é uma tabela com cada pareamento, a nota daquele par e quantas vagas cada mentor
usou. Em cima dela, o time acompanha benefício médio, mínimo e máximo, e quantos mentores
foram utilizados. Nos testes com dados sintéticos em escala realista, todos os mentorados
foram pareados, o benefício médio ficou em torno de 83% e nenhum mentor passou do próprio
limite.

Mais importante que os números é o que eles permitem: discutir uma alocação com dados na
mão, ajustar um peso e rodar de novo, e explicar para qualquer pessoa por que aquele par
aconteceu. Foi essa troca — de "achismo" documentado em planilha para uma decisão
reprodutível — que motivou o projeto.

## Aberto, de propósito

O código do algoritmo é open source e vive em
[github.com/momentosh/algo-mentoria](https://github.com/momentosh/algo-mentoria). Os pesos,
as capacidades e o mapeamento das colunas ficam num arquivo de configuração; o modelo é
testado com dados sintéticos antes de cada ciclo.

Se você quer entender o cálculo por dentro, sugerir um critério novo ou apontar onde a
modelagem erra, o repositório está aberto para isso. A pergunta "quem mentora quem" é
humana demais para ficar escondida numa caixa-preta.
