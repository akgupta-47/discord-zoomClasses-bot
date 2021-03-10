require('dotenv').config({ path: './config.env' });
const Discord = require('discord.js');
const client = new Discord.Client();
const time_table = require('./time-table.json');

client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log('I am logged in too');
});

/*
client.on('message', (msg) => {
    if(msg.channel.id == '762677329175773264' && msg.content === 'ello there mate'){
        msg.reply('With tag of person');
        msg.channel.send('Without @tag of person');
    }
});
*/
const prefix = '#';
let link, subject, objTime;
// add try catch for thur
client.on('message', message => {
    try{
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const spaceRemovedmessageContent = message.content.replace(/\s+/g, ' ');
        console.log(spaceRemovedmessageContent);
        const args = spaceRemovedmessageContent.slice(prefix.length).trim().split(' ');
        console.log(args);
        const command = args.shift().toLowerCase();
        const schedule = args.map(element => element.toLowerCase());
        // console.log(schedule);
        objTime = time_table[schedule[0]][schedule[1]];

        if (command === 'zoom') {
            if (schedule.length < 2) {
                return message.channel.send(`You didn't provide enough arguments, ${message.author}!`);
            }
            // console.log(objTime[2]['link']);
            for(i =0; i< objTime.length; i++) {
                link = objTime[i]['link'];
                subject = objTime[i]['time-sub'];
                message.channel.send(`${subject} : https://tiet.zoom.us/my/${link} `);
            }
        }
    }catch(err) {
        message.reply('check your command either the day or batch are wrong');
    }
});
