// Const général pour bot 
const { Client, Collection } = require('discord.js');
const bot = new Client();
const fs = require("fs");
const { readdirSync } = require("fs");

// Initialisation des variables
bot.commands = new Collection();
bot.data = {
    commands: [],
    aliases: new Array()
};

// Login bot
bot.login(process.env.TOKEN);

// Gestion des commandes //

// Lecture dynamique des fichiers de commandes
readdirSync("./Modules-commands/").forEach(dir => {
    const commandFiles = readdirSync(`./Modules-commands/${dir}/`).filter(file => file.endsWith(".json"));

    // Boucles pour extraire tout les commandes de la const "commandFiles"
    for (let file of commandFiles) {

        // Récupération du fichier de config de la commande
        let config = require(`./Modules-commands/${dir}/${file}`);

        // Récupération du fichier du script de la commande
        let script = require(`./Modules-commands/${dir}/script/main.js`);

        // Je test si dans le fichier de config la commande contient au moins son nom
        if (config.name) {

            // J'ajoute la commands à la collection "bot.commands"
            bot.commands.set(config.name, script);

            // J'ajoute la commands au tableau data "bot.data.commands" du bot
            bot.data.commands.push({
                "name": config.name,
                "description": config.description,
                "usage": config.usage,
                "category": config.category,
                "permission": config.permission,
                "aliases": config.aliases,
                "path": `${dir}/script/main.js`
            });

            console.log(`${config.name} ✅`);

        } else {

            console.log(`${file} ❌  -> missing a help.name, or help.name is not a string.`);
            continue;

        };

        // J'ajoute si il y en n'a, l'alias au tableau data "bot.data.aliases" du bot
        if (config.aliases) config.aliases.forEach(alias => bot.data.aliases.push({ key: alias, value: config.name }));

    };

});

// Lecture dynamique des fichiers d'events
readdirSync("./Modules-events/").forEach(dir => {
    const commandFiles = readdirSync(`./Modules-events/${dir}/`).filter(file => file.endsWith(".js"));

    // Affiche le nom du fichier dans lequel les events son trouvaient
    console.log(`======Events folder [${dir}]======`);

    // S'il ne trouve pas d'event affiche ce message
    if (commandFiles.length < 1) return console.log("Aucune events trouvée !");

    // Affichage du nombre d'events en chargement
    console.log(`${commandFiles.length} events en chargement`);

    // Boucles pour extraire tout les commandes de la const "commandFiles"
    for (let file of commandFiles) {

        // Récupération du fichier
        const events = require(`./Modules-events/${dir}/${file}`);

        // Récupération du nom du fichier
        const event = file.split(".")[0];

        // Mise en chargement de l'event
        bot.on(event, events.bind(null, bot));

    };

});
