const Discord = require("discord.js");
const ee = require(`${process.cwd()}/botconfig/config.json`);
module.exports = {
    name: "ping",
    run: async (client, message, args) => {
        let date1 = Date.now();
        let firstembed = new Discord.MessageEmbed()
            .setTitle("Pinging")
            .setDescription("Getting the ping... \n Please wait!")
            .setColor(ee.color);

        message.channel.send({ embeds: [firstembed] })
            .then((msg) => {
                msg.edit({
                    embeds: [new Discord.MessageEmbed()
                        .setTitle("Ping:")
                        .addField("API Latency:", `${client.ws.ping}ms`)
                        .addField("Bot Ping:", `${Date.now() - date1}ms`)
                        .setColor(ee.color)]
                })
            })
            .catch(console.error)
    }
};