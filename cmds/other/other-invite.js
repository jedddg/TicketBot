const Discord = require("discord.js");
const ee = require("../../botconfig/embeds.json");
module.exports = {
    name: "invite",
    run: async (client, message, args) => {
        let inviteembed = new Discord.MessageEmbed()
        
        .setTitle('Here you can get my invite link!')
        .setDescription("Just press [here](https://discord.com/api/oauth2/authorize?client_id=877869083855581234&permissions=8&scope=bot)!")
        .setColor(ee.color)
        .setURL('https://discord.com/api/oauth2/authorize?client_id=877869083855581234&permissions=8&scope=bot')
        message.channel.send(inviteembed);
    }
}