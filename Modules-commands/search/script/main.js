const { getMember, status_format, createdAt_format, actionInterrupted } = require("../../../Modules-exports/functions.js");
const prefix = process.env.PREFIX;

module.exports.run = async (bot, msg, args) => {

    //-----------------------------------------------------

    // Ici on gère toutes les erreurs potentielles
    const filterArgs = args.toLowerCase().split(" ");

    if (args === "") {

        return msg.channel.send({ embed: actionInterrupted(`Il manque des paramètres !\n\nExemple : \`${prefix}search member ${bot.user.username}\` ou \`${prefix}search command help\`.`) });

    } else if (filterArgs[0] == "member" && filterArgs[1] === undefined) {

        return msg.channel.send({ embed: actionInterrupted(`Il faut un argument !\n\nExemple : \`${prefix}search member ${bot.user.username}\`, \`${prefix}search member ${bot.user.id}\` ou \`${prefix}search member \`<@${bot.user.id}>.`) });

    } else if (filterArgs[0] == "command" && filterArgs[1] === undefined) {

        return msg.channel.send({ embed: actionInterrupted(`Il faut un argument !\n\nExemple : \`${prefix}search command help\` ou \`${prefix}search command jeux\`.`) });

    } else if (filterArgs[0] === "command" || filterArgs[0] === "member") {



    } else {

        return msg.channel.send({ embed: actionInterrupted(`**${filterArgs[0]}** est un paramètre invalide !\n\nExemple : \`${prefix}search member ${bot.user.username}\` ou \`${prefix}search command help\`.`) });

    };

    //-----------------------------------------------------

    // La méthode trim() permet de retirer les blancs en début et fin de chaîne.
    const parameter = args.slice(0, args.indexOf(" ")).trim(),
        researchValue = args.slice(args.indexOf(" "), args.length).trim();

    if (parameter === "member") {

        //--------------------------

        if (!getMember(msg, researchValue) === false) {

            //-------------

            const member = getMember(msg, researchValue);

            const embed = {
                color: 0x691566,
                thumbnail: {
                    url: !!member.user.avatar ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=128` : member.user.defaultAvatarURL
                },
                title: `Voici le résultat de votre recherche  : `,
                fields: [
                    {
                        name: "Username :",
                        value: member.user.username
                    },
                    {
                        name: "Tag :",
                        value: member.user.tag
                    },
                    {
                        name: "ID :",
                        value: member.user.id
                    },
                    {
                        name: "Date d'inscription sur discord :",
                        value: createdAt_format(member.user)
                    },
                    {
                        name: "Statue :",
                        value: status_format(member.user)
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: `By ᚖ᚛⊰≬⊱᚜Proxima᚛⊰≬⊱᚜ᚖ#1461`
                },
            };
            msg.channel.send({ embed });

            //-------------

        } else {

            //-------------

            bot.users.fetch(researchValue).then(member => {

                const user = member;

                const embed = {
                    color: 0x691566,
                    thumbnail: {
                        url: !!user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128` : user.defaultAvatarURL
                    },
                    title: `Voici le résultat de votre recherche  : `,
                    fields: [
                        {
                            name: "Username :",
                            value: user.username
                        },
                        {
                            name: "Tag :",
                            value: user.tag
                        },
                        {
                            name: "ID :",
                            value: user.id
                        },
                        {
                            name: "Date d'inscription sur discord :",
                            value: createdAt_format(user)
                        },
                        {
                            name: "Statue :",
                            value: status_format(user)
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: `By ᚖ᚛⊰≬⊱᚜Proxima᚛⊰≬⊱᚜ᚖ#1461`
                    },
                }
                msg.channel.send({ embed });

            }).catch((error) => {

                msg.channel.send({ embed: actionInterrupted(`Nous n'avons pas trouver cet utilisateur !`) });

            });

            //-------------

        };

        //--------------------------

    } else if (parameter === "command") {

        //--------------------------

        // Récupération des commandes
        const dataCommands = bot.data.commands;

        // Je recherche la commande
        const result = bot.data.commands.find(data => data.name == researchValue);

        if (result) {

            //=========================================================================================
            async function similarCommands(result, dataCommands) {

                // Déclaration du tableau où vont être stocker les/la commande(s) similaire
                var tableau = [];

                // Si notre command cherché contient un/des alias,
                // faire comparaitre avec les autres alias des commandes
                if (result.aliases) {

                    // Séparation des alias du tableau
                    result.aliases.forEach(alias => {

                        // Je recherche tout les command avec un tableau d'alias
                        const filter = dataCommands.filter(f => f.aliases);

                        // Je boucle toutes les commandes da la const "filter"
                        for (let i = 0; i < filter.length; i++) {

                            // Je test si cette commande a un alias similaire a l'alias du forEach (Un des alias de la commande recherchée)
                            if (filter[i].aliases.includes(`${alias}`)) {

                                // Je test si la commande n'est pas déjà dans le tableau
                                if (!tableau.includes(filter[i].name)) tableau.push(`${filter[i].name}`);


                            }

                        }

                    });

                }

                return tableau.join(`\n`);

            }

            //=========================================================================================

            //On éxecute la commande si trouvé
            const similar = await similarCommands(result, dataCommands, prefix);

            const embed = {
                color: 0x691566,
                title: `Une commande a été trouver :\n`,
                description: `**Nom :**  ${result.name}
                        **Alias :**  ${!!result.aliases ? result.aliases : " "}
                        **Categorie :**  ${!!result.category ? result.category : " "}
                        **Usage :**  ${!!result.usage ? result.usage : " "}
                        **Déscription :**  ${!!result.description ? result.description : " "}\n
                        **(Légende : <> obligatoire, [] optionnel)**
                        ${similar ? `\n**Voici des commandes en rapport avec votre recherche :**\n${similar}` : ""}`,
                footer: {
                    text: `Research : ${researchValue}`
                },
                timestamp: new Date()
            };
            msg.channel.send({ embed });

        } else {

            // Je récupère les alias
            cmd = bot.data.aliases.filter(data => data.key == researchValue);

            // Je teste si un/des alias existe(s)
            if (cmd.length > 0) {

                // Initialisation de la variable
                var commandsSimilar = [];

                // Je récupère tout les commandes similaires
                for (const { value: command } of cmd) {

                    // Récupération des commandes trouvées
                    commandsSimilar.push(`\`${prefix}${command}\``);

                    // Je vérifie si je peux envoyer le message
                    if (cmd.length === commandsSimilar.length) {

                        // Système pour choisir si la phrase est au pluriel
                        var text = "";
                        if (commandsSimilar.length == 1) {
                            text = "Voici une commande en rapport avec votre recherche :";
                        } else if (commandsSimilar.length > 1) {
                            text = "Voici des commandes en rapport avec votre recherche :";
                        };

                        const embed = {
                            color: 0x691566,
                            title: text,
                            description: commandsSimilar.join(", "),
                            footer: {
                                text: `Research : ${researchValue}`
                            },
                            timestamp: new Date()
                        };
                        // J'envoie le msg
                        return msg.channel.send({ embed });

                    };

                };



            } else {

                // Si je ne trouve pas de commandes similaires j'envoie ce msg
                const embed = {
                    color: 0x691566,
                    title: `Rien n'a été trouver, en rapport avec votre recherche.`,
                    footer: {
                        text: `Research : ${researchValue}`
                    },
                    timestamp: new Date()
                }
                return msg.channel.send({ embed });

            };

        };

        //--------------------------

    };

    //-----------------------------------------------------

};