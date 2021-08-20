const M = require("minimatch")

module.exports = function(client)  {
    client.on("message", (message) => {
        client.ticket.ensure(message.guild.id, {
            channel: "",
            msgID: "",
            message: ""
        })
    })
}