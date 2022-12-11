const express = require("express");
const app = express(),
  bodyParser = require("body-parser");
port = 3080;
const mysql = require("mysql");
const moment = require("moment");

const con = mysql.createConnection({
  host: "192.168.1.8",
  port: 3306,
  database: "article-schema",
  user: "root",
  password: "P@ssw0rd",
  timezone: "uts",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(bodyParser.json());

app.get("/api/allarticles", (req, res) => {
  con.query(
    "SELECT article_id, article_title, publisher_name FROM article where article_status='published'",
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.get("/api/article", (req, res) => {
  const articleId = req.query.articleId;

  con.query(
    "SELECT * FROM article where article_id = " + articleId,
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.post("/api/deletearticle", (req, res) => {
  const deletearticle = req.body.articleId;

  con.query(
    "DELETE FROM article where article_id = " + deletearticle,
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.post("/api/article", (req, res) => {
  const article = req.body.article;
  const updatedAt = moment().format("YYYY-MM-DD h:mm:ss");

  let sql = "";
  if ("articleId" in article) {
    sql =
      "update article set article_status = '" +
      article.articleStatus +
      "', article_title = '" +
      article.articleTitle +
      "',article_content ='" +
      article.articleContent +
      "', publisher_name ='" +
      article.publisherName +
      "', updated_at = '" +
      updatedAt +
      "' where article_id = " +
      article.articleId;
  } else {
    sql =
      "insert into article (article_status, article_title ,article_content , publisher_name , updated_at) values ('" +
      article.articleStatus +
      "', '" +
      article.articleTitle +
      "', '" +
      article.articleContent +
      "','" +
      article.publisherName +
      "', '" +
      updatedAt +
      "')";
  }

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(`Article addedd ${article} `);
  });
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
