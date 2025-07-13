import { Client } from "discordx";
import { IntentsBitField } from "discord.js"
import env from "./env.json" with { type: "json" };
import completion from "./llm";
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  silent: false,
});

client.on("ready", async () => {
  console.log(">> Bot started");

  // to create/update/delete discord application commands
  await client.initApplicationCommands();
});
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channelId !== env.ALLOWED_CHANNEL) return;
  //OK, this is a command.
  // handle commands
  const content = message.content;
  return await Promise.all([
    message.react(env.ACK_EMOJI), // Acknowledge the message
    completion({ role: "user", content: "User's message: " + content }).then(async (response) => {
      console.log(`Response: ${response}`);
      return message.reply({ content: response, allowedMentions: { repliedUser: false } });
    })
  ])
})

client.login(env.DISCORD_BOT_TOKEN);