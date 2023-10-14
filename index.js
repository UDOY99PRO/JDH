async(() => {
var app = require("express")();
app.listen(3000);
// Get the current UTC time
var currentUTCDate = new Date();

// Adjust the UTC time by adding 5 hours and 30 minutes
currentUTCDate.setUTCHours(currentUTCDate.getUTCHours() + 5);
currentUTCDate.setUTCMinutes(currentUTCDate.getUTCMinutes() + 30);

// Format the date as a string (you can adjust the format as needed)
var formattedDate = currentUTCDate.toISOString();

console.log(formattedDate);

let uptime = 0;
setInterval(() => {
  uptime++;
}, 1000);
app.get("/", (q, res) => {
  res.send(`${uptime} , started: ${formattedDate}`);
});
  var { GatewayIntentBits, Partials, Client, Events } = require("discord.js"); 

const client = new Client({
    fetchAllMembers: true,
    restTimeOffset: 0,
    failIfNotExists: false,
    shards: "auto",
    shardCount: 5,
    allowedMentions: {
      parse: ["roles", "users"],
      repliedUser: true,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER', 'MANAGE_MESSAGE', 'DIRECT_MESSAGE', Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction],
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates
    ]
  });
client.login(process.env.BOT_TOKEN);

client.on("ready", ()=> {
  console.log("started");
});
client.on("messageCreate", (message) => {
  if(message.bot) return;
  if(message.content == "!ping!"){
    message.reply({content: `${client.ws.ping}`});
  }else if(message.content == "!uptime!"){
        message.reply({content: `${client.uptime}`});
  }
});


})();
