async function run(){
  //including web server
require("./dashboard/app.js");
require("./function/console.js");
  var { GatewayIntentBits, Partials, Client, Events } = require("discord.js"); 
 var fs = require("fs");


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
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
client.on("ready", () => {
  console.log(`Client started as: ${client.user.username}`);
  discord_console(`Client started as: ${client.user.username}`);
client.user.setStatus('idle');
discord_console("status Set to IDLE [🌙]");
client.user.setActivity({ name: `JDH OFFICIAL`, type: 0 });
  
fs.readdirSync('./_events').forEach((event) => {
      require(`./_events/${event}`)(client)
    });
});
}
run();
