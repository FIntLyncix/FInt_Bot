const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {

    //-----------------------------------------------------

    const embed = {
        color: 0x691566,
        description: `Quel est le titre du embed ?`,
    }
    msg.channel.send({ embed }).then(msg_send1 => {

        //-----------------------------------------------------

        const filter = m => m.author.id === msg.author.id;
        const collector = msg_send1.channel.createMessageCollector(filter, { time: 15000 });

        collector.on('collect', m => {

            m.delete();

            msg_send1.delete();

            const embedTitre = m.content;

            const embed = {
                color: 0x691566,
                description: `Quel est le text du embed ?`,
            };
            msg.channel.send({ embed }).then(msg_send2 => {

                //-----------------------------------------------------

                const filter = m => m.author.id === msg.author.id;
                const collector = msg_send2.channel.createMessageCollector(filter, { time: 15000 });

                collector.on('collect', m => {

                    m.delete();

                    msg_send2.delete();

                    const embedText = m.content;

                    var embed = {
                        author: {
                            name: msg.author.username,
                            icon_url: msg.author.avatarURL()
                        },
                        color: 0x000000,
                        title: embedTitre,
                        description: embedText
                    };
                    msg.channel.send({ embed });

                    collector.stop();
                });

                collector.on('end', collected => {

                    //Stop ▼
                    if (collected.size == 0) {

                        const embed = {
                            color: 0xdd2e44,
                            description: `:x: Commande annulée.`,//Send stop
                        };
                        msg.channel.send({ embed });
                    };
                    //End | Stop ▲

                });

                //-----------------------------------------------------

            });

            collector.stop();
        });

        collector.on('end', collected => {

            //Stop ▼
            if (collected.size == 0) {

                const embed = {
                    color: 0xdd2e44,
                    description: `:x: Commande annulée.`,//Send stop
                };
                msg.channel.send({ embed });
            };
            //End | Stop ▲

        });

        //-----------------------------------------------------
    });

    //-----------------------------------------------------

};