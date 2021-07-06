const Discord = require('discord.js');
const { actionBadlyFinished } = require("../../../Modules-exports/functions.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports.run = async (bot, msg, args) => {

	//-----------------------------------------------------

	// Fonction pour résultats du jeu
	async function promptMessage(message, author, time, validReactions) {
		// Nous mettons le temps en secondes, avec cela, il est transféré à MS
		time *= 1000;

		//Pour chaque emoji dans les paramètres de la fonction, réagissez dans le bon ordre.
		for (const reaction of validReactions) {
			await message.react(reaction);
		};

		// Autoriser uniquement les réactions de l'auteur,
		// et les emoji doivent être dans le tableau que nous avons fourni.
		const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

		// Et bien sûr, attendez les réactions
		return message
			.awaitReactions(filter, { max: 1, time: time })
			.then(collected => collected.first() && collected.first().emoji.name);
	};

	//-----------------------------------------------------

	// Fonction affichage des résultats du jeu
	function getResult(me, clientChosen) {
		if ((me === "🗻" && clientChosen === "✂") ||
			(me === "📰" && clientChosen === "🗻") ||
			(me === "✂" && clientChosen === "📰")) {
			return "Tu as gagné!";
		} else if (me === clientChosen) {
			return "Il y a égalité!";
		} else {
			return "Tu as perdu!";
		};
	};

	//-----------------------------------------------------

	// Début du jeu envoie message de chargement
	const embed_startGame = {
		color: 0xffffff,
		title: "Start game..."
	};

	const m = await msg.channel.send({ embed: embed_startGame });

	//-----------------------------------------------------

	// Boucle pour le jeu
	var play = true;
	while (play === true) {

		//--------------------------

		// Message pour ajouter les réactions du jeu
		const embed_playGame = {
			color: 0xffffff,
			description: "Ajoutez une réaction à l'un de ces emojis pour jouer au jeu !"
		};

		m.edit({ embed: embed_playGame });

		//--------------------------

		// Traitement des données de réaction du joueur
		const reacted = await promptMessage(m, msg.author, 6, chooseArr);

		// Si undefined stopper la boucle (le jeu)
		if (reacted === undefined) {

			msg.channel.send({ embed: actionBadlyFinished("Le jeu a été arrêté.") });

			return play = false;

		};

		// Emoji que le bot choisi
		const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

		// Appel du résultat avec la fonction ▼
		const result = await getResult(reacted, botChoice);

		// Suprésion de l'émoi pour nouvelle session de jeu ▼
		const userReactions = m.reactions.cache.filter(reaction => reaction.users.cache.has(msg.author.id));

		try {
			for (const reaction of userReactions.values()) {
				await reaction.users.remove(msg.author.id);
			}
		} catch (error) {
			console.error('Failed to remove reactions.');
		};

		//--------------------------

		// Message des résultats
		const embed_reponse = {
			description: "",
			fields: [
				{
					name: result,
					value: `${reacted} vs ${botChoice}`
				}
			]
		};
		const reponse = await msg.channel.send({ embed: embed_reponse });

		setTimeout(() => {
			reponse.delete();
		}, 2500)// 2.5s

		//--------------------------

	};

	//-----------------------------------------------------

};