const discord = require("discord.js")
const got = require("got")

module.exports.run = async (client, message, args) => {
got('https://www.reddit.com/r/capictures/random/.json').then(response => {
        let content = JSON.parse(response.body);
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;

       const MemeEmbed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${memeTitle}`)
        .setImage(memeImage)
        
        message.channel.send(MemeEmbed)
    }).catch(console.error);
}

module.exports.help = {
name: "cat",
  aliases: ["cutecat"],
  description: "Sends a random cat picture",
  usage: " ",
  category: "Fun"
}