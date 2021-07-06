const Discord = require('discord.js');
const { actionWellFinished, actionInterrupted, actionBadlyFinished } = require("../../../Modules-exports/functions.js");

module.exports.run = async (bot, msg, args) => {

	//-----------------------------------------------------

	// Fonction pour résultats du jeu ▼
	async function promptMessage(msg, time) {
		// Nous mettons le temps en secondes, avec cela, il est transféré à MS
		time *= 1000;

		// Autoriser uniquement les réactions de l'auteur,
		// et les emoji doivent être dans le tableau que nous avons fourni.
		const filter = m => m.author.id === msg.author.id;

		// Et bien sûr, attendez les réactions ▼
		// Errors: ['time'] treats ending because of the time limit as an error
		return msg.channel.awaitMessages(filter, { max: 1, time: time, errors: ['time'] })
			.then(collected => collected.first())
			.catch(collected => {

			});
	};

	//-----------------------------------------------------

	let exit = false;

	while (exit === false) {

		const embedLoading = {
			color: 0x691566,
			title: "Loading..."
		}
		const msgSending = await msg.channel.send({ embed: embedLoading });

		//---------------------------

		const embedChoice = {
			color: 0x691566,
			title: "Tapez la commande de votre choix :",
			description: `• **1** : Pour reporter un bug.
		• **2** : Pour faire une demande d'amélioration.
		• **Exit** : Pour quitter.`
		}
		msgSending.edit({ embed: embedChoice });

		//---------------------------

		var msgReceived = await promptMessage(msg, 10);
	
		if (msgReceived == undefined) {

			msg.channel.send({ embed: actionBadlyFinished("Commande annulée.") });

			exit = true;
			break;

		} else if (msgReceived.content == 1) {

			msgReceived.delete();

			const embedChoice = {
				color: 0x691566,
				title: "Écrivez votre bug :",
				footer: {
					text: "(Vous n'avez que 20s pour écrire, préparez votre texte en amont pour ne pas avoir de problème.)"
				},
			}
			msgSending.edit({ embed: embedChoice });

			msgReceived = await promptMessage(msg, 20);

			if (msgReceived == undefined) {

				msg.channel.send({ embed: actionBadlyFinished("Commande annulée.") });
	
				exit = true;
				break;
	
			} else if (msgReceived.content.toLowerCase() == "exit") {

				msg.channel.send({ embed: actionWellFinished("La commande a bien été annulée.") });
	
				exit = true;
				break;
	
			} else {

				const embedBug = {
					color: 0x691566,
					title: "Bug :",
					fields: [
						{
							name: "• **Report de :**",
							value: `Name = ${msg.author.tag}\nID = ${msg.author.id}`
						},
						{
							name: "• **Envoyer depuis le serveur :**",
							value: `Name = ${msg.guild.name}\nID = ${msg.guild.id}`
						},
						{
							name: `• **Envoyer depuis le channel :**`,
							value: `Name = ${msg.channel.name}\nID = ${msg.channel.id}`
						},
						{
							name: "• Bug :",
							value: msgReceived.content
						}
					],
					timestamp: new Date(),
					footer: {
						text: `Bot by Ŀyπcῑx#1461`
					}
				};
				const channel = bot.guilds.cache.find(server => server.id === '718158777588645918').channels.cache.find(ch => ch.id === '747797501649879161');
				channel.send({ embed: embedBug });
			
				msg.channel.send({ embed: actionWellFinished("Votre report a bien été pris en compte !") });

				exit = true;
				break;

			};

		} else if (msgReceived.content == 2) {

			msgReceived.delete();

			const embedChoice = {
				color: 0x691566,
				title: "Écrivez votre demande :",
				footer: {
					text: "(Vous n'avez que 20s pour écrire, préparez votre texte en amont pour ne pas avoir de problème.)"
				},
			}
			msgSending.edit({ embed: embedChoice });

			msgReceived = await promptMessage(msg, 20);

			if (msgReceived == undefined) {

				msg.channel.send({ embed: actionBadlyFinished("Commande annulée.") });
	
				exit = true;
				break;
	
			} else if (msgReceived.content.toLowerCase() == "exit") {

				msg.channel.send({ embed: actionWellFinished("La commande a bien été annulée.") });
	
				exit = true;
				break;
	
			} else {

				const embedBug = {
					color: 0x691566,
					title: "Demande :",
					fields: [
						{
							name: "• **Report de :**",
							value: `Name = ${msg.author.tag}\nID = ${msg.author.id}`
						},
						{
							name: "• **Envoyer depuis le serveur :**",
							value: `Name = ${msg.guild.name}\nID = ${msg.guild.id}`
						},
						{
							name: `• **Envoyer depuis le channel :**`,
							value: `Name = ${msg.channel.name}\nID = ${msg.channel.id}`
						},
						{
							name: "• Demande :",
							value: msgReceived.content
						}
					],
					timestamp: new Date(),
					footer: {
						text: `Bot by Ŀyπcῑx#1461`
					}
				};
				const channel = bot.guilds.cache.find(server => server.id === '718158777588645918').channels.cache.find(ch => ch.id === '747184752129212477');
				channel.send({ embed: embedBug });
			
				msg.channel.send({ embed: actionWellFinished("Votre demande a bien été pris en compte !") });

				exit = true;
				break;

			};

		} else if (msgReceived.content.toLowerCase() == "exit") {

			msg.channel.send({ embed: actionWellFinished("La commande a bien été annulée.") });

			exit = true;
			break;

		} else {

			msg.channel.send({ embed: actionInterrupted("Désolé une erreur est survenu !") });

			exit = true;
			break;

		};

	};

};