module.exports = (app) => {
    app.get("/", (req, res) => {
        app.src.controllers.index.index(app, req, res);
    });

    app.post("/auth", (req, res) => {
        app.src.controllers.index.auth(app, req, res);
    });
};
