const Discord = require('discord.js');
const mysql = require('mysql');

module.exports = async (bot, guild) => {

    console.log(guild);

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

    // Création d'un nouvel utilisateur dans la table des "serveur"
    try {

        con.query(`SELECT * FROM data_serveur WHERE serveur_id = '${guild.id}'`, function (err, result) {
            if (err) throw err;

            var createdAt = guild.createdAt.toString().split(" ");

            //Si non trouver
            if (result.length == 0) {

                var sql = `INSERT INTO data_serveur (serveur_id, serveur_name, serveur_date_creation, serveur_number_user, serveur_number_channel, serveur_icon_id, serveur_number_msg) VALUES('${guild.id}', '${guild.name}', '${createdAt[2] + ' ' + createdAt[1] + ' ' + createdAt[3]}', '${guild.memberCount}', '${guild.channels.cache.size}', '${guild.icon}', '0')`;
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

    // Je rentre tous les utilisateurs inconu de la table des "user", dans la table des "user"
    for (let i = 0; i < guild.memberCount; i++) {

        // Je récupère les données de ma cible
        const target = [...guild.members.cache.entries()][i][1];
        const sql = `INSERT INTO data_user (user_id, user_name, user_date_creation, user_emoji_command_react, user_avatar_id, user_number_msg) VALUES('${target.user.id}', '${target.user.tag}', '${target.user.createdAt}', '😀', '${target.user.avatar ? target.user.avatar : target.user.defaultAvatarURL}', '0')`;
        
        // Je test si ma cible n'est pas un bot
        if (target.user.bot == false) {
            
            try {
                
                con.query(`SELECT * FROM data_user WHERE user_id = '${target.user.id}'`, function (err, result) {
                    if (err) throw err;
                   
                    // Si non trouver
                    if (result.length == 0) {
                        
                        // Partie : Data_user
                        
                        con.query(sql, function (err, result) {

                            if (err) throw err;

                        });
                        // ==============================

                    };

                });

            } catch (error) {
                console.log("Impossible de se connecter à la base de donnée.");
                console.log(error);
            };

        };

    };

    //-----------------------------------------------------

};