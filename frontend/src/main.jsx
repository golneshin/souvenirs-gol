import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import store from "./store.js";
import App from "./App.jsx";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
// private route imports
import PrivateRoute from "./components/PrivateRoute.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
// admin route imports
import AdminRoute from "./components/AdminRoute.jsx";
import OrdersListPage from "./pages/Admin/OrderListsPage.jsx";
import UsersListPage from "./pages/Admin/UsersListPage.jsx";
import ProductsListPage from "./pages/Admin/ProductsListPage.jsx";
import ProductEditPage from "./pages/Admin/ProductEditPage.jsx";
import UserEditPage from "./pages/Admin/UserEditPage.jsx";
// index style
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/search/:keyword" element={<HomePage />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
      <Route path="/page/:pageNumber" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/productslist" element={<ProductsListPage />} />
        <Route
          path="/admin/productslist/:pageNumber"
          element={<ProductsListPage />}
        />
        <Route
          path="/admin/search/:keyword/productslist/:pageNumber"
          element={<ProductsListPage />}
        />
        <Route path="/admin/userslist" element={<UsersListPage />} />
        <Route path="/admin/orderslist" element={<OrdersListPage />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
        <Route path="/admin/user/:id" element={<UserEditPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
