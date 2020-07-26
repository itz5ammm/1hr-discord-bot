    const discord = require("discord.js")
const moment = require("moment")
const db = require("quick.db")

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports.run = async (bot, message, args) => {
 let user;
if (message.mentions.users.first()) {
    user = message.mentions.users.first();
} else {
    user = message.author;
}

const member = message.guild.member(user);
const userFlags = member.user.flags.toArray();
const embed = new discord.MessageEmbed()
    .setColor("RANDOM")
.setThumbnail(user.displayAvatarURL())
    .addField(`${user.tag}`, `${user}`, true)
    .addField("ID:", `${user.id}`, true)
    .addField("Nickname:", `${user.nickname === null ? `${user.nickname}` : 'None'}`, true)
    .addField("Status:", `${member.user.presence.status}`, true)
    .addField("In Server", message.guild.name, true)
    .addField("Flags:", ` ${userFlags.length ? userFlags.map(flag => flags[flag]): 'None'}`)
  
    .addField("Joined The Server On:", `${moment.utc(user.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
    .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
    .addField("Roles:", member.roles.cache.map(roles => `${roles}`).join(', '), true)
.setFooter(`Requested By: ${message.author.tag}`)
.setTimestamp()
message.channel.send({embed});
 
}

module.exports.help = {
name: "userinfo",
  aliases: ["whois"],
  description: "Check info about your self or someone else",
  usage: "(member)",
  category: "Info"
}