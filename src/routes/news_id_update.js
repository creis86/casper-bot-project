module.exports = (app) => {
    app.post("news/:id/update", (req, res) => {
        app.config.db_connection();
        const News = require("../models/news");

        News.findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                res.redirect("/news");
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
