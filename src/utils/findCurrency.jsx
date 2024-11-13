import currencies from '../mocks/currencies.json'

const findCurrency = (currencyCode) => {
  return currencies.find(currency => currency.code === currencyCode);
}

export default findCurrency;