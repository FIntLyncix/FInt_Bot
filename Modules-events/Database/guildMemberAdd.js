const Discord = require('discord.js');
const mysql = require('mysql');

module.exports = async (bot, member) => {

    //-----------------------------------------------------

    const database_access = require('../../Data/database-access.json');

    const con = mysql.createConnection({
        host: database_access.host,
        user: database_access.user,
        password: database_access.password,
        database: database_access.name,
        charset: 'utf8mb4'
    });

    //-----------------------------------------------------

    try {
        con.query(`SELECT * FROM data_user WHERE user_id = '${member.id}'`, function (err, result) {

            if (err) throw err;

            //Si non trouver
            if (!result.length) {

                var sql = `INSERT INTO data_user (user_id, user_name, user_date_creation, user_emoji_command_react, user_avatar_id, user_number_msg) VALUES('${member.user.id}', '${member.user.tag}', '${member.user.createdAt}', '😀', '${member.user.avatar ? member.user.avatar : member.user.defaultAvatarURL}', '0')`;
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

    try {
        con.query(`SELECT * FROM data_serveur WHERE serveur_id = '${member.guild.id}'`, function (err, result) {
            if (err) throw err;

            //Si trouver
            if (result.length) {

                var sql = `UPDATE data_serveur SET serveur_number_user = '${member.guild.memberCount}' WHERE serveur_id = '${member.guild.id}'`;

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

};