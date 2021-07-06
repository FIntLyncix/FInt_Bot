const Discord = require('discord.js');
const { actionWellFinished, actionInterrupted, actionBadlyFinished } = require("../../../Modules-exports/functions.js");

module.exports.run = async (bot, msg, args) => {

    //-----------------------------------------------------

    const embed = {
        color: 0x691566,
        title: `**Que voulez-vous faire :**`,
        description: "Cliquer sur la réaction de votre choix.",
        fields: [
            {
                name: `🔨  Permets de crée une catégorie.`,
                value: `** **`,
                inline: false
            },
            {
                name: `✒  Permets de renommée une catégorie.`,
                value: `** **`,
                inline: false
            },
            {
                name: `❌  Permets de supprimer une catégorie.`,
                value: `** **`,
                inline: false
            }
        ],
        footer: {
            text: "La commande s'annule automatiquement."
        }
    }
    msg.channel.send({ embed }).then(msg_send => {

        //-----------------------------------------------------

        msg_send.react('🔨').then(() => msg_send.react('✒')).then(() => msg_send.react('❌'));

        const filter = (reaction, user) => user.id === msg.author.id;
        const collector = msg_send.createReactionCollector(filter, { time: 15000 });
        collector.on('collect', r => {


            if (r.emoji.name === "🔨") {

                //===========================

                const embed = {
                    color: 0x691566,
                    description: `Quel nom voulez-vous donnée à votre catégorie ?`,
                }
                msg.channel.send({ embed }).then(msg_send2 => {

                    //-----------------------------------------------------

                    const filter = m => m.author.id === msg.author.id;
                    const collector = msg_send2.channel.createMessageCollector(filter, { time: 15000 });

                    collector.on('collect', m => {

                        msg.guild.channels.create(m.content, { type: 'category', reason: `Commande réalisée par ${msg.author.username}` }).then(category => {

                            msg.channel.send({ embed: actionWellFinished("La catégorie a été créé avec succès.") });

                        }, (error) => {

                            //Error ▼
                            if (!msg.guild.member(bot.user).hasPermission("MANAGE_CHANNELS")) {

                                msg.channel.send({ embed: actionInterrupted("Le bot n'a pas la permissions") });

                            } else if (m.content.length > 100) {

                                msg.channel.send({ embed: actionInterrupted("Le nom est trop long !") });

                            } else {

                                msg.channel.send({ embed: actionInterrupted("Désolé une erreur est survenue !") });

                            }
                            //End | Error ▲

                        });

                        collector.stop();
                    });

                    collector.on('end', collected => {

                        //Stop ▼
                        if (collected.size == 0) {

                            msg.channel.send({ embed: actionBadlyFinished("Commande annulée.") });

                        }
                        //End | Stop ▲

                    });

                    //-----------------------------------------------------

                });

                //===========================

            } else if (r.emoji.name === "✒") {

                //===========================

                const embed = {
                    color: 0x691566,
                    description: `Quel catégorie vouler-vous renommée ?`,
                }
                msg.channel.send({ embed }).then(msg_send2 => {

                    //-----------------------------------------------------

                    const filter = m => m.author.id === msg.author.id;
                    const collector = msg_send2.channel.createMessageCollector(filter, { time: 15000 });

                    collector.on('collect', m => {

                        const fetchedCategory = msg.guild.channels.cache.find(r => r.name === m.content.replace(' ', '-') && r.type == "category");

                        if (!!fetchedCategory) {

                            const embed = {
                                color: 0x691566,
                                description: `Quel nouveau nom voulez-vous donnée a la catégorie **${fetchedCategory.name}** ?`,
                            }
                            msg.channel.send({ embed }).then(msg_send3 => {

                                //-----------------------------------------------------

                                const filter = m => m.author.id === msg.author.id;
                                const collector = msg_send3.channel.createMessageCollector(filter, { time: 15000 });

                                collector.on('collect', m => {

                                    fetchedCategory.setName(m.content, { type: 'category', reason: `Commande réalisée par ${msg.author.username}` }).then(category => {

                                        msg.channel.send({ embed: actionWellFinished("La catégorie a été renommée avec succès.") });

                                    }, (error) => {

                                        //Error ▼
                                        if (!msg.guild.member(bot.user).hasPermission("MANAGE_CHANNELS")) {

                                            msg.channel.send({ embed: actionInterrupted("Le bot n'a pas la permissions") });

                                        } else if (m.content.length > 100) {

                                            msg.channel.send({ embed: actionInterrupted("Le nom est trop long !") });

                                        } else {

                                            msg.channel.send({ embed: actionInterrupted("Désolé une erreur est survenue !") });

                                        }
                                        //End | Error ▲

                                    });

                                    collector.stop();
                                });

                                collector.on('end', collected => {

                                    //Stop ▼
                                    if (collected.size == 0) {

                                        msg.channel.send({ embed: actionBadlyFinished("Commande annulée.") });

                                    }
                                    //End | Stop ▲

                                });

                                //-----------------------------------------------------

                            });


                        } else {

                            msg.channel.send({ embed: actionInterrupted(`La catégorie **${m.content}** n'existe pas.`) });

                        }

                        collector.stop();
                    });

                    collector.on('end', collected => {

                        //Stop ▼
                        if (collected.size == 0) {

                            msg.channel.send({ embed: actionBadlyFinished("Commande annulée.") });

                        }
                        //End | Stop ▲

                    });

                    //-----------------------------------------------------

                });

                //===========================

            } else if (r.emoji.name === "❌") {

                //===========================

                const embed = {
                    color: 0x691566,
                    description: `Quel catégorie voulez-vous supprimer ?`,
                }
                msg.channel.send({ embed }).then(msg_send2 => {

                    //-----------------------------------------------------

                    const filter = m => m.author.id === msg.author.id;
                    const collector = msg_send2.channel.createMessageCollector(filter, { time: 15000 });

                    collector.on('collect', m => {

                        const fetchedCategory = msg.guild.channels.cache.find(r => r.name === m.content.replace(' ', '-') && r.type == "category");

                        if (!!fetchedCategory) {

                            fetchedCategory.delete({ type: 'category', reason: `Commande réalisée par ${msg.author.username}` }).then(category => {

                                msg.channel.send({ embed: actionWellFinished("La catégorie a été supprimé avec succès.") });

                            }, (error) => {

                                //Error ▼
                                if (!msg.guild.member(bot.user).hasPermission("MANAGE_CHANNELS")) {

                                    msg.channel.send({ embed: actionInterrupted("Le bot n'a pas la permissions") });

                                } else if (m.content.length > 100) {

                                    msg.channel.send({ embed: actionInterrupted("Le nom est trop long !") });

                                } else {

                                    msg.channel.send({ embed: actionInterrupted("Désolé une erreur est survenue !") });

                                }
                                //End | Error ▲

                            });

                        } else {

                            msg.channel.send({ embed: actionInterrupted(`La catégorie **${m.content}** n'existe pas.`) });

                        }

                        collector.stop();
                    });

                    collector.on('end', collected => {

                        //Stop ▼
                        if (collected.size == 0) {

                            msg.channel.send({ embed: actionBadlyFinished("Commande annulée.") });

                        }
                        //End | Stop ▲

                    });

                    //-----------------------------------------------------

                });

                //===========================

            }

        });

        collector.on('end', collected => {

            //Stop ▼
            if (collected.size == 0) {

                msg.channel.send({ embed: actionBadlyFinished("Commande annulée.") });

            }
            //End | Stop ▲

        });

    });

    //-----------------------------------------------------

};