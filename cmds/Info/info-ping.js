const Discord = require("discord.js");
const ee = require("../../botconfig/embeds.json");
module.exports = {
    name: "ping",
    run: async (client, message, args) => {
        let date1 = Date.now()
        let firstembed = new Discord.MessageEmbed()
        .setTitle("Pinging")
        .setDescription("Getting the ping... \n Please wait!")
        .setColor(ee.color)

        message.channel.send(firstembed).then( msg => {
           setTimeout( () => msg.edit(new Discord.MessageEmbed()
           .setTitle("Ping:")
           .addField("API Latency:", `${client.ws.ping}ms`)
           .addField("Bot Ping:", `${Date.now() - date1}ms`)
           .setColor(ee.color)), 2000)
        })    
    }

}