module.exports.render = (app, req, res) => {
    req.session.authorized = true; // Forcing authorization temporarily because session variables are not being saved.

    if(req.session.authorized) {
        app.config.db_connection();
        const News = require("../models/news");
    
        News.find().sort({updatedAt: -1})
            .then((result) => {
                res.render("news", {newsArray: result});
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.redirect("/");
    }
};

module.exports.create = (app, req, res) => {
    req.session.authorized = true; // Forcing authorization temporarily because session variables are not being saved.
    
    if(req.session.authorized) {
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
    }
};
