import styled from "styled-components"

const ItemStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 12px;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`

const FlagStyled = styled.img`
  width: 21px;
  margin-right: 8px;
`

const TextFlagStyled = styled.span`
  width: 21px;
  height: 16px;
  background-color: lightgray;
  font-size: 8px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  margin-right: 8px;

`

const TextCurrency = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: var(--font-family-text-secondary);
`

const CurrencyCode = styled.strong`
  
`

const CurrencyName = styled.span`
  font-size: 12px;
`

export const getCurrencyFlag = (currency) => {
  if (currency.country_code !== '' ) {
    return `https://flagcdn.com/56x42/${currency.country_code.toLowerCase()}.png`
  } else {
    return false
  }
}

const CurrencyItem = ({ currency, handleSelectCurrency }) => {
  return (
    <ItemStyled className="currency-item" onClick={() => handleSelectCurrency(currency)}>
      {getCurrencyFlag(currency) 
        ?
          <FlagStyled src={getCurrencyFlag(currency)} />
        :
          <TextFlagStyled className='without-flag'>{currency.code}</TextFlagStyled>
      }
      <TextCurrency>
        <CurrencyCode>{currency.code}</CurrencyCode> <CurrencyName>{currency.name_ptbr}</CurrencyName>
      </TextCurrency>
    </ItemStyled>
  )
}

export default CurrencyItem