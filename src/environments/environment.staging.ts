// Staging: shared test data and the test payment gateway (VULN-069).
// TODO before the first staging build: replace the host with the real staging API and register its payment return URL at the gateway.
const API = 'https://staging-api.mml.example/api/v1';
export const environment = {
    production: false,
    apiUrl: API,
    hyperpayShopperUrl: 'https://staging.mml.example/payment-status/',
    hyperpayUrl: 'https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=',
  };
