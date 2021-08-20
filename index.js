const Discord = require("discord.js");
const client = new Discord.Client({  
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); 

const config = require("./config.json");
const Enmap = require("enmap")
const cpustat = require("cpu-stat")
const os = require("os")
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

    
    if(cmd === ("help")) {
        let helpembed = new Discord.MessageEmbed()
        .setTitle("Gives you Information about all Commands!")
        .addField("<:arrow:877919972595204166> ``help``", `Show you this Embed!`)
        .addField("<:arrow:877919972595204166> ``invite``", `Gives you the invite link of ${client.user.username}!`)
        .addField("<:arrow:877919972595204166> ``about``", `Gives you informations about ${client.user.username}!`)
        .addField("<:arrow:877919972595204166> ``setup-ticket``", `Setting up the Ticket-System!`)
        .setColor("#43C19F")
        message.channel.send(helpembed);
    }
    if(cmd === ("about")) {
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
        .setColor("#43C19F")
        message.channel.send(aboutembed);
    }
    if(cmd === ("invite")) {
        let inviteembed = new Discord.MessageEmbed()
        .setTitle('Here you can get my invite link!')
        .setDescription("Just press [here](https://discord.com/api/oauth2/authorize?client_id=877869083855581234&permissions=8&scope=bot)!")
        .setColor("#43C19F")
        message.channel.send(inviteembed);
    }

    if(cmd === ('setup-ticket')) {
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

})