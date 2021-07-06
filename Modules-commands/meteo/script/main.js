const Discord = require('discord.js');
const fetch = require('node-fetch');
const { actionInterrupted } = require("../../../Modules-exports/functions.js");

module.exports.run = async (bot, msg, args) => {

  //-----------------------------------------------------

  if (!args) {

    return msg.channel.send({ embed: actionInterrupted("Il faut entré un nom de ville !") });

  }

  //-----------------------------------------------------

  const name = args;

  //-----------------------------------------------------

  try {

    const url = `http://api.weatherstack.com/current?access_key=0b3ae21c2a2f18691640f96683e13ac1&query=${name}`;

    let res = await fetch(url).then(url => url.json());

    if (res.success === false) {

      return msg.channel.send({ embed: actionInterrupted("Je n'ai pas trouvé cette ville... :(") });

    }

    const meteo = res;

    const embed = {
      color: 0x204b62,
      description: `Méteo du ${meteo.location.localtime} :`,
      thumbnail: {
        url: meteo.current.weather_icons[0]
      },
      fields: [
        {
          name: "• **Pays :**",
          value: meteo.location.country == 0 ? "Aucune pays" : meteo.location.country,
          inline: true
        },
        {
          name: "• **Region :**",
          value: meteo.location.region == 0 ? "Aucune region" : meteo.location.region,
          inline: true
        },
        {
          name: "• **Ville :**",
          value: meteo.location.name == 0 ? "Aucune ville" : meteo.location.name,
          inline: true
        },
        {
          name: "• **Temperature :**",
          value: meteo.current.temperature + "°c",
        },
        {
          name: "• **Ressenti temperature :**",
          value: meteo.current.feelslike + "°c",
        },
        {
          name: "• **Description :**",
          value: meteo.current.weather_descriptions,
        },
        {
          name: "• **Vitesse du vent :**",
          value: meteo.current.wind_speed,
        },
        {
          name: "• **Direction de vent :**",
          value: meteo.current.wind_dir,
        },
        {
          name: "• **Préssion :**",
          value: meteo.current.pressure,
        },
        {
          name: "• **Humidité :**",
          value: meteo.current.humidity,
        },
        {
          name: "• **Précipitations :**",
          value: meteo.current.precip,
        },
        {
          name: "• **Visibilité :**",
          value: meteo.current.visibility,
        },
        {
          name: "• **Couverture nuageuse :**",
          value: meteo.current.cloudcover,
        }
      ],
      footer: {
        icon_url: "https://userfiles.uptimerobot.com/img/600026-1568036847.png",
        text: "API Weatherstack"
      },
      timestamp: new Date()
    }
    msg.channel.send({ embed });

  } catch (e) {

    return msg.channel.send({ embed: actionInterrupted("Désolé une erreur est survenue.") });

  }

  //-----------------------------------------------------

};