const { actionInterrupted } = require("../../Modules-exports/functions.js");
const prefix = process.env.PREFIX;

module.exports = async (bot, msg) => {

    //-----------------------------------------------------

    // Eléments rejeté 
    if (msg.channel.type == "dm") return;
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    //-----------------------------------------------------

    // On décompose la chaîn  
    const input = msg.content.slice(prefix.length).split(' ');
    const commande = input.shift();
    const args = input.join(' ');

    //-----------------------------------------------------

    // Je récupère la commande sinon on cherche une/des command(s) similaire a la command recherché par l'utilisateur sinon on envoi une erreur
    var cmd = bot.commands.get(commande);

    // Je test si la commande existe
    if (!!cmd == true) {

        // Je récupère les données de la commande
        const config = bot.data.commands.find(config => config.name == commande);

        // Je test si des autorisation spécifique sont utilisé
        function permission(config, msg) {

            if (config.permission.length === 0) {
                return true;
            } else {
                return msg.guild.member(msg.author).hasPermission(config.permission);
            };

        };

        // Je teste si l'utilisateur a l'autorisation d'utiliser la commande
        if (permission(config, msg) === false) {
            
            return msg.channel.send({ embed: actionInterrupted("Vous n'avez pas la permission d'utiliser cette commande !") });

        };

        // On exécute la commande si trouvée est si permission ok
        cmd.run(bot, msg, args);

    } else {

        // Je récupère les alias
        cmd = bot.data.aliases.filter(data => data.key == commande);

        // Je teste si des alias existe
        if (cmd.length > 0) {

            // Initialisation de la variable
            var commandsSimilar = [];

            //Je récupère tout les commandes similaires 
            for (const { value: command } of cmd) {

                // Récupération des commandes trouvées
                commandsSimilar.push(`\`${prefix}${command}\``);

                // Je vérifie si je peux envoyer le message
                if (cmd.length === commandsSimilar.length) {
                    
                    // Système pour choisir si la phrase est au pluriel
                    var text = "";
                    if (commandsSimilar.length == 1) {
                        text = "Voici une commande similaire :";
                    } else if (commandsSimilar.length > 1) {
                        text = "Voici des commandes similaires :";
                    };

                    // J'envoie le msg
                    return msg.channel.send({ embed: actionInterrupted(`Commande introuvable, fait \`${prefix}help\` pour voir la liste des commandes.\n
                    **${text}**
                    ${commandsSimilar.join(", ")}`) });

                };

            };

        } else {

            // Si je ne trouve pas de commandes similaires j'envoie ce msg
            return msg.channel.send({ embed: actionInterrupted(`Commande introuvable, fait \`${prefix}help\` pour voir la liste des commandes.`) });

        };

    };

    //-----------------------------------------------------

};