const Discord = require('discord.js');
const mysql = require('mysql');

module.exports = async (bot, member) => {

    //-----------------------------------------------------

    function presense_member(member_id) {

        // Return 0, 1 ou 2
        // Si 0 pas là
        // Si 1 là mais que dans un serveur
        // Si 2 là dans plusieurs serveurs

        let i = 0;
        let result = 0;
        do {

            var serveur = [...bot.guilds.cache.entries()][i][0];

            const search_member = bot.guilds.cache.get(serveur).members.cache.find(me => me.id === member_id);

            if (!!search_member === true) {
                result = result + 1;
            }
            if (result >= 1) {
                break;
            }

            i += 1;
        } while (i < bot.guilds.cache.size);

        return result;
    }

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
        con.query(`SELECT * FROM data_user WHERE user_id = '${member.id}'`, function (err, result) {
            if (err) throw err;

            //Si trouver
            if (result.length) {

                if (presense_member(member.id) === 0) {

                    //const user = bot.guilds.cache.find(se => se.id === member.guild.id).members.cache.find(me => me.id === member.user.id);
                    var sql = `DELETE FROM data_user WHERE user_id='${member.id}'`;
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                    });

                };

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