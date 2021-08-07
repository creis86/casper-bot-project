module.exports = (app) => {
    app.get("/noticias", (req, res) => {
        app.config.db_connection();
        const News = require("../models/news_model");

        News.find().sort({updatedAt: -1})
            .then((result) => {
                res.render("news_panel", {newsArray: result});
            })
            .catch((err) => {
                console.log(err);
            });
    });

    app.post("/noticias", (req, res) => {
        app.config.db_connection();
        const News = require("../models/news_model");
        const news = new News(req.body);

        news.save()
            .then(() => {
                res.redirect("/noticias");
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
