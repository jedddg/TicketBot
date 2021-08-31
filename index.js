const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client({
    presence: {
    activity: {
      name: "Test Bot",
      type: "STREAMING",
      url: "https://twitch.tv/#" 
    }},
partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); 

const config = require("./botconfig/config.json")
const Enmap = require("enmap");
const os = require("os");
const colors = require("colors");

client.login(config.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./cmds");

const events = fs.readdirSync("./events/");
events.forEach(eventfile => { 
  require(`./events/${eventfile}`)(client);
});
console.log("All events/modules loaded!".green)


client.handler = ["command"];
client.handler.forEach(hand => {
require(`./handler/${hand}`)(client);
});

client.ticket = new Enmap({name: "ticket", dataDir: "./databases/ticket"});
client.prefix = new Enmap({name: "prefix", dataDir: "./databases/prefix"});


client.on("ready", () => {
    const readytext = `The Client: ${client.user.tag} is now online!`
    console.log(readytext.green);
})


/** 
@EVERYONE

THIS COMMAND HANDLER IS COMPLETLY MADE BY Shoda#1966

ALL RIGHTS GO TO HIM AND CRIME DEVELOPMENT

IF YOU REMOVE THIS TEXT, YOUR CODE WHOULD BE ILLEGAL!

@EVERYONE
**/