module.exports = {

    //[ msg = (Le message de base)]  [ toFind = (id | username | mention)]
    getMember: function (msg, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = msg.guild.members.cache.get(toFind);

        if (!target && msg.mentions.users) {

            target = msg.guild.member(msg.mentions.users.first());

        };

        if (!target && toFind) {

            target = msg.guild.members.cache.find(member => {

                return member.displayName.toLowerCase().includes(toFind) ||
                    member.user.tag.toLowerCase().includes(toFind)

            });

        };

        if (!target)
            target = false;

        return target;
    },

    //[ member = (Un membre)]
    status_format: function (member) {
        var status = member.presence.status
        switch (status) {
            case 'online':
                return "En ligne";
            case 'idle':
                return "AFK";
            case 'offline':
                return "Hors ligne ou invisible";
            case 'dnd':
                return "Ne pas déranger";
            default:
                return "Aucun statue";
        }
    },

    //[ member = (Un membre)]
    createdAt_format: function (member) {
        var createdAt = member.createdAt.toString().split(" ");
        return createdAt[2] + ' ' + createdAt[1] + ' ' + createdAt[3]
    },

    //[ member = (Un membre)]
    joinedAt_format: function (member) {
        mois = new Array();
        mois.push("janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre");
        var joinedAt = member.joinedAt.toString().split(" ");
        return joinedAt[2] + ' ' + joinedAt[1] + ' ' + joinedAt[3];
    },

    actionWellFinished: function (text) {
        const embed = {
            color: 0x77b255,
            description: ":white_check_mark: " + text,
        };
        return embed;
    },

    actionInterrupted: function (text) {
        const embed = {
            color: 0xffcc4d,
            description: ":warning: " + text,
        };
        return embed;
    },

    actionBadlyFinished: function (text) {
        const embed = {
            color: 0xdd2e44,
            description: ":x: " + text,
        };
        return embed;
    },
};