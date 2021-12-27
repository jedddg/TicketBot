const Discord = require("discord.js");
const ee = require(`${process.cwd()}/botconfig/config.json`);
const config = require(`${process.cwd()}/botconfig/config.json`);
module.exports = {
    name: "guilds",
    run: async (client, message, args) => {
        if (!config.owner.includes(message.author.id)) {
            let notownerembed = new Discord.MessageEmbed()
                .setTitle("No Permissions!")
                .setColor(ee.color)
                .setDescription("You have no permissions to use this Command!");

            return message.channel.send({ embeds: [notownerembed] });
        } else {
            const guilds = client.guilds.cache.map(guild => `\`${guild.name} | ${guild.id} | ${guild.ownerId}\`\n`);
            //  | ${guild.owner}
            // GUILD.OWNER

            let guildsembed = new Discord.MessageEmbed()
                .setColor(ee.color)
                .setTitle(`I'm on ${client.guilds.cache.size} Guilds!`)
                .setDescription(`${guilds}`);

            message.channel.send({ embeds: [guildsembed] })
        }
    }
};