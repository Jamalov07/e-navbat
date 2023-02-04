const express = require("express");
const config = require("config");
const PORT = config.get("port");
const { winstonLogger, errLogger } = require("./middlewares/loggerMiddleware");
const errorHandler = require("./middlewares/ErrorHandlingMiddleware");
const routes = require("./routes/index.routes");
const app = express();
app.use(express.json());

// app.use(winstonLogger);
app.use("/api", routes);
// app.use(errLogger);
app.use(errorHandler);


async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server ${PORT} portida ishga tushdi`);
    });
  } catch (error) {
    console.log("serverda hatolik", error);
  }
}

start();
