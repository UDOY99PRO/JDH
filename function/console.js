const { WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ url: process.env["console_wh"] });

function discord_console(content){
webhookClient.send({
	username: 'Console Logger',
	content: content;
}).catch({})
}
global.discord_console = discord_console;
