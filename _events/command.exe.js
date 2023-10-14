module.exports = (client) => {
var prefix = "-";
client.on("messageCreate", async(message) => {
if(!message.content.startsWith(prefix)) { return; }
var args = message.content.slice(prefix.length).trim().split(/ +/);
var command = args.shift().toLowerCase();
if(command == "ping"){
return message.reply(`My Current Pong Is : ${client.ws.ping} ms`); 
}else if(command == "uptime"){
return message.reply(`My Current Uptime Is : ${client.uptime} ms`); 
}else{ return; }

});
}
