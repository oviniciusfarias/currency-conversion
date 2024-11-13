import styled from 'styled-components'
import currencies from '../../mocks/currencies.json'
import CurrencyItem, { getCurrencyFlag } from './CurrencyItem'
import { useEffect, useState } from 'react'

const DropdownWrapperStyled = styled.div`
  position: relative;
  width: 320px;
  border: 1px solid black;
  background-color: white;
  color: var(--bg-color);
  border-radius: 8px;
  padding: 16px 0px;
  cursor: pointer;
  
  &:hover {
    background-color: #e1e1e1;
  }

  &::after {
    content: '';
    width: 14px;
    height: 14px;
    border-top: 2px solid var(--bg-color);
    border-right: 2px solid var(--bg-color);
    display: block;
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(-24px, -50%) rotate(135deg);
  }

  @media screen and (max-width: 720px) {
    width: 100%;
  }
`

const LabelStyled = styled.span`
  display: block;
  padding: 8px 24px 0px 24px;
  line-height: 1em;
  font-weight: 400;
  font-size: 14px;
`

const DropdownStyled = styled.div`
  
`

const DropdownSelected = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 24px;

  & > img {
    width: 21px;
    height: 21px;
    border-radius: 50%;
    margin-right: 8px;
    object-fit: cover;
  }
  & > .without-flag {
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background-color: lightgray;
    font-size: 8px;
    font-weight: 400;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
  }
  & > p {
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    line-height: 1em;
  }
  & > p > strong {
    margin-right: 8px;
  }
  & > p > span {
    font-size: 12px;
  }
`

const DropdownListStyled = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: ${props => props.$statusDropdown ? 'block' : 'none'};
  position: absolute;
  max-height: 400px;
  overflow: auto;
  top: 100%;
  width: 100%;
  background-color: white;
  padding: 0;
  z-index: 1;
  border-radius: 8px;
`

const DropdownListItemStyled = styled.li`
  
`


const CurrencyDropdown = ({ label, selectedCurrency, handleCurrencyChange }) => {

  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    const loadCurrencies = async () => {
      const currencyData = await import('../../mocks/currencies.json') // lazy load do json
      setCurrencies(currencyData.default)
    }

    loadCurrencies()
  }, [])

  const handleClickDropdown = () => {
    console.log('clicando no dropdown')
    setDropdownStatus(!dropdownStatus)
  }  

  return (
    <DropdownWrapperStyled 
      className="dropdown-wrapper" 
      onClick={handleClickDropdown}
    >
      <LabelStyled>{ label }</LabelStyled>
      <DropdownStyled className="dropdown">
        <DropdownSelected className='dropdown-selected'>
          {getCurrencyFlag(selectedCurrency) 
            ?
              <img src={getCurrencyFlag(selectedCurrency)} alt={`Bandeira do país ${selectedCurrency.country}`} />
            :
              <span className='without-flag'>{selectedCurrency.code}</span>
          }
          <p>
            <strong>{selectedCurrency.code}</strong> 
            <span>{selectedCurrency.name_ptbr}</span>
          </p>
        </DropdownSelected>
        <DropdownListStyled $statusDropdown={dropdownStatus}>
          {currencies.map((currency) => {
            return (
              <DropdownListItemStyled key={currency.code}>
                <CurrencyItem 
                  currency={currency} 
                  handleSelectCurrency={handleCurrencyChange} 
                />
              </DropdownListItemStyled>
            )
          })}
        </DropdownListStyled>
      </DropdownStyled>
    </DropdownWrapperStyled>
  )
}

export default CurrencyDropdown;