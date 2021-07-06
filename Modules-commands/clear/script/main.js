const Discord = require('discord.js');
const { actionWellFinished, actionInterrupted } = require("../../../Modules-exports/functions.js");

module.exports.run = async (bot, msg, args) => {

    //-----------------------------------------------------

    if (!args) return msg.channel.send({ embed: actionInterrupted("Tu dois préciser un nombre de messages à supprimer !") });
    if (args > 100) return msg.channel.send({ embed: actionInterrupted("Tu dois préciser un nombre inférieur à 100 !") });
    if (args < 0) return msg.channel.send({ embed: actionInterrupted("Tu dois préciser un nombre supérieur à 0 !") });
    if (isNaN(args)) return msg.channel.send({ embed: actionInterrupted("Tu dois préciser un nombre entre 1 et 100 !") });
    
    try {

        msg.channel.bulkDelete(args);

        msg.channel.send({ embed: actionWellFinished(`Les messages ont bien été supprimés du channel !`) }).then(async msg => {
            setTimeout(() => {
                msg.delete();
            }, 3000);
        });

        const embed = {
            color: 0x008bff,
            title: `${msg.author.tag} a clear un channel :`,
            fields: [
                {
                    name: "Channel :",
                    value: `Nom = <#${msg.channel.id}>\nID = ${msg.channel.id}`
                },
                {
                    name: "Messages supprimé :",
                    value: args
                },
                {
                    name: "• **Modérateur qui la clear :**",
                    value: `Nom = ${msg.author.tag}\nID = ${msg.author.id}`
                }
            ],
            timestamp: new Date(),
        };
        const channel = msg.guild.channels.cache.find(ch => ch.name === 'activity');
        channel.send({ embed });

    } catch (error) {

        msg.channel.send(error.message);

    };

    //-----------------------------------------------------

};