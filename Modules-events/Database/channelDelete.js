const Discord = require('discord.js');
const mysql = require('mysql');

module.exports = async (bot, channel) => {

    //-----------------------------------------------------

    const database_access = require('../../Data/database-access.json');

    const con = mysql.createConnection({
        host: database_access.host,
        user: database_access.user,
        password: database_access.password,
        database: database_access.name
    });

    //-----------------------------------------------------

    if (channel.type == 'dm') return;
    
    try {
        con.query(`SELECT * FROM data_serveur WHERE serveur_id = '${channel.guild.id}'`, function (err, result) {
            if (err) throw err;

            //Si trouver
            if (result.length) {

                var sql = `UPDATE data_serveur SET serveur_number_channel = '${channel.guild.channels.cache.size}' WHERE serveur_id = '${channel.guild.id}'`;

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