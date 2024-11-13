import { createContext, useReducer, useState } from "react";
import { ADD_CONVERSION_TO_HISTORY, currencyReducer, initialState, SET_EXCHANGE_RATE } from "../reducers/currencyReducer";

const CurrencyContext = createContext()

const CurrencyProvider = ({children}) => {
  const [state, dispatch] = useReducer(currencyReducer, initialState)

  // Ação para definir a taxa de câmbio
  const setExchangeRate = (fromCurrency, rates) => {
    dispatch({
      type: SET_EXCHANGE_RATE,
      payload: { fromCurrency, rates }
    })
  }

  // Ação para adicionar a conversão ao histórico
  const addConversionToHistory = (conversion) => {
    dispatch({
      type: ADD_CONVERSION_TO_HISTORY,
      payload: conversion
    })
  }

  return (
    <CurrencyContext.Provider
      value={{
        currencyData: state.currencyData,
        conversionHistory: state.conversionHistory,
        setExchangeRate,
        addConversionToHistory
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export { CurrencyContext, CurrencyProvider }