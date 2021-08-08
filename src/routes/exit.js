module.exports = (app) => {
    app.get("/exit", (req, res) => {
        app.src.controllers.exit.exit(app, req, res);
    });
};
