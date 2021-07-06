const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {

    //-----------------------------------------------------

    const message = await msg.channel.send("Pong !");

    //-----------------------------------------------------

    const embed = {
        color: 0xec740a,
        fields: [
            {
                name: "**Latency is :**",
                value: Math.floor(message.createdTimestamp - msg.createdTimestamp) + "ms",
                inline: true
            },
            {
                name: "**API Latency is :**",
                value: Math.round(bot.ws.ping) + "ms",
                inline: true
            }
        ]
    }
    message.edit({ embed });

    //-----------------------------------------------------

};