/* eslint-disable @typescript-eslint/no-require-imports -- This Node launcher loads Next's CommonJS CLI. */
const path = require('node:path');

if (process.env.CODESPACE_NAME && process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN) {
  const preload = path.join(__dirname, 'codespaces-url.cjs');
  // Next starts its dev server in a child process; pass the display hook to it.
  process.env.NODE_OPTIONS = `${process.env.NODE_OPTIONS || ''} --require=${JSON.stringify(preload)}`.trim();
}

const nextCli = require.resolve('next/dist/bin/next');
process.argv = [process.execPath, nextCli, 'dev', ...process.argv.slice(2)];
require(nextCli);
