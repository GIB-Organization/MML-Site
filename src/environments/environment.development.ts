// Development: a local backend ('dotnet dev-certs https --trust' once). Never the production API (VULN-069).
const API = 'https://localhost:7117/api/v1';
export const environment = {
    production: false,
    apiUrl: API,
    hyperpayShopperUrl: 'http://localhost:4200/payment-status/',
    hyperpayUrl: 'https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=',
  };
