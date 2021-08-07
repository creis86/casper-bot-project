module.exports = (app) => {
    app.get("/noticias/:id/excluir", (req, res) => {
        app.config.db_connection();
        const News = require("../models/news_model");
        
        News.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect("/noticias");
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
