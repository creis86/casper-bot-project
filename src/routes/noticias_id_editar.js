module.exports = (app) => {
    app.post("noticias/:id/editar", (req, res) => {
        app.config.db_connection();
        const News = require("../models/news_model");

        News.findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                res.redirect("/noticias");
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
