module.exports = (app) => {
    app.get("/news/:id/delete", (req, res) => {
        app.config.db_connection();
        const News = require("../models/news");
        
        News.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect("/news");
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
