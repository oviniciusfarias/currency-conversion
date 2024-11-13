import styled from "styled-components"
import useCurrency from "../../hooks/useCurrency"

const WrapperHistory = styled.div`
  margin-top: 64px;
`

const HistoryList = styled.ul`
  list-style-type: none;
`

const History = () => {
  const { conversionHistory } = useCurrency() // Pega o histórico do contexto

  return (
    <WrapperHistory>
      <h2>Histórico de conversões</h2>
      <HistoryList>
        {conversionHistory.map((conversion, index) => (
          <li key={index}>
            {conversion.amount} {conversion.fromCurrency.code} para {conversion.toCurrency.code} = {conversion.convertedValue}
          </li>
        ))}
      </HistoryList>
    </WrapperHistory>
  )
}

export default History