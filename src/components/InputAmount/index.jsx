import styled from "styled-components";

const InputWrapperStyled = styled.div`
  width: 120px;
  border: 1px solid black;
  background-color: white;
  color: var(--bg-color);
  border-radius: 8px;
  padding: 16px 24px;
  margin-right: 16px;
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
`

const InputAmount = ({ amount, handleChange }) => {
  return (
    <InputWrapperStyled className="input-wrapper">
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