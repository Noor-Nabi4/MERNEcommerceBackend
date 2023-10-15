const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ exposedHeaders: ["X-Total-Count"] }));
const errorMiddleware = require("./middlewares/error");

//Routes
const ProductRoute = require("./routes/Product");
const BrandRoute = require("./routes/Brand");
const CategoryRoute = require("./routes/Category");
const UserRoute = require("./routes/User");
const AuthRoute = require("./routes/Auth");
const CartRoute = require("./routes/Cart");

app.use("/products", ProductRoute);
app.use("/brands", BrandRoute);
app.use("/categories", CategoryRoute);
app.use("/user", UserRoute);
app.use("/auth", AuthRoute);
app.use("/cart", CartRoute);
// app.use("/", order);

//middleware
app.use(errorMiddleware);

module.exports = app;
