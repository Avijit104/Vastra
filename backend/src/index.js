import dotenv from "dotenv";
import app from "./app.js";
import connect from "./db/dbConfig.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8020;

connect()
  .then(() => {
    app.listen(port, () => {
      console.log("server is running at port number ", port);
    });
  })
  .catch(() => {
    console.log("opps server is down");
  });
