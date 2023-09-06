//RELATIONS
const User = require("./User");
const Book = require("./Book");
const Cart = require("./Cart");
const Cart_buy = require("./Cart_Buy");

User.hasMany(Cart, { as: "user_cart" });
Cart.hasMany(Cart_buy, { as: "cart_cartBuy" });

/*

Cart_buy.hasMany(Book, { as: "cart_book" }); 
Esta relacion la sacamos porque al momento de crear un libro te
"obligo" a linkearlo con un cart buy con el id.

*/

// User.hasOne(Cart, { foreignKey: "cartId" });
// Cart_buy.belongsTo(Cart, { foreignKey: "cartId" });
// Cart_buy.belongsTo(Book, { foreignKey: "bookId" });

module.exports = { User, Book, Cart, Cart_buy };
