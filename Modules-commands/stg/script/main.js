const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) => {

    //-----------------------------------------------------

    commands = new Discord.Collection();

    const commandFiles = fs.readdirSync('./Modules-commands/stg/script/Modules-complementary').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./Modules-complementary/${file}`);
        commands.set(command.name, command);
    }

    //-----------------------------------------------------

    if (args == 'me') {

        //===========================

        commands.get('me').execute(bot, msg, args);

        //===========================

    } else if (args == 'user') {

        //===========================

        commands.get('stg_user').execute(bot, msg, args);

        //===========================

    } else if (args == 'serveur') {

        //===========================

        commands.get('stg_serveur').execute(bot, msg, args);

        //===========================

    } else if (args == 'channel') {

        //===========================

        commands.get('stg_channel').execute(bot, msg, args);

        //===========================

    } else {

        const embed = {
            color: 0x691566,
            title: `**Voici la liste des sous commandes :**`,
            description: "Use : <Command> <Under command>",
            fields: [
                {
                    name: `\`me\``,
                    value: `Pour modifier vos paramétre.`,
                    inline: false
                },
                {
                    name: `\`user\``,
                    value: `Pour modifier les paramétre des utilisateurs.`,
                    inline: false
                },
                {
                    name: `\`serveur\``,
                    value: `Pour modifier les paramétre du serveur.`,
                    inline: false
                },
                {
                    name: `\`channel\``,
                    value: `Pour modifier les paramétre du channel.`,
                    inline: false
                }
            ]
        }
        msg.channel.send({ embed });

    }

    //-----------------------------------------------------

};