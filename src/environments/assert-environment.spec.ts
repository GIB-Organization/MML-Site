import { assertEnvironment } from './assert-environment';
import { environment as development } from './environment.development';
import { environment as production } from './environment';
import { environment as staging } from './environment.staging';

// VULN-069
describe('assertEnvironment', () => {
  const live = 'https://mml.itarm-insurance.com/api/v1';
  const local = 'https://localhost:7117/api/v1';
  const make = (production: boolean, url: string) => ({ production, apiUrl: url });

  it('T069-01 refuses a non-production build that points at the production API', () => {
    expect(() => assertEnvironment(make(false, live))).toThrow();
  });

  it('T069-02 refuses a production build that points at localhost', () => {
    expect(() => assertEnvironment(make(true, local))).toThrow();
    expect(() => assertEnvironment(make(true, 'http://127.0.0.1:5000/api/v1'))).toThrow();
  });

  it('accepts the matching pairs', () => {
    expect(() => assertEnvironment(make(true, live))).not.toThrow();
    expect(() => assertEnvironment(make(false, local))).not.toThrow();
  });

  it('T069-03 the development file is not production and is local', () => {
    expect(development.production).toBeFalse();
    expect(['localhost', '127.0.0.1']).toContain(new URL(development.apiUrl).hostname);
    expect(() => assertEnvironment(development)).not.toThrow();
  });

  it('the production file is production and is not local', () => {
    expect(production.production).toBeTrue();
    expect(() => assertEnvironment(production)).not.toThrow();
  });

  it('T069-05 the staging file is not production and is not the production API', () => {
    expect(staging.production).toBeFalse();
    expect(() => assertEnvironment(staging)).not.toThrow();
  });
});
