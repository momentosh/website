#!/usr/bin/env bash
# Publica a main em produção disparando o deploy hook da Vercel.
#
# Por que isso existe: a Vercel bloqueia deployments cujo commit foi escrito por
# quem não tem permissão de deployar no projeto. Como os merges herdam o autor do
# PR, o push não publica nada. O deploy hook não passa por essa checagem, então
# quem publica é quem roda este script.
#
# A URL do hook é um segredo sem autenticação — quem a tiver publica em produção.
# Por isso ela não está aqui: é buscada na hora pela CLI, que usa a sua sessão.
#
# Uso: ./scripts/deploy.sh [-y]

set -euo pipefail

PROJETO="website-correto"
ESCOPO="matheusmrno"
REPO="momentosh/website"
BRANCH="main"

auto_sim=false
[[ "${1:-}" == "-y" ]] && auto_sim=true

for cmd in vercel gh curl python3; do
  command -v "$cmd" >/dev/null || { echo "erro: '$cmd' não encontrado no PATH" >&2; exit 1; }
done

json_campo() { python3 -c 'import json,sys,re;t=sys.stdin.read();print(eval(sys.argv[1],{"d":json.loads(re.search(r"\{.*\}",t,re.S).group(0))}))' "$1"; }

echo "→ conferindo estado de $REPO"

ponta=$(gh api "repos/$REPO/commits/$BRANCH" --jq '.sha')

no_ar=$(vercel ls "$PROJETO" --scope "$ESCOPO" --environment production --json --limit 20 2>/dev/null \
  | python3 -c '
import json,sys
d=json.load(sys.stdin)
for x in d.get("deployments",[]):
    if x.get("state") == "READY":
        print((x.get("meta") or {}).get("githubCommitSha","")); break
')

if [[ "$ponta" == "$no_ar" ]]; then
  echo "  produção já está em ${ponta:0:7}. Nada a publicar."
  exit 0
fi

echo "  no ar : ${no_ar:0:7}"
echo "  $BRANCH  : ${ponta:0:7}"
echo
echo "→ entra nesta publicação:"
git fetch origin --quiet 2>/dev/null || true
if git cat-file -e "$no_ar" 2>/dev/null; then
  git log --oneline "$no_ar..$ponta"
else
  echo "  (commit no ar não existe localmente; rode 'git fetch' para ver o intervalo)"
fi
echo

if ! $auto_sim; then
  read -r -p "publicar em produção? [s/N] " resposta
  [[ "$resposta" == "s" || "$resposta" == "S" ]] || { echo "cancelado."; exit 0; }
fi

echo "→ buscando o deploy hook"
hook=$(vercel deploy-hooks ls --project "$PROJETO" --scope "$ESCOPO" --format json 2>/dev/null \
  | json_campo 'd["hooks"][0]["url"]')
[[ -n "$hook" ]] || { echo "erro: nenhum deploy hook em $PROJETO. Crie com: vercel deploy-hooks create destrava-main --ref $BRANCH --project $PROJETO --scope $ESCOPO" >&2; exit 1; }

echo "→ disparando"
curl -sf -X POST "$hook" >/dev/null || { echo "erro: o hook não respondeu" >&2; exit 1; }

echo "→ aguardando o build"
for _ in $(seq 1 60); do
  sleep 5
  estado=$(vercel ls "$PROJETO" --scope "$ESCOPO" --environment production --json --limit 1 2>/dev/null \
    | python3 -c 'import json,sys;print(json.load(sys.stdin)["deployments"][0]["state"])' 2>/dev/null || echo "")
  case "$estado" in
    READY) break ;;
    ERROR|CANCELED) echo "falhou: deployment terminou em $estado" >&2; exit 1 ;;
    BLOCKED) echo "falhou: BLOCKED — o hook não contornou a permissão" >&2; exit 1 ;;
  esac
  printf '.'
done
echo

if [[ "${estado:-}" != "READY" ]]; then
  echo "tempo esgotado esperando o build; confira em: vercel ls $PROJETO --scope $ESCOPO" >&2
  exit 1
fi

status_main=$(gh api "repos/$REPO/commits/$BRANCH/status" --jq '.state')
echo
echo "publicado. ${ponta:0:7} está no ar (commit status do $BRANCH: $status_main)"
