import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import Navbar from "../commons/Navbar";
import CardButtons from "../commons/CardButtons";
import Loading from "../commons/Cards/Loading";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { Paid } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { carrito, setCarrito } = useContext(AuthContext);
  console.log("EN CARRITO: ", carrito);
  const [bookQuantities, setBookQuantities] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:4000/admin/users/${userId}`)
        .then((response) => {
          const userCart = response.data.user_cartBuy;
          const quantities = {};

          userCart.forEach((book) => {
            const matchingBook = carrito.find(
              (cartBook) => cartBook.bookId === book.bookId
            );

            if (matchingBook) {
              quantities[book.bookId] = {
                count: book.count,
                price: matchingBook.price,
              };
            }
          });

          setBookQuantities(quantities);
        })
        .catch((error) => {
          console.error("Error al verificar el token:", error);
        });
    }
  }, [userId, carrito]);

  const handleQuantityChange = (bookId, newQuantity) => {
    setBookQuantities({
      ...bookQuantities,
      [bookId]: {
        ...bookQuantities[bookId],
        count: newQuantity,
      },
    });
  };

  useEffect(() => {
    let sum = 0;
    for (const bookId in bookQuantities) {
      sum += bookQuantities[bookId].count;
    }
    setTotalProducts(sum);
  }, [bookQuantities]);

  // const totalPrice = carrito.reduce(
  //   (total, book) => total + bookQuantities[book.bookId]?.count * book.price,
  //   0
  // );
  const totalPrice = carrito ? carrito.cart.price : 0;
  // const { cart_cartBuy: cart } = carrito;
  return (
    <div className="div-cart">
      <Navbar />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            {carrito && carrito.books ? (
              carrito.books.map((book, index) => (
                <Card
                  key={index}
                  style={{
                    margin: "10px",
                    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.5)",
                    fontFamily: "'Hanken Grotesk', sans-serif"
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <CardMedia
                        component="img"
                        alt={book.title}
                        height="140"
                        image={book.image}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CardContent>
                        <h1 className="title is-4" style={{
                          fontFamily: "'Hanken Grotesk', sans-serif"}}>
                          {book.title || "No Title"}
                        </h1>
                        <Typography>
                          <span className="title is-6" style={{
                            fontFamily: "'Hanken Grotesk', sans-serif",
                            fontWeight: "bold",
                            fontSize: "17px"
                          }}>Price:</span>{" "}
                          {`$${
                            (bookQuantities[book.bookId]?.count || 1) *
                            book.price
                          }`}
                        </Typography>
                        <CardButtons book={book} />
                      </CardContent>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        type="number"
                        value={
                          (bookQuantities[book.bookId] &&
                            bookQuantities[book.bookId].count) ||
                          1
                        }
                        onChange={(e) =>
                          handleQuantityChange(
                            book.bookId,
                            parseInt(e.target.value)
                          )
                        }
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Card>
              ))
            ) : (
              <Loading />
            )}
          </Grid>

          <Grid item xs={4}>
            <Card
              style={{
                margin: "10px",
                boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.5)",
                fontFamily: "'Hanken Grotesk', sans-serif"
              }}
            >
              <CardContent>
                <h1 className="title is-4" style={{
                  fontFamily: "'Hanken Grotesk', sans-serif"
                }}>Resumen de Compra</h1>
                <Typography style={{
                  fontFamily: "'Hanken Grotesk', sans-serif"
                }}>
                  Productos ({totalProducts})
                  <br />
                  <span className="title is-6" style={{
                    fontFamily: "'Hanken Grotesk', sans-serif"
                  }}>Total Price:</span> ${totalPrice}
                </Typography>
                <br />
                <Link to="/checkout">
                  <Button
                    variant="contained"
                    color="success"
                    style={{fontFamily: "'Hanken Grotesk', sans-serif"}}
                    startIcon={<Paid />}
                  >
                    Ir a Pagar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
