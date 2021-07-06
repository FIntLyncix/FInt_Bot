const Discord = require('discord.js');
const mysql = require('mysql');
const prefix = process.env.PREFIX;

module.exports = async (bot, msg) => {

    //-----------------------------------------------------

    //Eléments rejeté
    if (msg.channel.type == "dm") return;
    if (msg.author.bot) return;
    if (msg.content.startsWith(prefix)) return;

    //-----------------------------------------------------

    // Récupération du fichier de config de la base de données
    const database_access = require('../../Data/database-access.json');

    // Récupération des informations pour se connecter à la base de données,
    // "charset" sert à pouvoir entrer des émoji dans la base de données
    const con = mysql.createConnection({
        host: database_access.host,
        user: database_access.user,
        password: database_access.password,
        database: database_access.name,
        charset: 'utf8mb4'
    });

    //-----------------------------------------------------

    try {
        con.connect(function (err) {

            var type_all = [
                ["data_user", "user_id", "user_number_msg", msg.author.id],
                ["data_serveur", "serveur_id", "serveur_number_msg", msg.guild.id],
                ["stats_bot", "bot_id", "bot_number_msg", bot.user.id]
            ];

            for (let i = 0; i < 3; i++) {

                con.query(`SELECT * FROM ${type_all[i][0]} WHERE ${type_all[i][1]} = '${type_all[i][3]}'`, function (err, result) {
                    if (err) throw err;

                    //Si non trouver
                    if (result.length == 0) {

                        if (i === 0) {
                            requestInsert = `INSERT INTO data_user (user_id, user_name, user_date_creation, user_emoji_command_react, user_avatar_id, user_number_msg) VALUES('${msg.author.id}', '${msg.author.tag}', '${msg.author.createdAt}', '😀', '${msg.author.avatar ? msg.author.avatar : msg.author.defaultAvatarURL}', '1')`;
                        } else if (i === 1) {
                            var createdAt = msg.guild.createdAt.toString().split(" ");
                            requestInsert = `INSERT INTO data_serveur (serveur_id, serveur_name, serveur_date_creation, serveur_number_user, serveur_number_channel, serveur_icon_id, serveur_number_msg) VALUES('${msg.guild.id}', '${msg.guild.name}', '${createdAt[2] + ' ' + createdAt[1] + ' ' + createdAt[3]}', '${msg.guild.memberCount}', '${msg.guild.channels.cache.size}', '${msg.guild.icon}', '1')`;
                        } else if (i === 2) {
                            requestInsert = `INSERT INTO ${type_all[i][0]} (${type_all[i][1]}, ${type_all[i][2]}) VALUES ('${type_all[i][3]}', '1')`;
                        };

                        var sql = requestInsert;
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                        });
                    } else {
                        var type1 = [++result[0].user_number_msg, ++result[0].serveur_number_msg, ++result[0].bot_number_msg];

                        var type2 = [result[0].user_id, result[0].serveur_id, result[0].bot_id];

                        var number = type1[i];

                        var sql = `UPDATE ${type_all[i][0]} SET ${type_all[i][2]} = '${number}' WHERE ${type_all[i][1]} = '${type2[i]}'`;
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                        });
                    };
                });

            };

        });
    } catch (error) {
        console.log("Impossible de se connecter à la base de donnée.");
        console.log(error);
    };

    //-----------------------------------------------------

};
/*

*/