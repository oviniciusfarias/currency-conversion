import countriesCurrencies from '../mocks/countries-currencies.json'
import currencies from '../mocks/currencies.json'

const GetAllCurrencies = () => {
  // const allCurrencies = [];
  
  currencies.forEach(currency => {    
    console.log(currency);
  })

  return currencies;
}

export default GetAllCurrencies;