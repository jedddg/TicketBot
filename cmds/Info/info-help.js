const Discord = require("discord.js");
const ee = require("../../botconfig/embeds.json");
module.exports = {
    name: "help",
    run: async(client, message, args) => {
        let helpembed = new Discord.MessageEmbed()
        
        .setTitle("Gives you Information about all Commands!")
        .addField("<:arrow:877919972595204166> ``help``", `Show you this Embed!`)
        .addField("<:arrow:877919972595204166> ``invite``", `Gives you the invite link of ${client.user.username}!`)
        .addField("<:arrow:877919972595204166> ``about``", `Gives you informations about ${client.user.username}!`)
        .addField("<:arrow:877919972595204166> ``setup-ticket``", `Setting up the Ticket-System!`)
        .addField("<:arrow:877919972595204166> ``setup-prefix``", `Setting a new Prefix!`)
        .addField("<:arrow:877919972595204166> ``ping``", `Shows the Ping of the Bot and the Discord API!`)
        .addField("<:arrow:877919972595204166> ``clear``", `Clears the given amout of messages!`)
        .setColor(ee.color)
        message.channel.send(helpembed);
    }
}