import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import SpellProvider from './context/SpellContext';
import UserProvider from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <SpellProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SpellProvider>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);
