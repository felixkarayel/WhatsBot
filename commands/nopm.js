//jshint esversion:8
const config = require("../config");
const pmpermit = require("../helpers/pmpermit");

const execute = async (client, msg) => {
  if (config.pmpermit_enabled == "true" && !msg.to.includes("-")) {
    await pmpermit.nopermit(msg.to.split("@")[0]);
    msg.reply("*⛔ İznin Yok*\n\nPM'e izin verilmiyor\n\n _Powered by FelixKarayel_"); // don't change this text without discussion with Tuhin
  }
};

module.exports = {
  name: "PM Engelleme", //name of the module
  description: "Kişisel mesajlaşma için izin verilen bir kullanıcıya izin verme", // short description of what this command does
  command: "!nopm", //command with prefix. Ex command: '!test'
  commandType: "admin", //
  isDependent: false, //whether this command is related/dependent to some other command
  help: "Devamı için sohbete !nopm yazın.", // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
  execute,
};
