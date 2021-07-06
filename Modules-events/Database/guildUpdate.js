const Discord = require('discord.js');
const mysql = require('mysql');

module.exports = async (bot, oldGuild, newGuild) => {

    //-----------------------------------------------------

    const guild = newGuild;
   
    //-----------------------------------------------------

    const database_access = require('../../Data/database-access.json');

    const con = mysql.createConnection({
        host: database_access.host,
        user: database_access.user,
        password: database_access.password,
        database: database_access.name
    });

    //-----------------------------------------------------

    try {
        con.query(`SELECT * FROM data_serveur WHERE serveur_id = '${guild.id}'`, function (err, result) {
            if (err) throw err;

             //Si trouver
            if (result.length) {

                var sql = `UPDATE data_serveur SET serveur_name = '${guild.name}', serveur_number_user = '${guild.memberCount}', serveur_number_channel = '${guild.channels.cache.size}', serveur_icon_id = '${guild.icon}' WHERE serveur_id = '${guild.id}'`;

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