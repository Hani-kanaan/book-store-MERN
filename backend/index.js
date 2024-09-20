import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const mongoDBURL = process.env.MONGODB_URL;
const app = express();

app.get("/", (request, response) => {
  //console.log(request)
  return response.status(234).send("helloo");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to DB");
    app.listen(PORT, () => {
      console.log(`app listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
