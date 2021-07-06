const Discord = require('discord.js');
const mysql = require('mysql');
const { status_format, createdAt_format, joinedAt_format, actionInterrupted } = require("../../../Modules-exports/functions.js");

module.exports.run = async (bot, msg, args) => {

    //-----------------------------------------------------

    const database_access = require('../../../Data/database-access.json');

    const con = mysql.createConnection({
        host: database_access.host,
        user: database_access.user,
        password: database_access.password,
        database: database_access.name
    });

    args = args.split(' ');

    con.connect(function (err) {

        if (args[0] == "user") {
            msg.delete();

            if (!args[1]) {
                var target = msg.guild.member(msg.author);
            } else {

                if (msg.mentions.users.size === 0) {
                    return msg.channel.send({ embed: actionInterrupted("Vous devez mentionner un utilisateur !") });
                }
                var target = msg.guild.member(msg.mentions.users.first());
                if (!target) {
                    return msg.channel.send({ embed: actionInterrupted("L'utilisateur ne se trouve pas sur Terre !") });
                }
            }


            if (err) throw err;
            con.query(`SELECT * FROM stats_user WHERE user_id = '${target.user.id}'`, function (err, result) {
                if (err) throw err;

                const embed = {
                    color: 0x691566,
                    title: `Voici les statistiques de __${target.user.username}__  : `,
                    fields: [
                        {
                            name: "Pseudo :",
                            value: target.user.username
                        },
                        {
                            name: "Tag :",
                            value: target.user.tag
                        },
                        {
                            name: "ID :",
                            value: target.user.id
                        },
                        {
                            name: "Statue :",
                            value: status_format(target.user)
                        },
                        {
                            name: "Date d'inscription sur discord :",
                            value: createdAt_format(target.user)
                        },
                        {
                            name: `Message envoyé sur **${msg.guild.name}** :`,
                            value: `**${result[0].user_number_msg}** message${result[0].user_number_msg !== 1 ? 's' : ''} envoyé.`
                        },
                        {
                            name: `Date de venue sur **${msg.guild.name}** :`,
                            value: joinedAt_format(target.guild)
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: `By ᚖ᚛⊰≬⊱᚜Proxima᚛⊰≬⊱᚜ᚖ#1461`
                    },
                }
                msg.reply("Tu peux regarder tes messages privés !").then(async msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 3000)
                })
                msg.author.send({ embed });
            });

        } else if (args[0] == "serveur") {

            const target = msg.guild;

            con.query(`SELECT * FROM stats_serveur WHERE serveur_id = '${target.id}'`, function (err, result) {
                if (err) throw err;

                var messageCount = ++result[0].serveur_number_msg;

                const embed = {
                    color: 0x691566,
                    title: `Voici les statistiques du serveur __${target.name}__  : `,
                    fields: [
                        {
                            name: "Nom :",
                            value: target.name
                        },
                        {
                            name: "ID :",
                            value: target.id
                        },
                        {
                            name: "Date de création :",
                            value: createdAt_format(target)
                        },
                        {
                            name: "Créé par :",
                            value: target.owner.displayName
                        },
                        {
                            name: "Total message :",
                            value: messageCount
                        },
                        {
                            name: `Membres :`,
                            value: target.members.cache.filter(m => m.user.bot === false).size,
                            inline: true
                        },
                        {
                            name: "Bots :",
                            value: target.members.cache.filter(m => m.user.bot === true).size,
                            inline: true
                        },
                        {
                            name: "** **",
                            value: "** **",
                            inline: true
                        },
                        {
                            name: "Catégories :",
                            value: target.channels.cache.filter(ch => ch.type === 'category').size,
                            inline: true
                        },
                        {
                            name: "Salons textuels :",
                            value: target.channels.cache.filter(ch => ch.type === 'text').size,
                            inline: true
                        },
                        {
                            name: "Salons vocaux :",
                            value: target.channels.cache.filter(ch => ch.type === 'voice').size,
                            inline: true
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: `By ᚖ᚛⊰≬⊱᚜Proxima᚛⊰≬⊱᚜ᚖ#1461`
                    },
                }
                msg.channel.send({ embed });
            });

        } else {
            const embed = {
                color: 0xffffff,
                description: `\`\`\`fix\nNot found <"user" [Mention], "serveur"> !\n\`\`\``
            }
            msg.channel.send({ embed });
        }

    });

    //-----------------------------------------------------

};