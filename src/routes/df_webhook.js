module.exports = (app) => {
    app.post("/df-webhook", (req, res) => {

        // Extracting user's topic of interest from Dialogflow intent name.
        const intentName = req.body.queryResult.intent.displayName;
        let topicOfInterest = "";

        switch(intentName) {
            case "noticias.esportes":
                topicOfInterest = "Esportes";
                break;
            case "noticias.politica":
                topicOfInterest = "Política";
                break;
            case "noticias.entretenimento":
                topicOfInterest = "Entretenimento";
                break;
            case "noticias.famosos":
                topicOfInterest = "Famosos";
        }
        // Searching MongoDB for the latest 10 news that match the user's interest.
        // Building Facebook generic templates from fetched news.
        app.config.db_connection();
        const News = require("../models/news");

        News.find({topic: topicOfInterest}).sort({updatedAt: -1})
            .then((desiredNews) => {
                let fbTemplates = [];

                for(let i = 0; (i < desiredNews.length) && (i < 10); i++) {
                    fbTemplates[i] = {
                        title: desiredNews[i].title,
                        image_url: desiredNews[i].image_url,
                        subtitle: desiredNews[i].description,
                        buttons: [{
                            type: "web_url",
                            url: desiredNews[i].source_url,
                            title: "Ler Notícia"
                        }]
                    };
                };
                return fbTemplates;

            }, (err) => {
                console.log(err);
            })
            // Sending templates to Facebook.
            // If there are none, apologize and prompt the user for another topic.
            .then((fbTemplates) => {
                if(fbTemplates.length == 0) {
                    res.json({
                        fulfillment_messages: [
                            {
                                platform: "FACEBOOK",
                                text: {
                                    text: [
                                      `Desculpe! Não há notícias sobre ${topicOfInterest}. ` +
                                      "Por favor, selecione outra categoria."
                                    ]
                                }
                            },
                            {
                                platform: "FACEBOOK",
                                quickReplies: {
                                    title: "Qual o tópico de seu interesse?",
                                    "quickReplies": [
                                        "Esportes",
                                        "Política",
                                        "Entretenimento",
                                        "Famosos"
                                    ]
                                }                              
                            }
                        ]
                    });
                } else {
                    res.json({
                        fulfillment_messages: [
                            {
                                platform: "FACEBOOK",
                                payload: {
                                    facebook: {
                                        attachment: {
                                            type: "template",
                                            payload: {
                                                template_type: "generic",
                                                elements: fbTemplates
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                platform: "FACEBOOK",
                                text: {
                                    text: [
                                      "Boa leitura! Deseja ver outras notícias?"
                                    ]
                                }
                            }
                        ]
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
