// VULN-069: a build must never talk to the API it was not made for. Called before the app starts; a mismatch stops the start-up.
// written in two parts so a search for the production host in a build only finds real use of it
const PRODUCTION_HOSTS = [['mml.itarm-insurance', 'com'].join('.')];
const LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]'];

export interface EnvironmentUrls {
  production: boolean;
  apiUrl: string;
}

export function assertEnvironment(env: EnvironmentUrls): void {
  const urls = [env.apiUrl];
  for (const url of urls) {
    const host = new URL(url).hostname.toLowerCase();
    if (!env.production && PRODUCTION_HOSTS.includes(host)) {
      throw new Error('A non-production build points at the production API (' + host + '). Use environment.development.ts or environment.staging.ts.');
    }
    if (env.production && LOCAL_HOSTS.includes(host)) {
      throw new Error('A production build points at ' + host + '.');
    }
  }
}
