const app = require("./app");
const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

//Handling Uncaugth Exception
process.on('uncaughtException',(err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down  Server due to Unhandled Uncaugth Exception");
  process.exit(1);
})

//config
dotenv.config({ path: "./config/.env" });

//connecting to database
connectDatabase();
const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down  Server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
