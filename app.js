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
// const user = require("./routes/userRoutes");
// const order = require("./routes/orderRoutes");

app.use("/product", ProductRoute);
app.use("/brand", BrandRoute);
app.use("/Category", CategoryRoute);
// app.use("/", user);
// app.use("/", order);

//middleware
app.use(errorMiddleware);

module.exports = app;
