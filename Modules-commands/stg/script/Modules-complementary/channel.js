const Discord = require('discord.js');

module.exports = {
    name: 'stg_channel',
    description: 'Pour modifier les paramétres du channel.',
    execute(bot, msg, args) {
        msg.channel.send('test send');



        
    }
};