export const SET_EXCHANGE_RATE = 'SET_EXCHANGE_RATE'
export const ADD_CONVERSION_TO_HISTORY = 'ADD_CONVERSION_TO_HISTORY'

export const initialState = {
  currencyData: {},
  conversionHistory: [],
}

export const currencyReducer = (state, action) => {
  switch (action.type) {
    case SET_EXCHANGE_RATE:
      return {
        ...state,
        currencyData: {
          ...state.currencyData,
          [action.payload.fromCurrency]: action.payload.rates
        }
      }
    
    case ADD_CONVERSION_TO_HISTORY:
      return {
        ...state,
        conversionHistory: [action.payload, ...state.conversionHistory.slice(0, 4)]
      }
    
    default:
      return state
  }
}