export const fetchExchangeRates = async (fromCurrencyCode) => {
  const response = await fetch(`https://v6.exchangerate-api.com/v6/eaa3a176524e8b826f8dfa64/latest/${fromCurrencyCode}`)
  const data = await response.json()

  return data
}