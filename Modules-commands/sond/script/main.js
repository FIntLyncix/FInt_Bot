const Discord = require('discord.js');
const { actionInterrupted } = require("../../../Modules-exports/functions.js");

module.exports.run = async (bot, msg, args) => {

    //-----------------------------------------------------

    msg.delete();

    if (!args) return msg.channel.send({ embed: actionInterrupted("Tu dois poser une question !") });

    const embed = {
        color: 0x40A497,
        thumbnail: {
            url: "https://cdn.discordapp.com/attachments/482179956743602197/486860823055302657/Sondage4.png"
        },
        description: `**Sondage de :** <@${msg.author.id}>`,
        fields: [
            {
                name: `** **`,
                value: `**${args}**`
            },
            {
                name: `** **`,
                value: `**Veuillez répondre qu'une seule fois !**`
            }
        ],
        timestamp: new Date(),
    }

    msg.channel.send({ embed }).then(function (msg) {
        msg.react("✅")
        setTimeout(() => {
            msg.react("❌");
        }, 1000)
    })

    //-----------------------------------------------------

};