const Discord = require('discord.js');
const { actionInterrupted } = require("../../../Modules-exports/functions.js");
const prefix = process.env.PREFIX;

module.exports.run = async (bot, msg, args) => {

    //-----------------------------------------------------

    // Je décompose les arguments donnés par "args"
    const filterArgs = args.toLowerCase().split(" ");

    // Je récupère les données des commandes
    const config = bot.data.commands;

    //-----------------------------------------------------

    // Function
    function mode(filterArgs) {

        if (!!filterArgs[0] == true && !!filterArgs[1] == true) {
            return 2;
        } else if (!!filterArgs[0] == true && !!filterArgs[1] == false) {
            return 1;
        } else if (!!filterArgs[0] == false && !!filterArgs[1] == false) {
            return 0;
        };

    };

    function permission(configFind, msg) {

        if (configFind.permission.length === 0) {
            return true;
        } else {
            return msg.guild.member(msg.author).hasPermission(configFind.permission);
        };

    };

    //-----------------------------------------------------

    // La fonction "mode" renvoi un nombre qui définit le mode
    if (mode(filterArgs) == 2) {

        // Je récupère les données de la commande
        const configFind = config.find(config => config.name == filterArgs[0]);

        function filtre(filterArgs, configFind) {

            var command = 0;
            var type = 0;
            var value = 0;

            if (filterArgs[1] == "usage") {

                command = configFind.name;
                type = "Usage";
                value = configFind.usage;

            } else if (filterArgs[1] == "alias") {

                command = configFind.name;
                type = "Alias";
                if (configFind.aliases.length === 0) {
                    value = "";
                } else {
                    value = configFind.aliases;
                }

            } else if (filterArgs[1] == "permission") {

                command = configFind.name;
                type = "Permission";
                if (configFind.permission.length === 0) {
                    value = "";
                } else {
                    value = configFind.permission;
                };


            } else if (filterArgs[1] == "description") {

                command = configFind.name;
                type = "Déscription";
                value = configFind.description;

            };

            return {
                "command": command,
                "type": type,
                "value": value
            };
        };

        result = filtre(filterArgs, configFind);

        if (result.command === 0 || result.type === 0 || result.value === 0) {

            return msg.channel.send({ embed: actionInterrupted("Désolé une erreur est survenue !") });

        };

        const embed = {
            color: 0x691566,
            title: `Commande \`${prefix}${result.command}\` :`,
            description: `• **${result.type}** : ${result.value ? `${result.value}` : "vide"}\n
                        • **Permission** : ${permission(configFind, msg) ? `oui` : `non`}\n
                        **(Légende : <> obligatoire, [] optionnel)**`,
            timestamp: new Date()
        };
        msg.channel.send({ embed });

    } else if (mode(filterArgs) == 1) {

        const configFind = config.find(config => config.name == filterArgs[0]);

        const embed = {
            color: 0x691566,
            title: `Commande \`${prefix}${configFind.name}\` :`,
            description: `• **Déscription :**  ${!!configFind.description ? configFind.description : " "}
                        • **Usage :**  ${!!configFind.usage ? configFind.usage : " "}
                        • **Permission :**  ${!!configFind.permission ? configFind.permission : " "}
                        • **Alias :**  ${!!configFind.aliases ? configFind.aliases : " "}\n
                        • **Permission** : ${permission(configFind, msg) ? `oui` : `non`}\n
                        **(Légende : <> obligatoire, [] optionnel)**`,
            timestamp: new Date()
        };
        msg.channel.send({ embed });

    } else if (mode(filterArgs) == 0) {

        // Récupération du fichier .json ou son contenue les paramètres des catégories
        const typeCategoryFile = require('../../../Data/type-category.json');
        
        // Fonction
        function typeCategory(bot, typeCategoryFile) {

            // Initialisation de la variable
            var tableauTypeCategory = [];

            // Je boucle pour rentré les noms de catégories
            for (i = 0; i < typeCategoryFile.length; i++) {

                // Je rentre les informations avec .push 
                tableauTypeCategory.push({
                    "type": typeCategoryFile[i].type[0],
                    "list": []
                });

            };

            // Je boucle pour rentré les listes de commandes correspondant au nom de la catégorie
            for (i = 0; i < tableauTypeCategory.length; i++) {

                // Récupération de toutes les commandes d'une même categorie
                const filter = bot.data.commands.filter(f => f.category == tableauTypeCategory[i].type);

                // Je boucle "filter" pour décomposer les listes de commandes qu'il donne
                for (const command of filter) {
                    
                    // Je rentre les informations avec .push
                    tableauTypeCategory[i].list.push(permission(command, msg) ? `\`${prefix}${command.name}\`` : `~~\`${prefix}${command.name}\`~~`);

                };

            };

            // Je retourne le tableau
            return tableauTypeCategory;

        };

        // Mise en forme du message
        var embed = {
            color: 0x691566,
            title: "__Voici toutes les commandes classé par catégory__ :",
            description: `Si la commande est ~~barrée~~ c'est que vous n'avez pas la permission de l'utiliser.`,
            fields: [],
            footer: {
                text: "Bot by Ŀyπcῑx#1461 • Version 3.0.0"
            },
            timestamp: new Date()
        }

        // Récupération du résultat de la fonction
        const typeAndList = typeCategory(bot, typeCategoryFile);

        // Initialisation de la variable
        text = [];

        // Je boucle pour extraire les informations
        for (i = 0; i < typeAndList.length; i++) {

            // Récupération du nom de la catégorie en forme lisible
            const typeName = typeCategoryFile.find(file => file.type[0] == typeAndList[i].type);
            
            // Je rentre les catégories sous forme de text
            embed.fields.push({
                name: `**__${typeName.type[1]}__ :**`,
                value: `${typeAndList[i].list.join("\n")}`,
                inline: true
            });

        };

        // J'envoi le msg
        msg.channel.send({ embed });

    };

    //-----------------------------------------------------

};