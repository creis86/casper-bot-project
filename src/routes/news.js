module.exports = (app) => {
    app.get("/news", (req, res) => {
        app.src.controllers.news.render(app, req, res);
    });

    app.post("/news", (req, res) => {
        app.src.controllers.news.create(app, req, res);
    });
};
