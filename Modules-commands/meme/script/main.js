const Discord = require('discord.js');
const randomPuppy = require("random-puppy");

module.exports.run = async (bot, msg, args) => {

        //-----------------------------------------------------

        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);

        //-----------------------------------------------------
        
        const embed = {
          color: "RANDOM",
          title: `De /r/${random}`,
          image: {
            url: img
          },
          url: `https://reddit.com/r/${random}`,
        }
        msg.channel.send({ embed });

        //-----------------------------------------------------

};