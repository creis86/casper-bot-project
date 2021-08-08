module.exports = (app) => {
    app.get("/news", (req, res) => {
        app.config.db_connection();
        const News = require("../models/news");

        News.find().sort({updatedAt: -1})
            .then((result) => {
                res.render("news", {newsArray: result});
            })
            .catch((err) => {
                console.log(err);
            });
    });

    app.post("/news", (req, res) => {
        app.config.db_connection();
        const News = require("../models/news");
        const news = new News(req.body);

        news.save()
            .then(() => {
                res.redirect("/news");
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
