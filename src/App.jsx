// import CurrencyConverter from './components/CurrencyConverter';
import React, { Suspense } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import GlobalStyles from './GlobalStyles'

const CurrencyConverter = React.lazy(() => import('./components/CurrencyConverter'))
const History = React.lazy(() => import('./components/History'))

function App() {
  
  return (
    <CurrencyProvider>
      <GlobalStyles />

      <main>
        <Suspense fallback={<div>Carregando...</div>}>
          <CurrencyConverter />
          <History />
        </Suspense>
      </main>
    </CurrencyProvider>
  )
}

export default App
