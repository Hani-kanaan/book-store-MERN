import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Book } from "./models/bookModel.js"; // Import the Book model

dotenv.config();

export const PORT = process.env.PORT;
export const mongoDBURL = process.env.MONGODB_URL;
const app = express();

//for parsing json body:
app.use(express.json());

app.get("/", (request, response) => {
  //console.log(request)
  return response.status(234).send("helloo");
});
// save new book:
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "missing field",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all books
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
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
