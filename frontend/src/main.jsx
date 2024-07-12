import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter, 
  RouterProvider, 
  Route, 
  createRoutesFromElements 
} from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store.js'
import App from './App.jsx'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage.jsx'
import CartPage from './pages/CartPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<HomePage/>} />
      <Route path='/product/:id' element={<ProductPage/>} />
      <Route path='/cart' element={<CartPage/>} />
      <Route path='/login' element={<LoginPage/>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
