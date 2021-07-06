const Discord = require('discord.js');
const { actionWellFinished, actionInterrupted, actionBadlyFinished } = require("../../../Modules-exports/functions.js");

module.exports.run = async (bot, msg, args) => {

    //-----------------------------------------------------

    function hangedDrawings(value) {

        if (value === 0) {

            return `\`\`\`\n┌───────────────┐\n│               │\n│               │\n│               │\n│               │\n│               │\n│               │\n│               │\n└───────────────┘\n\`\`\``;

        } else if (value === 1) {

            return `\`\`\`\n┌───────────────┐\n│               │\n│               │\n│               │\n│               │\n│               │\n│               │\n│¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯│\n└───────────────┘\n\`\`\``;

        } else if (value === 2) {

            return `\`\`\`\n┌───────────────┐\n│               │\n│   ║           │\n│   ║           │\n│   ║           │\n│   ║           │\n│   ║           │\n│¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯│\n└───────────────┘\n\`\`\``;

        } else if (value === 3) {
            return `\`\`\`\n┌───────────────┐\n│   ________    │\n│   ║           │\n│   ║           │\n│   ║           │\n│   ║           │\n│   ║           │\n│¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯│\n└───────────────┘\n\`\`\``;

        } else if (value === 4) {

            return `\`\`\`\n┌───────────────┐\n│   ________    │\n│   ║ /         │\n│   ║/          │\n│   ║           │\n│   ║           │\n│   ║           │\n│¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯│\n└───────────────┘\n\`\`\``;

        } else if (value === 5) {

            return `\`\`\`\n┌───────────────┐\n│   ________    │\n│   ║ /    |    │\n│   ║/          │\n│   ║           │\n│   ║           │\n│   ║           │\n│¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯│\n└───────────────┘\n\`\`\``;

        } else if (value === 6) {

            return `\`\`\`\n┌───────────────┐\n│   ________    │\n│   ║ /    |    │\n│   ║/     0    │\n│   ║           │\n│   ║           │\n│   ║           │\n│¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯│\n└───────────────┘\n\`\`\``;

        } else if (value === 7) {

            return `\`\`\`\n┌───────────────┐\n│   ________    │\n│   ║ /    |    │\n│   ║/     0    │\n│   ║      #    │\n│   ║           │\n│   ║           │\n│¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯│\n└───────────────┘\n\`\`\``;

        } else if (value === 8) {

            return `\`\`\`\n┌───────────────┐\n│   ________    │\n│   ║ /    |    │\n│   ║/     0    │\n│   ║     /#    │\n│   ║           │\n│   ║           │\n│¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯│\n└───────────────┘\n\`\`\``;

        } else if (value === 9) {

            return `\`\`\`\n┌───────────────┐\n│   ________    │\n│   ║ /    |    │\n│   ║/     0    │\n│   ║     /#\\   │\n│   ║           │\n│   ║           │\n│¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯│\n└───────────────┘\n\`\`\``;

        } else if (value === 10) {

            return `\`\`\`\n┌───────────────┐\n│   ________    │\n│   ║ /    |    │\n│   ║/     0    │\n│   ║     /#\\   │\n│   ║     /     │\n│   ║           │\n│¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯│\n└───────────────┘\n\`\`\``;

        } else if (value === 11) {

            return `\`\`\`\n┌───────────────┐\n│   ________    │\n│   ║ /    |    │\n│   ║/     0    │\n│   ║     /#\\   │\n│   ║     / \\   │\n│   ║           │\n│¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯│\n└───────────────┘\n\`\`\``;

        };

    };

    //-----------------------------------------------------

    // Fonction pour résultats du jeu ▼
    async function promptMessage(msg, time) {
        // Nous mettons le temps en secondes, avec cela, il est transféré à MS
        time *= 1000;

        // Autoriser uniquement les réactions de l'auteur,
        // et les emoji doivent être dans le tableau que nous avons fourni.
        const filter = m => m.author.id === msg.author.id;

        // Et bien sûr, attendez les réactions ▼
        // Errors: ['time'] treats ending because of the time limit as an error
        return msg.channel.awaitMessages(filter, { max: 1, time: time, errors: ['time'] })
            .then(collected => collected.first())
            .catch(collected => {

            });
    };

    //-----------------------------------------------------

    const listMotsFR = require('../../../Data/list-mots-fr.json');

    //-----------------------------------------------------

    // Récupéré un mot aléatoire dans la liste du fichier .json
    const randomWordsList = listMotsFR[Math.floor(Math.random() * listMotsFR.length)];
    const randomWords = randomWordsList.word;
    console.log(randomWords);

    //-----------------------------------------------------

    // Boucle principal
    let exit = false;
    while (exit === false) {

        const embedLoading = {
            color: 0x691566,
            title: "Loading..."
        };
        const msgSending = await msg.channel.send({ embed: embedLoading });

        //---------------------------

        const embedChoice = {
            color: 0x691566,
            title: "Tapez la commande de votre choix :",
            description: `• **1** Pour jouer tout seul.
		• **2** : Pour jouer a deux.
		• **Exit** : Pour quitter.`
        }
        msgSending.edit({ embed: embedChoice });

        //---------------------------

        // Récupération de la réponse
        var msgReceived = await promptMessage(msg, 10);

        // Test de la réponse de l'utilisateur
        if (msgReceived == undefined) {

            msg.channel.send({ embed: actionBadlyFinished("Commande annulée.") });

            exit = true;
            break;

        } else if (msgReceived.content == 1) {

            // Suppression des msg
            msgReceived.delete();
            msgSending.delete();

            // Tableau de données
            var dataGame = {
                "words": randomWords,
                "displayWords": 0,
                "wordFormatNumber": 0,
                "numberError": 0,
                "letter": 0,
                "resultLetterPosition": 0,
                "displayIncorrectLetters": []
            };

            // Construction du "wordFormatNumber"
            for (let i = 0; i < dataGame.words.length; i++) {

                dataGame.wordFormatNumber = dataGame.wordFormatNumber ? `${dataGame.wordFormatNumber} ${i}` : `${i}`

            }

            dataGame.displayWords = "─ ".repeat(randomWords.length).trim();

            const embedDisplayDrawing = {
                color: 0x691566,
                description: hangedDrawings(dataGame.numberError)
            };
            const msgSendingEmbedDisplayDrawing = await msg.channel.send({ embed: embedDisplayDrawing });

            const embedText = {
                color: 0x691566,
                description: `${dataGame.displayWords}\nLettres incorrectes :`
            };
            const msgSendingEmbedText = await msg.channel.send({ embed: embedText });

            // Boucle du jeu
            let currentGame = false;
            while (currentGame === false) {

                // Récupération de la lettre
                msgReceived = await promptMessage(msg, 60);

                // Test de la réponse de l'utilisateur
                if (msgReceived == undefined) {

                    msg.channel.send({ embed: actionBadlyFinished("Commande annulée.") });

                    currentGame = true;
                    exit = true;
                    break;

                } else if (msgReceived == "exit") {

                    msg.channel.send({ embed: actionBadlyFinished("Commande annulée.") });

                    currentGame = true;
                    exit = true;
                    break;

                } else {

                    // Test de sécurité
                    if (msgReceived.content.toLowerCase() == "exit") {

                        msg.channel.send({ embed: actionWellFinished("La commande a bien été annulée.") });

                        exit = true;
                        break;

                    } else if (msgReceived.content.search(/[a-z]/i) != 0) {

                        // Je supprime le msg
                        msgReceived.delete();

                        // J'envoi le msg d'info
                        msg.channel.send({ embed: actionInterrupted("Il faut donnée une lettre !") }).then(async msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 3000);
                        });
                        continue;

                    } else if (msgReceived.content.length > 1) {

                        // Je supprime le msg
                        msgReceived.delete();

                        // J'envoi le msg d'info
                        msg.channel.send({ embed: actionInterrupted("Il faut donnée une seul lettre !") }).then(async msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 3000);
                        });
                        continue;

                    }

                    // Je rentre le nom de la lettre reçu
                    dataGame.letter = msgReceived.content.toUpperCase();

                    // Je supprime le msg
                    msgReceived.delete();

                    // Fonction qui permet de récupérer la position d'une ou plusieurs lettre
                    function letterPosition(words, letter) {

                        // #########

                        var tableau = [];

                        let j = 1;
                        for (let i = 0; i < words.length; i++) {
                            tableau.push(words.substr(i, j));
                        };

                        // #########

                        var indices = [];
                        var idx = tableau.indexOf(letter);

                        while (idx != -1) {
                            indices.push(idx);
                            idx = tableau.indexOf(letter, idx + 1);
                        };

                        // #########

                        return indices;

                        // #########

                    };

                    // Récupération de la position des lettres grace à la fonction "letterPosition" est je la rentre dans "dataGame.resultLetterPosition"
                    dataGame.resultLetterPosition = letterPosition(randomWords, dataGame.letter);

                    // Fonction qui permet l'affichage des lettres trouver
                    function algoWordDisplay(dataGame) {
                        
                        // _ _ _ _ _ _ _ _ _ _
                        // 0 1 2 3 4 5 6 7 8 9

                        // Je teste si je dois incorporer une ou plusieurs lettres dans "dataGame.wordFormatNumber"
                        if (dataGame.resultLetterPosition.length == 1) {

                            // Enregistrement dans la variable
                            dataGame.wordFormatNumber = dataGame.wordFormatNumber.replace(dataGame.resultLetterPosition[0], dataGame.letter);

                        } else if (dataGame.resultLetterPosition.length == 2) {

                            // Je boucle pour décomposer les résultats de "dataGame.resultLetterPosition" pour introduire la/les lettre(s) dans "dataGame.wordFormatNumber"
                            for (let index of dataGame.resultLetterPosition) {

                                // Enregistrement dans la variable
                                dataGame.wordFormatNumber = dataGame.wordFormatNumber.replace(index, dataGame.letter);

                            };

                        };

                        // ******************

                        var replace = false;
                        for (let i = 0; i < dataGame.words.length; i++) {

                            console.log(dataGame.displayWords);
                            console.log(!!dataGame.displayWords.search(i));
                            /*
                            if (!!dataGame.displayWords.search(i) === -1) {
                                replace = true;
                            }*/
                            
                        }
                        //console.log(replace);

                        // ******************

                        // Je place le résultat dans "dataGame.displayWords"
                        dataGame.displayWords = dataGame.wordFormatNumber;

                        // Je boucle pour convertir les nombres en caractère "─"
                        for (let i = 0; i < dataGame.words.length; i++) {

                            // Enregistrement dans la variable
                            dataGame.displayWords = dataGame.displayWords.replace(i, "─");
                            
                        }

                        // Je retourne le résultat
                        return dataGame.displayWords;

                    };

                    // Je vérifie si je trouve une lettre dans le mot
                    if (dataGame.resultLetterPosition.length == 0) {

                        // J'ajoute 1 au nombre d'erreur
                        dataGame.numberError = dataGame.numberError + 1;

                        // Je mets à jour le dessin
                        const embedDisplayDrawing = {
                            color: 0x691566,
                            description: hangedDrawings(dataGame.numberError)
                        };
                        msgSendingEmbedDisplayDrawing.edit({ embed: embedDisplayDrawing });

                        // J'ajoute la lettre à la liste des lettres incorrectes si elle ni est pas encore
                        if (dataGame.displayIncorrectLetters.includes(dataGame.letter) === false) dataGame.displayIncorrectLetters.push(dataGame.letter);

                        // Je mets à jour les informations
                        const embedText = {
                            color: 0x691566,
                            description: `${dataGame.displayWords}\nLettres incorrectes : ${dataGame.displayIncorrectLetters}`
                        };
                        msgSendingEmbedText.edit({ embed: embedText });

                    } else if (dataGame.resultLetterPosition.length != 0) {

                        // Je mets à jour les informations
                        const embedText = {
                            color: 0x691566,
                            description: `${algoWordDisplay(dataGame)}\nLettres incorrectes : ${dataGame.displayIncorrectLetters}`
                        };
                        msgSendingEmbedText.edit({ embed: embedText });

                    };

                };

            };

        } else if (msgReceived.content == 2) {

            msgReceived.delete();

        } else if (msgReceived.content.toLowerCase() == "exit") {

            msg.channel.send({ embed: actionWellFinished("La commande a bien été annulée.") });

            exit = true;
            break;

        } else {

            msg.channel.send({ embed: actionInterrupted("Désolé une erreur est survenu !") });

            exit = true;
            break;

        };

    };

    //-----------------------------------------------------
};