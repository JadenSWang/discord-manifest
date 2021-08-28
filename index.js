"use strict"

/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require("discord.js")
const admin = require("firebase-admin")

const serviceAccount = require("./manifest-private-key.json")
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

// Create an instance of a Discord client
const client = new Discord.Client()

let GUILD_ID = 798643907675422792
let level2
let level3

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on("ready", () => {
	console.log("bot is online and ready to go")

	// initializes the instance variables
	client.guilds.cache.forEach(guild => {
		level2 = guild.roles.cache.find(role => role.id == "809676756914667520")
		level3 = guild.roles.cache.find(role => role.id == "809676805807538206")
	})
})

let previousMasterclassMembers = []

const member_plays_only = 822554922078699541
const bot_commands = 809659948089737246
const bot_channel = 810632644323835974
// Create an event listener for messages
client.on("message", message => {
	// get and update the score every time someone messages
	const author = message.author
	const scoreDocRef = admin.firestore().collection("score").doc(author.id)
	scoreDocRef.get().then(d => {
		const data = d.data()
		let curValue = data["score"]
		if (curValue == undefined) {
			curValue = 0
		}
		curValue += 10

		if (curValue == 5000) {
			message.channel.send(
				`<@${author.id}> congratulations, you've leveled up! <a:dancingblob:879912015529902130>`
			)
			message.member.roles.add(level3).catch(e => console.log(e))
			// sentUser.roles.
		} else if (curValue == 2000) {
			message.channel.send(
				`\n
				<a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130>
				<a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130>
				<a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130>
				<a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130>
				
				<a:dancingblob:879912015529902130> <@${author.id}> congratulations, you've leveled up! <a:dancingblob:879912015529902130>

				<a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130>
				<a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130>
				<a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130>
				<a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130><a:dancingblob:879912015529902130>`
			)
			message.member.roles.add(level2).catch(e => console.log(e))
		}
		scoreDocRef.set({ score: curValue }, { merge: true })

		if (message.channel.id == bot_channel) {
			if (message.content.toLowerCase() == "!score") {
				message.channel.send(`<@${author.id}> you're currently at ${curValue} points!`)
			}
		}
	})

	if (message.channel.id == member_plays_only) {
		if (message.attachments.size == 0) {
			message.delete()
		}
	}

	const masterClassRole = message.guild.roles.cache.get("809677482121887784")
	if (message.channel.id == bot_commands) {
		if (message.content.toLowerCase() == "!resetMasterClass".toLowerCase()) {
			const removed = []
			masterClassRole.members.map(member => {
				console.log(member.roles.remove(masterClassRole).roles)
				// removed.push())
			})
			if (removed.size != 0) {
				previousMasterclassMembers = removed
			}
			message.channel.send(`Removed ${removed.length} members from MasterClass role`)
		}
		// else if (message.content.toLowerCase() == "!undoReset".toLowerCase()) {
		// 	let i = 0
		// 	previousMasterclassMembers.forEach(user => {
		// 		console.log(typeof user)
		// 		user.roles.add(masterClassRole).catch(e => console.log(e))
		// 		i++
		// 	})

		// 	message.channel.send(`ReAdded ${i} members to MasterClass role`)
		// }
	}

	const level1role = message.guild.roles.cache.get("809676658839650315")
	if (message.content == "sdfjlksjdflkjsdlfjsdf") {
		console.log("TESTING")
		message.guild.members.fetch().then(members => {
			console.log(members)
		})
		message.guild.members.fetch().then(data => console.log(data))
	}
})

client.login("ODM0MTM0Mjg4NTE3MDM4MTUw.YH8eFw.1ZGQKrzmmuvhFuYvSWCRWPEwRVE")
