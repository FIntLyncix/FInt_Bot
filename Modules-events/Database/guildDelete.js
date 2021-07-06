const Discord = require('discord.js');
const mysql = require('mysql');

module.exports = async (bot, guild) => {

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
            };

            i += 1;
        } while (i < bot.guilds.cache.size);

        return result;
    };

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
                var sql = `DELETE FROM data_serveur WHERE serveur_id='${guild.id}'`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                });
            };

        });
    } catch (error) {
        console.log("Impossible de se connecter à la base de donné.");
        console.log(error);
    };

    //-----------------------------------------------------

    // Je rentre tous les utilisateurs inconu de la table des "user", dans la table des "user"
    for (let i = 0; i < guild.memberCount; i++) {

        // Je récupère les données de ma cible
        const target = [...guild.members.cache.entries()][i][1];
        const sql = `DELETE FROM data_user WHERE user_id='${target.user.id}'`;

        // Je test si ma cible n'est pas un bot
        if (target.user.bot === false) {

            if (presense_member(target.user.id) == 1) {

                con.query(sql, function (err, result) {
                    if (err) throw err;
                });

            };

        };

    };

    //-----------------------------------------------------

};