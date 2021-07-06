const Discord = require('discord.js');
const { actionInterrupted } = require("../../../Modules-exports/functions.js");

module.exports.run = async (bot, msg, args) => {

  //-----------------------------------------------------

  if (args == 0) {
    var target = msg.guild.member(msg.author);
  } else {
    var target = msg.guild.member(msg.mentions.users.first());
  }
  if (!target) {
    return msg.channel.send({ embed: actionInterrupted("L'utilisateur ne se trouve pas sur Terre !") });
  }

  let name_target = target ? target.displayName : target.username;
  let i = 0;
  let data_spotify = 0;

  do {
    if (target.user.presence.activities[i] == "Spotify") {
      data_spotify = target.user.presence.activities[i]
    }
    i += 1;
  } while (i < target.user.presence.activities.length);

  if (data_spotify == 0) {
    if (args == 0) {
      return msg.channel.send({ embed: actionInterrupted("Spotify non détecté !") });
    } else {
      if (msg.guild.member(msg.mentions.users.first()) == msg.guild.member(msg.author)) {
        return msg.channel.send({ embed: actionInterrupted("Spotify non détecté !") });
      } else {
        return msg.channel.send({ embed: actionInterrupted(`Spotify de **${name_target}** non détecté !`) });
      }
    }
  }

  var image_music = data_spotify.assets.largeImage

  image_music = image_music.split('spotify:');
  image_music = image_music[1];
  const embed = {
    color: 0x1db954,
    thumbnail: {
      url: `https://i.scdn.co/image/${image_music}`
    },
    title: `${name_target} écoute :`,
    fields: [
      {
        name: "Nom de la musique :",
        value: data_spotify.details
      },
      {
        name: "De :",
        value: data_spotify.state
      },
      {
        name: "sur l'album :",
        value: data_spotify.assets.largeText
      },
      {
        name: "Écoutez sur spotify :",
        value: `** [${data_spotify.details} de ${data_spotify.state} ](https://open.spotify.com/track/${data_spotify.syncID}) **`
      }
    ],
    footer: {
      icon_url: "https://cdn.discordapp.com/app-assets/544612491460870146/717822120071135255.png",
      text: "Spotify"
    },
    timestamp: new Date()
  }
  msg.channel.send({ embed });


  //-----------------------------------------------------

};