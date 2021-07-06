module.exports = async (bot, target) => {

    //-----------------------------------------------------

    let i = 0, data_spotify = 0;

    //-----------------------------------------------------

    try {

        //-----------------------------------------------------

        const name_target = target.guild.member(target.user) ? target.guild.member(target.user).displayName : target.guild.member(target.user).username;

        //-----------------------------------------------------

        do {
            if (target.user.presence.activities[i] == "Spotify") {

                data_spotify = target.user.presence.activities[i];

            }
            i += 1;
        } while (i < target.user.presence.activities.length);

        //-----------------------------------------------------

        if (!data_spotify) return;

        //-----------------------------------------------------

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
        };
        const channel = target.guild.channels.cache.find(ch => ch.name === 'activity');
        try {
            channel.send({ embed });
        } catch (e) {
            return;
        };

        //-----------------------------------------------------

    } catch (error) {
        
    };

    //-----------------------------------------------------

};