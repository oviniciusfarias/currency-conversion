import { useCallback, useContext, useEffect } from "react"
import { CurrencyContext } from "../context/CurrencyContext"
import { fetchExchangeRates } from "../utils/fetchExchangeRate"

const useCurrency = () => {
  const { currencyData, setExchangeRate, conversionHistory, addConversionToHistory } = useContext(CurrencyContext)

  // Função para buscar as taxas de câmbio e cachear as taxas no localStorage
  const getExchangeRate = useCallback(async (fromCurrencyCode) => {
    // 1. Verificar se as taxas já estão no currencyData
    const cacheKey = `rate_${fromCurrencyCode}`
    const cacheExpiryKey = localStorage.getItem(`${cacheKey}_expiry`)

    if (currencyData[fromCurrencyCode]) {
      const cacheExpiry = localStorage.getItem(cacheExpiryKey)

      // 2. Verifica se as taxas estão expiradas (validade de 10 segundos)
      if (Date.now() < cacheExpiry) {
        return currencyData[fromCurrencyCode]
      }
    }

    // 3. Se as taxas não estão no currencyData ou estão expiradas, busca no localStorage
    const cachedRates = localStorage.getItem(cacheKey)
    const cacheExpiry = localStorage.getItem(cacheExpiryKey)

    if (cachedRates && Date.now() < cacheExpiry) {
      const parsedRates = JSON.parse(cachedRates)
      setExchangeRate(fromCurrencyCode, parsedRates)
      return parsedRates
    }

    // 4. Caso as taxas não estejam no currencyData ou localStorage, ou estejam expiradas, faz a requisição à API
    const response = await fetchExchangeRates(fromCurrencyCode) // Usa a ação de dispatch
    const rates = response.conversion_rates

    localStorage.setItem(cacheKey, JSON.stringify(rates))
    localStorage.setItem(`${cacheKey}_expiry`, Date.now() + 10000)

    setExchangeRate(fromCurrencyCode, rates)

    return rates
    
  }, [setExchangeRate])
  
  // Função para realizar a conversão
  const convertCurrency = useCallback(async (amount, fromCurrency, toCurrency) => {
    const rates = await getExchangeRate(fromCurrency.code)
    const rate = rates[toCurrency.code]
    const inverseRate = 1 / rate
    const convertedValue = (amount * rate).toFixed(2)
    
    const conversionResult = {
      amount,
      fromCurrency,
      toCurrency,
      rate,
      inverseRate,
      convertedValue
    }
    
    addConversionToHistory(conversionResult) // Usa a ação de dispatch

    return conversionResult
  }, [getExchangeRate, addConversionToHistory])

  // Atualiza as taxas a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      Object.keys(currencyData).forEach(async (fromCurrency) => {
        await getExchangeRate(fromCurrency)
      })
    }, 10000)

    return () => clearInterval(interval) // Limpa o intervalo quando o componente é desmontado

  }, [])

  

  return { convertCurrency, conversionHistory, getExchangeRate }
}

export default useCurrency