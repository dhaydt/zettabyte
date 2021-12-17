const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
var cors = require("cors");
const { ObjectId } = require("mongodb");
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const uri =
  "mongodb+srv://root:root@cluster0.drpfn.mongodb.net/ecommerce?retryWrites=true&w=majority";

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("ecommerce");
    const blogCollect = db.collection("blog");

    // ========================
    // Middlewares
    // ========================
    app.use(cors(corsOptions));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // ========================
    // Routes Comments
    // ========================
    app.post("/article/:id/comment", (req, res) => {
      blogCollect
        .findOneAndUpdate(
          { _id: ObjectId(req.params.id) },
          {
            $push: {
              comments: {
                text: req.body.text,
                name: req.body.name,
                created_at: Date.now(),
              },
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => res.json(result))
        .catch((error) => console.error(error));
    });

    // ========================
    // Routes Article
    // ========================
    app.get("/", async (req, res) => {
      let data = db.collection("blog").find().toArray().catch(console.error);

      function paginator(data, current_page, per_page_items) {
        // console.log(data)
        let items = data
        let page = current_page || 1,
          per_page = per_page_items || 10,
          offset = (page - 1) * per_page,
          paginatedItems = items.slice(offset).slice(0, per_page_items),
          total_pages = Math.ceil(items.length / per_page);

        return {
          page: page,
          per_page: per_page,
          pre_page: page - 1 ? page - 1 : null,
          next_page: total_pages > page ? page + 1 : null,
          total: items.length,
          total_pages: total_pages,
          data: paginatedItems,
        };
      }
      
      try {
        let query = data;
        const blog = await query;
        let response = [];
        if(req.query.tipe == 'paginate'){
          response.push(paginator(blog, req.query.current , req.query.limit))
        }
        res.status(200).json({
          status: "success",
          results: blog.length,
          data: response,
        });
      } catch (error) {
        res.status(400).json({
          status: "fail",
          message: error,
        });
      }
    });
    
    app.get("/sort/", async (req, res) => {
      let sortBy = req.query.sortBy;
      let sorted = {};
      let key = req.query.key;

      if(key == 'title'){
        sorted = {'title': sortBy}
      }else if(key =='date'){
        console.log(key)
        sorted = {'created_at': sortBy}
      }
      let data = db.collection("blog").find().sort(sorted).toArray().catch(console.error);

      try {
        let query = data;
        const blog = await query;
        res.status(200).json({
          status: "success",
          results: blog.length,
          sortBy: sorted,
          data: blog,
        });
      } catch (error) {
        res.status(400).json({
          status: "fail",
          message: error,
        });
      }
    });

    app.get("/findArticle/:word", (req, res) => {
      var word = req.params.word;
      db.collection("blog")
        .find({ article: new RegExp(word, "i") })
        .toArray()
        .then((blog) => {
          res.send(blog);
        })
        .catch(console.error);
    });

    app.get("/find/:title", (req, res) => {
      var title = req.params.title;
      db.collection("blog")
        .find({ title: new RegExp(title, "i") })
        .toArray()
        .then((blog) => {
          res.send(blog);
        })
        .catch(console.error);
    });

    app.post("/article", (req, res) => {
      // console.log(req);
      try {
        blogCollect
          .insertOne({
            title: req.body.title,
            article: req.body.article,
            created_at: Date.now(),
          })
          .then((result) => {
            res.send("success");
          })
          .catch((error) => console.error(error));
      } catch (e) {
        console.log(e);
      }
    });

    app.put("/article/:id", (req, res) => {
      blogCollect
        .findOneAndUpdate(
          { _id: ObjectId(req.params.id) },
          {
            $set: {
              title: req.body.title,
              article: req.body.article,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => res.json(result))
        .catch((error) => console.error(error));
    });

    app.delete("/article/:id", (req, res) => {
      blogCollect
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json("No blog to delete");
          }
          res.json("Blog successfully deleted");
        })
        .catch((error) => console.error(error));
    });

    // ========================
    // Listen
    // ========================
    const port = 3000;
    app.listen(port, function () {
      console.log(`listening on ${port}`);
    });
  })
  .catch(console.error);
