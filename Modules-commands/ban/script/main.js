const Discord = require('discord.js');
const { actionWellFinished, actionInterrupted } = require("../../../Modules-exports/functions.js");

module.exports.run = async (bot, msg, args) => {

    //-----------------------------------------------------

    if (msg.mentions.users.size === 0) {
        return msg.channel.send({ embed: actionInterrupted("Vous devez mentionner un utilisateur !") });
    };
    var ban = msg.guild.member(msg.mentions.users.first());
    if (!ban) {
        return msg.channel.send({ embed: actionInterrupted("L'utilisateur ne se trouve pas sur Terre !") });
    };

    ban.ban().then(member => {
        const embed = {
            color: 0x691566,
            title: `${msg.author.tag} a banni un membre :`,
            fields: [
                {
                    name: "• **Menbre banni :**",
                    value: `Nom = ${member.user.tag}\nID = ${member.user.id}`
                },
                {
                    name: "• **Modérateur qui la banni :**",
                    value: `Nom = ${msg.author.tag}\nID = ${msg.author.id}`
                },
                {
                    name: "• **Raison :**",
                    value: `En dev...`
                }
            ],
            timestamp: new Date(),
        };
        const channel = msg.guild.channels.cache.find(ch => ch.name === 'activity');
        channel.send({ embed });

        msg.channel.send({ embed: actionWellFinished(`Le membre a bien été banni !`) });

    });

    //-----------------------------------------------------

};