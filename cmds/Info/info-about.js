const Discord = require("discord.js");
const ee = require("../../botconfig/embeds.json");
const os = require("os")
module.exports = {
    name: "about",
    run: async (client, message, args) => {
        let aboutembed = new Discord.MessageEmbed()
        
        .setTitle(`Here are some informations about ${client.user.username}!`)
        .addField("Made by:", `${client.user.username} is made by <@544176059516583946>`)
        .addField("Guild amount:", `${client.user.username} is on ${client.guilds.cache.size} Guilds!`)
        .addField("User amount:", `${client.user.username} is in connection with ${client.users.cache.size} Users!`)
        .addField("Platform:", `${os.platform()} ${ os.arch()}`)
        .addField("CPU:", `${os.cpus().map((i) => `${i.model}`)[0]}`)
        .addField("Ram:", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}mb`)
        .addField("Discord Version:", `${Discord.version}`)
        .addField("Version:", `This is version \`\`1.0.0\`\` of ${client.user.username}!`)
        .addField("When i was Developed?", `I was developed in one day at 20.08.2021!`)
        .setColor(ee.color)
        message.channel.send(aboutembed);
    }
}