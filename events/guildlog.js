const Discord = require("discord.js");
module.exports = function(client) {
    client.on("guildCreate", (guild, message) => {
       let channelID = client.channels.cache.get("880855357918965791");
       let newguildembed = new Discord.MessageEmbed()
       .setTimestamp()
       .setTitle("New Guild!")
       .addFields(
		{ name: 'Guild:', value: `GuildName: ${guild.name} \n GuildID: ${guild.id}` },
		{ name: 'Owner:', value: `UserTag: ${guild.owner.user.tag} \n UserID: ${guild.owner.user.id}` },
	)
       .setColor("#27FF00")
       channelID.send(newguildembed);
    });

    client.on("guildDelete", (guild, message) => {
        let channelID = client.channels.cache.get("880855357918965791");
        let oldguildembed = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle("Old Guild!")
        .addFields(
         { name: 'Guild:', value: `GuildName: ${guild.name} \n GuildID: ${guild.id}` },
         { name: 'Owner:', value: `UserTag: ${guild.owner.user.tag} \n UserID: ${guild.owner.user.id}` },
     )
        .setColor("#FF0000")
        channelID.send(oldguildembed);
     });
}