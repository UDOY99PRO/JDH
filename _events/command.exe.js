module.exports = (client) => {
var prefix = "-";
client.on("messageCreate", async(message) => {
if(!message.content.startsWith(prefix)) { return; }


});
}
