import { useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: null,
  isAuthenticated: false,
  toggleAuth: () => null,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState({
    user: initialState.user,
    isAuthenticated: initialState.isAuthenticated,
  });

  const [carrito, setCarrito] = useState([]);

  const toggleAuth = (user) =>
    setIsLoggedIn({
      user: user,
      isAuthenticated: user ? true : false,
    });

  const loginUser = (emailData, passwordData, navigate) => {
    axios
      .post("http://localhost:4000/user/login", {
        email: emailData,
        password: passwordData,
      })
      .then((res) => res.data)
      .then((user) => {
        localStorage.setItem("userId", user.id);
        toggleAuth(user);
        navigate("/home");
        console.log("Login exitoso:", user);
      })
      .catch((error) => {
        console.error("Error en el login:", error);
      });
  };

  const setUser = (user) => {
    setIsLoggedIn({
      user: user,
      isAuthenticated: true,
    });
    setCarrito(user.user_cartBuy);
  };

  const isOnCart = (bookId) => {
    const arrayOfBooksId = carrito.map((m) => m.bookId);

    return arrayOfBooksId.includes(bookId); //booleano
  };
  return (
    <AuthContext.Provider
      value={{
        ...isLoggedIn,
        toggleAuth,
        loginUser,
        setUser,
        carrito,
        isOnCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
