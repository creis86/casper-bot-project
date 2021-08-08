module.exports.index = (app, req, res) => {
    res.render("auth", {validation_err: []});
};

module.exports.auth = (app, req, res) => {
    req.checkBody("PIN", "PIN é obrigatório").notEmpty();
    req.checkBody("PIN", "PIN só aceita caracteres numéricos").isInt();
    req.checkBody("PIN", "PIN incorreto").equals("1609");

    const err = req.validationErrors();

    if(err) {
        res.render("auth", {validation_err: err});
        return;
    }
    res.redirect("/news")
};
