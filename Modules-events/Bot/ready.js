const prefix = process.env.PREFIX;

module.exports = async (bot) => {

    //-----------------------------------------------------
    
    console.log(`========================`);
    console.log("Bot ready !");
    bot.user.setActivity(`${prefix}help | By Ŀyπcῑx#1461`, { type: "PLAYING" });
    
    //-----------------------------------------------------
    
};