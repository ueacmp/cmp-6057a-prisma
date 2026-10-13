const codespaceName = process.env.CODESPACE_NAME;
const forwardingDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;

if (codespaceName && forwardingDomain) {
  const log = console.log;
  console.log = (...args) => {
    if (args.length === 1 && typeof args[0] === 'string') {
      const match = args[0].match(/^- (Local|Network):\s+(https?:\/\/\S+)\s*$/);
      if (match) {
        if (match[1] === 'Network') return;
        const url = new URL(match[2]);
        const port = url.port || (url.protocol === 'https:' ? '443' : '80');
        log.call(console, `- Codespaces:    https://${codespaceName}-${port}.${forwardingDomain}`);
        return;
      }
    }
    log.apply(console, args);
  };
}
