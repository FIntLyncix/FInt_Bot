const Discord = require('discord.js');
const { getMember } = require("../../../Modules-exports/functions.js");

module.exports.run = async (bot, msg, args) => {

  //-----------------------------------------------------

  // Obtenir un membre à partir d'une mention, d'un identifiant ou d'un nom d'utilisateur
  let person = getMember(msg, args);

  if (!person || msg.author.id === person.id) {
    person = msg.guild.members.cache
      .filter(m => m.id !== msg.author.id)
      .random();
  };

  const love = Math.random() * 100;
  const loveIndex = Math.floor(love / 10);
  const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

  const embed = {
    color: 0xdd2e44,
    fields: [
      {
        name: `☁ **${person.displayName}** aime **${msg.member.displayName}** a :`,
        value: `💟 ${Math.floor(love)}%\n\n${loveLevel}`
      }
    ]
  };

  msg.channel.send({ embed });

  //-----------------------------------------------------

};