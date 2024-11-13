import styled from "styled-components";
import InputAmount from "../InputAmount";
import useCurrency from "../../hooks/useCurrency";
import React, { Suspense, useEffect, useState } from "react";
import findCurrency from "../../utils/findCurrency";

// Lazy load do dropdown de moedas
const CurrencyDropdown = React.lazy(() => import('../CurrencyDropdown'))

const SectionStyled = styled.section`
  
`

const WrapperDropdownStyled = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 720px) {
    flex-direction: column;
    max-width: 480px;
  }
`

const WrapperFieldStyled = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin-bottom: 16px;
  @media screen and (max-width: 720px) {
    flex-direction: column;
  }
`

const WrapperButtonStyled = styled.div`
  text-align: right;

  button {
    border-radius: 8px;
    background-color: var(--highlight-color);
    color: var(--bg-color);
    font-weight: 600;
    padding: 16px;
    font-size: 18px;
    font-family: var(--font-family-title);
    border: none;
    cursor: pointer;

    &:hover {
      background-color: var(--bg-color-contrast);
      color: var(--text-color);
    }
  }
`

const WrapperResult = styled.div`
  font-family: var(--font-family-title);

  & > span,
  & > strong {
    display: block;
    font-weight: 400;
  }

  .from-currency {
    margin-bottom: 0px;
  }

  .converted-value {
    margin-bottom: 16px;
    font-size: 26px;
    span {
      font-weight: 700;
    }
  }

  .rate,
  .inverse-rate {
    font-size: 14px;
  }
`

const CurrencyConverter = () => {
  const { convertCurrency } = useCurrency();
  const [amount, setAmount] = useState(1.00)
  const [fromCurrency, setFromCurrency] = useState(findCurrency('BRL'))
  const [toCurrency, setToCurrency] = useState(findCurrency('USD'))
  const [conversionResult, setConversionResult] = useState(null)

  const handleConversion = async () => {
    
    if (amount && fromCurrency && toCurrency) {
      const result = await convertCurrency(Number(amount), fromCurrency, toCurrency)
  
      console.log('result', result)
      
      setConversionResult(result)
    }
  }

  // Atualiza a conversão sempre que o valor, a moeda de origem ou a moeda de destino mudarem
  useEffect(() => {
    handleConversion()
  }, [])


  return (
    <SectionStyled>
      <WrapperFieldStyled>
        <InputAmount amount={amount} handleChange={setAmount} />
        <WrapperDropdownStyled>
          {/* Lazy load do componente CurrencyDropdown */}
          <Suspense fallback={<div>Carregando moedas...</div>}>
            <CurrencyDropdown 
              label="De" 
              selectedCurrency={fromCurrency} 
              handleCurrencyChange={setFromCurrency} 
            />

            
            <CurrencyDropdown 
              label="Para" 
              selectedCurrency={toCurrency} 
              handleCurrencyChange={setToCurrency} 
            />
          </Suspense>
        </WrapperDropdownStyled>
      </WrapperFieldStyled>

      <WrapperButtonStyled>
        <button onClick={handleConversion}>Converter</button>
      </WrapperButtonStyled>


      {conversionResult &&
        <WrapperResult>
          <span className="from-currency">
            {conversionResult.amount} {conversionResult.fromCurrency.code} = 
          </span>
          <strong className="converted-value">
            <span>{conversionResult.convertedValue}</span> {conversionResult.toCurrency.code}
          </strong>
          <span className="rate">
            1 {conversionResult.fromCurrency.code} = {conversionResult.rate.toFixed(2)} {conversionResult.toCurrency.code}
          </span>
          <span className="inverse-rate">
            1 {conversionResult.toCurrency.code} = {conversionResult.inverseRate.toFixed(2)} {conversionResult.fromCurrency.code}
          </span>
        </WrapperResult>
      }
    </SectionStyled>
  )
}

export default CurrencyConverter;