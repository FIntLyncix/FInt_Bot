const Discord = require('discord.js');
const mysql = require('mysql');

module.exports = async (bot, oldMember, newMember) => {
/*
    const member = newMember;

    //-----------------------------------------------------

    const database_access = require('../database-access.json');

    const con = mysql.createConnection({
        host: database_access.host,
        user: database_access.user,
        password: database_access.password,
        database: database_access.name
    });

    //-----------------------------------------------------

    try {
        con.query(`SELECT * FROM data_user WHERE id = '${member.id}'`, function (err, result) {

            if (err) throw err;

            //Si trouver
            if (result.length) {

                const user = bot.guilds.cache.find(se => se.id === member.guild.id).members.cache.find(me => me.id === member.user.id);

                var sql = `UPDATE data_user SET id = '${user.user.id}', name = '${user.user.tag}', date_creation = '${user.user.createdAt}', avatar_id = '${user.user.avatar}'`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                });

            }

        });
    } catch (error) {

        console.log("Impossible de se connecter à la base de donnée.");
        console.log(error);

    }

    //-----------------------------------------------------
*/
};