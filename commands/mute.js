//jshint esversion:8
const config = require("../config");

const execute = async (client, msg) => {
  if (!msg.to.includes("-")) {
    let chat = await msg.getChat();
    let unmuteDate = new Date();
    unmuteDate.setSeconds(Number(unmuteDate.getSeconds()) + 3600);
    await chat.mute(unmuteDate);
    msg.reply(`*🤫 Susturuldun*\n\n1 Saat Susturuldun\n\n _Powered by FelixKarayel_`);
  }
};

module.exports = {
  name: "Mute", //name of the module
  description: "mevcut sohbeti sessize al", // short description of what this command does
  command: "!mute", //command with prefix. Ex command: '!test'
  commandType: "admin", //
  isDependent: false, //whether this command is related/dependent to some other command
  help: `Sohbeti 1 saatliğine sessize almak için sohbete !mute yazın. sohbetin sesini açmak için !unmute kullanın.`, // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
  execute,
};
