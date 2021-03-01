import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios, { AxiosResponse } from "axios";

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

interface Article {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

let category = "";
let articles: Article[];

try {
  app.get("/", (req, res) => res.send("Hello world!"));
  app.listen(port, () => console.log(`Running on http://localhost:${port}`));

  app.get("/newsArticles", async (req, res) => {
    const url: string =
      "http://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      category +
      "pageSize=50&" +
      "apiKey=73600983d13f448dae4397bfa5d9c1d5";

    await axios
      .get(url)
      .then((response: AxiosResponse) => {
        articles = response.data.articles;
      })
      .catch((error) => console.log(error))
      .then();

    res.status(200).json(articles);
  });

  app.post("/setCategory", (req, res) => {
    const cat: string = req.body.category;
    category = "category=" + cat + "&";
    res.status(200);
  });
} catch (e) {
  console.error("Error starting server");
  console.error(e);
  console.error("Server startup stopped");
  process.exit(-1);
}
