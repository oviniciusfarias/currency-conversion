import styled from "styled-components";

const InputWrapperStyled = styled.div`
  width: 120px;
  border: 1px solid black;
  background-color: white;
  color: var(--bg-color);
  border-radius: 8px;
  padding: 16px 24px;
  margin-right: 16px;
  @media screen and (max-width: 720px) {
    width: 100%;
    margin-right: 0;
  }
`

const LabelStyled = styled.span`
  display: block;
  font-weight: 400;
  font-size: 14px;
  padding: 8px 0 0px 0;
`

const InputStyled = styled.input`
  border: none;
  width: 70px;
  font-size: 24px;
  @media screen and (max-width: 720px) {
    width: auto;
  }
`

const InputAmount = ({ amount, handleChange }) => {
  const focusInput = () => {
    document.getElementById('amount').focus()
  }

  return (
    <InputWrapperStyled className="input-wrapper" onClick={focusInput}>
      <LabelStyled>
        Valor
      </LabelStyled>
      <InputStyled 
        type="number"
        id="amount" 
        value={amount}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Valor"
      />
    </InputWrapperStyled>
  )
}

export default InputAmount;