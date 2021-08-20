const Discord = require("discord.js");
const client = new Discord.Client({  
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); 

const config = require("./config.json");
const Enmap = require("enmap")
client.login(config.token);

client.on("ready", () => {
    console.log(`${client.user.tag} is now online!`);
});
const ensure = require("./ensure.js");
ensure(client)
const open = require("./open-ticket.js");
open(client)
client.ticket = new Enmap({name: "ticket", dataDir: "./databases/ticket"});
client.prefix = new Enmap({name: "prefix", dataDir: "./databases/prefix"});

client.on("message", async (message) => {
    if(message.author.bot) return;
    if(!message.guild) return;
    let args = message.content.slice(config.prefix.length).trim().split(" ");
    let cmd = args.shift();

    if(cmd.toLocaleLowerCase('setup-ticket')) {
        let perms = message.member.hasPermission("ADMINISTRATOR");
        let channel = message.mentions.channels.first();

        let inenmap = client.ticket.get(message.guild.id, `channel`);

        if(!perms) {
            return message.reply('You have no permission to use this Command!');
        }
        if(perms) {
            
            
                if(!args[0] === "set" || !args[0] === "unset" || !args[0] === "message") {
                    return message.reply("Please use \`\`set\`\` or \`\`unset\`\` or \`\`message\`\`!");
                }
                else {
                    if(args[0] === "set") {
                        if(inenmap) {
                            return message.reply("Please use \`\`unset\`\` before you use \`\`set\`\`!");
                        }
                        if(!inenmap) {
                            if(!channel) {
                                return message.reply("Please provid a channel!");
                            }
                            else {
                                client.ticket.set(message.guild.id, channel.id, `channel`);
                                message.channel.send(`The Ticket channel is now ${channel}!`);
                                let themsg = await channel.send("REACT HERE FOT A TICKET!");
                                themsg.react("🎫");
                                client.ticket.set(message.guild.id, themsg.id, `msgID`);
                        }
                    }
                }
                if(args[0] === "unset") {
                    if(!inenmap) {
                        return message.reply("Please use \`\`set\`\` before you use \`\`unset\`\`!");
                    }
                    if(inenmap) {
                        client.ticket.delete(message.guild.id, `channel`);
                        client.ticket.delete(message.guild.id, `msgID`);
                        message.channel.send("THE TICKET SYSTEM IS SUCCESSFULLY DISBALED!");
                    }
                }
                if(args[0] === "message") {
                    let msginemap = client.ticket.get(message.guild.id, "message");
                    if(!args[1]){
                        return message.reply('Please use \`\`set\`\` or \`\`unset\`\`!');
                    }
                    if(!args[1] === "set" || !args[0] === "unset") {
                        return message.reply('Please use \`\`set\`\` or \`\`unset\`\`!');
                    }
                    if(args[1] === "set") {
                        if(msginemap) {
                            return message.reply("Please use \`\`unset\`\` before \`\`set\`\`!");
                        }
                        if(!msginemap) {
                            if(!args[2]) {
                                return message.reply("Please give a new Ticket Message!")
                            }
                            else {
                            client.ticket.set(message.guild.id, args.slice(2).join(" "), `message`);
                            message.channel.send(`SUCCESSFULLY SETTED TICKET-MESSAGE TO: \n ${args.slice(2).join(" ")}`);
                            }
                        }
                    }
                    if(args[1] === "unset"){
                         if(!msginemap) {
                            return message.reply("Please use \`\`set\`\` before \`\`unset\`\`!");
                         }
                         else {
                             client.ticket.delete(message.guild.id, `message`);
                             message.channel.send("SUCCESSFULLY DELETED TICKET-MESSAGE!")
                         }
                    }
                }
                if(!args[0]) {
                    return message.reply("Please use \`\`set\`\` or \`\`unset\`\` or \`\`message\`\`!");

                }
            }
        }
    }
    if(cmd.toLocaleLowerCase("help")) {
        let helpembed = new Discord.MessageEmbed()
        .setTitle("Gives you Information about all Commands!")
        .addField("<:arrow:877919972595204166> ``help``", `Show you this Embed!`)
        message.channel.send(helpembed)
    }
})