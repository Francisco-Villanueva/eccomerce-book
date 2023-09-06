//CART_BUY MODELS
const S = require("sequelize");
const db = require("../db");

class Cart_buy extends S.Model {
}

Cart_buy.init(
  {
    amount: {
      type: S.INTEGER,
      allowNull: false,
    }
  },
  { sequelize: db, modelName: "cart_buy" }
);

module.exports = Cart_buy;