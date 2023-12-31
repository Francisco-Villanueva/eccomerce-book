const axios = require("axios");
const { categories } = require("./categories.json");
const { prices } = require("./prices.json");

const books = require("./books.json");
require("dotenv").config();
// const { API_KEY } = process.env;
const API_KEY = "AIzaSyCVt0_Km3suKXC11L3nFeRNdPSsMgMsgB0";
const getAllBooks = async () => {
  try {
    // const products1 = await axios.get(
    //   `https://www.googleapis.com/books/v1/volumes?q=programacion&filter=paid-ebooks&key=${API_KEY}&maxResults=40`
    // );
    // const products2 = await axios.get(
    //   `https://www.googleapis.com/books/v1/volumes?q=programacion&filter=paid-ebooks&key=${API_KEY}&startIndex=40&maxResults=40`
    // );
    // const allBooks = products1.data.items.concat(products2.data.items);

    const allBooks = books.items;
    for (let i = 0; i < allBooks.length; i++) {
      const categories_index = categories.findIndex(
        (e) => e.idBook === allBooks[i].id
      );
      const price_index = prices.findIndex((e) => e.idBook === allBooks[i].id);
      // if (i < 1) {
      //   console.log({ index: prices_index, prices: prices[prices_index] });
      // }
      if (prices[price_index]) {
        allBooks[i].price = prices[price_index].price;
      }
      if (categories[categories_index]) {
        allBooks[i].categories = categories[categories_index].categorie;
      }
    }

    // console.log(allBooks);
    const response = allBooks.map((m) => ({
      bookId: m.id,
      title: m.volumeInfo.title,
      date: m.volumeInfo.publishedDate,
      categories: m.categories ? m.categories : ["Robotics", "Education"],
      rating: m.volumeInfo.averageRating,
      price: m.price,
      // price:
      //   Math.trunc(m.saleInfo.listPrice.amount) < 900
      //     ? 2398
      //     : Math.trunc(m.saleInfo.listPrice.amount),
      img: m.volumeInfo.imageLinks
        ? m.volumeInfo.imageLinks.thumbnail
        : "https://libribook.com/images/manual-forensic-taphonomy-2nd-edition-pdf.jpg",
      lenguage: m.volumeInfo.lenguage,
      description: m.volumeInfo.description,
    }));

    return response;
  } catch (error) {
    console.log(error);
    // res.status(401).json({ error });
  }
};

const getBookById = (product_id) => {
  try {
    // const book = await axios.get(
    //   `https://www.googleapis.com/books/v1/volumes/${product_id}`
    // );

    let book = {};
    book.data = books.items.filter((e) => e.id === product_id)[0];

    console.log(book.data);
    const categories_index = categories.findIndex(
      (e) => e.idBook === book.data.id
    );
    const price_index = prices.findIndex((e) => e.idBook === book.data.id);
    console.log("EN BOOK ID");

    if (categories[categories_index]) {
      book.data.categories = categories[categories_index].categorie;
    }

    if (prices[price_index]) {
      book.data.price = prices[price_index].price;
    }
    const response = {
      bookId: book.data.id,
      title: book.data.volumeInfo.title,
      price: book.data.price || 1000,
      date: book.data.volumeInfo.publishedDate,
      categories: book.data.categories,
      rating: book.data.volumeInfo.averageRating,
      img: book.data.volumeInfo.imageLinks
        ? book.data.volumeInfo.imageLinks.thumbnail
        : "https://libribook.com/images/manual-forensic-taphonomy-2nd-edition-pdf.jpg",
      description: book.data.volumeInfo.description,
    };

    return response;
  } catch (error) {
    console.log("NO ANDA EL GET BY ID");
  }
};

module.exports = {
  getAllBooks,
  getBookById,
};
