const Discord = require('discord.js');
const mysql = require('mysql');

module.exports = async (bot, oldUser, newUser) => {

    //-----------------------------------------------------

    const user = newUser;

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
        con.query(`SELECT * FROM data_user WHERE user_id = \'${user.id}\'`, function (err, result) {
            if (err) throw err;

             //Si trouver
            if (result.length) {

                var sql = `UPDATE data_user SET user_name = \'${user.tag}\', user_avatar_id = \'${user.avatar ? user.avatar : user.defaultAvatarURL}\' WHERE user_id = \'${user.id}\'`;
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