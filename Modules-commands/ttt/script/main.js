const Discord = require('discord.js');
const { actionWellFinished } = require("../../../Modules-exports/functions.js");

module.exports.run = async (bot, msg) => {

	//-----------------------------------------------------

	function drawBoard(round, board) {

		const embed = {
			color: 0x691566,
			title: `Round ${round}`,
			description: "```" +
				'\n ' + (board["7"] || '7 ') + " | " + (board["8"] || ' 8 ') + " | " + (board["9"] || ' 9 ') +
				"\n---------------" +
				'\n ' + (board["4"] || '4 ') + " | " + (board["5"] || ' 5 ') + " | " + (board["6"] || ' 6 ') +
				"\n---------------" +
				'\n ' + (board["1"] || '1 ') + " | " + (board["2"] || ' 2 ') + " | " + (board["3"] || ' 3 ') +
				"\n```"
		}
		return embed;

	};

	function solutions(board) {
		return false
			// horizontal
			|| (board["7"] && (board["7"] == board["8"] && board["7"] == board["9"]))
			|| (board["4"] && (board["4"] == board["5"] && board["4"] == board["6"]))
			|| (board["1"] && (board["1"] == board["2"] && board["1"] == board["3"]))
			// vertical
			|| (board["7"] && (board["7"] == board["4"] && board["7"] == board["1"]))
			|| (board["8"] && (board["8"] == board["5"] && board["8"] == board["2"]))
			|| (board["9"] && (board["9"] == board["6"] && board["9"] == board["3"]))
			// diagonal
			|| (board["7"] && (board["7"] == board["5"] && board["7"] == board["3"]))
			|| (board["9"] && (board["9"] == board["5"] && board["9"] == board["1"]));
	};

	function pc_move(board, playerSymbol, opponentSymbol) {
		let testBoard;
		// try to finish, then try to block opponent
		const player = [playerSymbol, opponentSymbol];
		for (var p = 0; p < 2; p++) {
			for (var i = 1; i < 10; i++) {
				if (board[i.toString()] !== null) {
					continue;
				};
				testBoard = Object.assign({}, board);
				testBoard[i.toString()] = player[p];
				if (solutions(testBoard)) {
					return i.toString();
				};
			};
		};

		// guess any other free field
		let guess = undefined;
		while (guess === undefined || board[guess] !== null) {
			guess = Math.floor(Math.random() * 10 + 1).toString();
		};
		return guess;
	};

	//-----------------------------------------------------

	// Fonction pour résultats du jeu
	async function promptMessage(msg, time, playerID) {
		// Nous mettons le temps en secondes, avec cela, il est transféré à MS
		time *= 1000;

		// Autoriser uniquement les réactions de l'auteur,
		// et les emoji doivent être dans le tableau que nous avons fourni.
		const filter = m => m.author.id === playerID;

		// Et bien sûr, attendez les réactions ▼
		// Errors: ['time'] treats ending because of the time limit as an error
		return msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
			.then(collected => collected.first())
			.catch(collected => {
				console.log(collected);
			});
	};

	//-----------------------------------------------------
	var defaultConfig = {
		player1: {
			title: "Player 1",
			symbol: "❌",
			playerID: msg.author.id
		},
		player2: {
			title: "Player 2",
			symbol: "🔴",
			playerID: 0
		}
	};

	async function ttt(config) {
		config = Object.assign(defaultConfig, config || {});
		let gameOn = true;
		let player1Move, round, computer, board, ask, currentPlayer, opponentPlayer;

		while (gameOn === true) {
			// init new game

			// Config Game //

			round = 0;
			player1Move = true;
			board = {
				"7": null,
				"8": null,
				"9": null,
				"4": null,
				"5": null,
				"6": null,
				"1": null,
				"2": null,
				"3": null
			};

			const embed_startGame = {
				color: 0x691566,
				title: "Start game..."
			};
			const m = await msg.channel.send({ embed: embed_startGame });

			const embed_gameModeConfig = {
				color: 0x691566,
				title: "Voulez-vous jouer avec une autre personne? (yes/no)"
			};
			m.edit({ embed: embed_gameModeConfig });

			const msgReceived = await promptMessage(msg, 15, msg.author.id);

			if (msgReceived.content == "yes") {
				computer = false;

			} else if (msgReceived.content == "no") {
				computer = true;
			} else {
				return;
			};

			msgReceived.delete();

			// Si il joue a deux alors on demmande de mentionné le joueur n°2
			if (computer === false) {

				const embed_gamePlayer2 = {
					color: 0x691566,
					title: "Mentionné votre adversaire :"
				};
				m.edit({ embed: embed_gamePlayer2 });

				const msgReceived = await promptMessage(msg, 15, msg.author.id);

				// Je rentre l'ID du joueur deux dans la config
				defaultConfig.player2.playerID = msgReceived.mentions.users.first().id;
				msgReceived.delete();

			};

			// Play Game //

			m.edit({ embed: drawBoard(round++, board) });

			// Envoi message ▼
			const embed_textGame = {
				color: 0x691566,
				title: "Dans quelle case veux-tu aller (1-9) ? (tapez \"exit\" pour quitter)"
			};
			const m_textGame = await msg.channel.send({ embed: embed_textGame });

			// for loop for game logic
			for (var i = 0; i < 9; i++) {

				if (solutions(board)) {

					const embed_solution = {
						color: 0x691566,
						title: `( ${currentPlayer.title} ) (${currentPlayer.symbol}) à gagner !`
					}
					m_textGame.edit({ embed: embed_solution });
					gameOn = false;
					break;

				};

				currentPlayer = config.player1;
				opponentPlayer = config.player2;
				if (!player1Move) {
					currentPlayer = config.player2;
				};
				opponentPlayer = config.player1;

				ask = undefined;
				while (board[ask] !== null || ask === undefined) {
					if (player1Move === false && computer === true) {
						ask = pc_move(board, currentPlayer.symbol, opponentPlayer.symbol);
					} else {

						// Traitement des données de réaction du joueur
						const msgReceived = await promptMessage(msg, 15, currentPlayer.playerID);

						ask = msgReceived.content;
						if (ask == 'exit') {
							gameOn = false;
							break;
						};
						msgReceived.delete();
					};
				}
				if (gameOn == false) {
					break;
				};

				board[ask] = currentPlayer.symbol;
				player1Move = !player1Move;

				m.edit({ embed: drawBoard(round++, board) });
			};

			// Play Game //

			// End Game //

			if (gameOn === true) {
				const embed_tieGame = {
					color: 0x691566,
					title: `Match nul !`
				};
				m_textGame.edit({ embed: embed_tieGame });
				gameOn = false;
			};

			if (ask !== 'exit') {
				const embed_endGame = {
					color: 0x691566,
					title: `Rejouer ? (yes/no)`
				};
				msg.channel.send({ embed: embed_endGame });
				const msgReceived_for_endGame = await promptMessage(msg, 15, defaultConfig.player1.playerID);

				if (msgReceived_for_endGame.content === "yes") {
					gameOn = true;
				} else {

					msg.channel.send({ embed: actionWellFinished("Le jeu a bien été arrêté.") });

				};
			} else if (ask === 'exit') {

				msg.channel.send({ embed: actionWellFinished("Le jeu a bien été arrêté.") });

				gameOn = false;

			};

		};
	};

	// Start function (start game) ▼
	ttt();

	//-----------------------------------------------------

};