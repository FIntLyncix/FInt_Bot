const Discord = require('discord.js');
const mysql = require('mysql');

module.exports = {
    name: 'me',
    description: 'Pour modifier vos paramétres.',
    execute(bot, msg, args) {

        //-----------------------------------------------------

        // Configuration à l'accès à la base de donnée
        const database_access = require('../../../../Data/database-access.json');

        const con = mysql.createConnection({
            host: database_access.host,
            user: database_access.user,
            password: database_access.password,
            database: database_access.name,
            charset: 'utf8mb4'
        });

        //-----------------------------------------------------

        const embed = {
            color: 0x691566,
            title: `**Que voulez-vous faire :**`,
            description: "Cliquer sur la réaction de votre choix.",
            fields: [
                {
                    name: `1️⃣  Permets de modifier l'emoji de la commande (react).`,
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

            msg_send.react('1️⃣');

            const filter = (reaction, user) => user.id === msg.author.id;
            const collector = msg_send.createReactionCollector(filter, { time: 15000 });
            collector.on('collect', r => {

                if (r.emoji.name === "1️⃣") {

                    //===========================

                    const embed = {
                        color: 0x691566,
                        description: `Quel emoji voulez-vous ?`,
                    }
                    msg.channel.send({ embed }).then(msg_send2 => {

                        //-----------------------------------------------------

                        const filter = m => m.author.id === msg.author.id;
                        const collector = msg_send2.channel.createMessageCollector(filter, { time: 15000 });

                        collector.on('collect', m => {


                            try {
                                con.query(`SELECT * FROM data_user WHERE user_id = \'${msg.author.id}\'`, function (err, result) {
                                    if (err) throw err;

                                    //Si trouver
                                    if (result.length) {

                                        var sql = `UPDATE data_user SET user_emoji_command_react = \'${m.content}\' WHERE user_id = \'${msg.author.id}\'`;
                                        con.query(sql, function (err, result) {
                                            if (err) throw err;
                                        });

                                    };

                                });
                            } catch (error) {

                                console.log("Impossible de se connecter à la base de donnée.");
                                console.log(error);

                            };

                            //-----------------------------------------------------

                            m.content



                            collector.stop();
                        });

                        collector.on('end', collected => {

                            //Stop ▼
                            if (collected.size == 0) {

                                const embed = {
                                    color: 0xdd2e44,
                                    description: `:x: Commande annulée.`,//Send stop
                                }
                                msg.channel.send({ embed });
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

                    const embed = {
                        color: 0xdd2e44,
                        description: `:x: Commande annulée.`,
                    }
                    msg.channel.send({ embed });//Send stop
                }
                //End | Stop ▲

            });

            //-----------------------------------------------------

        });

        //-----------------------------------------------------

    }
};