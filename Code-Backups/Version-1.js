const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (message) => {
  if (message.content.toLowerCase() === '!flipcoin') {
    // Generate a random number (0 or 1)
    const result = Math.floor(Math.random() * 2) === 0 ? 'Heads' : 'Tails';

    // Create an embed message with the coin flip result
    const embed = new Discord.MessageEmbed()
      .setColor('#FFD700')
      .setTitle('Coin Flip')
      .setDescription(`The coin landed on **${result}**.`);

    // Send the embed message
    message.channel.send(embed)
      .then(sentMessage => {
        // Add a reaction to the message for the play again button
        sentMessage.react('🔄');
      });
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  // Ignore reactions from the bot itself
  if (user.bot) return;

  // Check if the reaction is the play again button
  if (reaction.emoji.name === '🔄') {
    // Delete the user's reaction
    reaction.users.remove(user);

    // Trigger the coin flip command again
    client.emit('message', reaction.message);
  }
});

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
client.login('YOUR_BOT_TOKEN');
