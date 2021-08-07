const app = require("./config/server");

const server = app.listen(process.env.port || 3000, () => {
    console.log("Server is listening on port %d", server.address().port);
});
