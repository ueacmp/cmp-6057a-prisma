#!/usr/bin/env bash
set -euo pipefail

for ((attempt = 0; attempt < 60; attempt++)); do
  if curl --fail --silent --output /dev/null --max-time 1 http://127.0.0.1:5555; then
    exec npm run dev -- --hostname 0.0.0.0 --port 3000
  fi
  sleep 1
done

printf '%s\n' 'Prisma Studio did not become ready on port 5555. Check its terminal for errors.' >&2
exit 1
