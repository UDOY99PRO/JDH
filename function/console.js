const { WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ url: process.env["console_wh"] });
var Discord = require("discord.js");
function discord_console(content){
var embed = new Discord.EmbedBuilder().setColor("#07fc03").setTitle("CONSOLE LOG").setDescription(`\`\`\`${content}\`\`\``).setTimestamp();
webhookClient.send({
	username: 'Console Logger',
	embed: embed
}).catch({})
}
global.discord_console = discord_console;
