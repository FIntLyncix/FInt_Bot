const Discord = require('discord.js');
const fetch = require('node-fetch');
const { actionInterrupted } = require("../../../Modules-exports/functions.js");

module.exports.run = async (bot, msg, args) => {

        //-----------------------------------------------------

        if (!args) {
                
                return msg.channel.send({ embed: actionInterrupted("Il faut entré un nom de compte Instagram.") });
        }

        //-----------------------------------------------------

        const name = args;

        //-----------------------------------------------------

        try {

                const url = `https://instagram.com/${name}/?__a=1`;

                let res = await fetch(url).then(url => url.json());

                if (!!res.graphql === false) {
                       
                        return msg.channel.send({ embed: actionInterrupted("Je n'ai pas trouvé ce compte... :(") });

                }

                const account = res.graphql.user;

                const embed = {
                        color: 0xc230a0,
                        title: `Compte de ${name} :`,
                        thumbnail: {
                                url: account.profile_pic_url_hd
                        },
                        fields: [
                                {
                                        name: "**• Name :**",
                                        value: name
                                },
                                {
                                        name: "• **Full name :**",
                                        value: !!account.full_name ? account.full_name : "** **"
                                },
                                {
                                        name: "• **Biography :**",
                                        value: !!account.biography ? account.biography : "** **"
                                },
                                {
                                        name: "• **Posts :**",
                                        value: account.edge_owner_to_timeline_media.count
                                },
                                {
                                        name: "• **Followers :**",
                                        value: account.edge_followed_by.count
                                },
                                {
                                        name: "• **Following :**",
                                        value: account.edge_follow.count
                                },
                                {
                                        name: "• **Private account :**",
                                        value: account.is_private ? "Yes 🔐" : "Nope 🔓"
                                },
                                {
                                        name: "• **Voir le compte :**",
                                        value: `[https://instagram.com/${name}](https://instagram.com/${name})`
                                }
                        ],
                        footer: {
                                icon_url: "https://i.pinimg.com/originals/09/7b/77/097b77494452f9352630bcf79697db4d.png",
                                text: "Instagram"
                        },
                        timestamp: new Date()
                }
                msg.channel.send({ embed });
        } catch (e) {

                return msg.channel.send({ embed: actionInterrupted("Désolé une erreur est survenue.") });

        }

        //-----------------------------------------------------

};