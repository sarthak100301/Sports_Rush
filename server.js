const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Article = require("./models/article");
const methodOverride = require("method-override");
const articleRouter = require("./routes/articles");

// GUEST PORT & GUEST APP declaration

var guest_app = express(); 
var guest_port = 5000;

///////////////////// ADMIN PORTAL /////////////////////

ONLINE = "mongodb+srv://ayush:Ok4SIFctH3dCWCCG@cluster0.6bwpu.mongodb.net/blog?retryWrites=true&w=majority"
OFFLINE = "mongodb://localhost/blog"

mongoose.connect(ONLINE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}); 

app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

app.get("/",async (req,res) => {
    const articles = await Article.find().sort({
        createdAt: "desc"
    });
    res.render("articles/index", {articles:articles});
})

app.use("/articles",articleRouter);
app.listen(3000);

///////////////////// GUEST PORTAL /////////////////////

guest_app.set("view engine","ejs");
guest_app.use(express.urlencoded({extended:false}));
guest_app.use(methodOverride("_method"));
guest_app.get("/",async (req,res) => {
    const articles = await Article.find().sort({
        createdAt: "desc"
    });
    res.render("articles/guest_index", {articles:articles});
})

guest_app.use("/articles",articleRouter);
guest_app.listen(guest_port);