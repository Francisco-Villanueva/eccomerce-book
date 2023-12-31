import React, { useContext, useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { OneProduct } from "./components/OneProduct";
import Login from "./components/Login";
import axios from "axios";
import { Cart } from "./components/Cart";
import Home from "./components/Home";
import SignUp from "./components/RegistrationForm";
import { AuthContext } from "./contexts/AuthContext";
import Welcome from "./components/Welcome";
import AddBook from "./components/admin/AddBook";
import EditBook from "./components/admin/EditBook";
import { Checkout } from "./components/Checkout";
import HistoryCart from "./components/HistoryCart";
import Page404 from "./commons/404";
import AddCategory from "./components/admin/AddCategory";
import { useCategories } from "./contexts/CategoriesContext";
import { AdminContext } from "./contexts/AdminContext";
import UserList from "./components/admin/UserList";
// import { all } from "../../api/src/routes";

function App() {
  const { setUser, setCarrito, getAllBooks, userId, setHistory } =
    useContext(AuthContext);

  const { allUsers, getAllUsers } = useContext(AdminContext);
  const { getCategories } = useCategories();

  useEffect(() => {
    getAllUsers();
    getAllBooks();
    getCategories();
    if (userId) {
      axios
        .get(`http://localhost:4000/admin/users/${userId}`)
        .then((response) => {
          const user = response.data;
          setUser(user);
          setCarrito();
          setHistory(userId);
        })
        .catch((error) => {
          console.error("Error al verificar el token:", error);
        });
    }
  }, [userId]);
  // console.log({ allUsers });

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/user/products/:id" element={<OneProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/addBook" element={<AddBook />} />
        <Route path="/admin/addCategory" element={<AddCategory />} />
        <Route path="/admin/books/:id" element={<EditBook />} />
        <Route path="/history" element={<HistoryCart />} />
        <Route path="/users" element={<UserList />} />

        <Route path="*" element={<Navigate to="404" />} />
        <Route path="/404" element={<Page404 />}></Route>
      </Routes>
    </>
  );
}

export default App;
