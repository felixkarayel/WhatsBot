//jshint esversion:8
const config = require("../config");
const pmpermit = require("../helpers/pmpermit");

const execute = async (client, msg) => {
  if (config.pmpermit_enabled == "true" && !msg.to.includes("-")) {
    await pmpermit.permit(msg.to.split("@")[0]);
    msg.reply("*✅ İzinlisin*\n\nPm İznin Verildi\n\n _Powered by FelixKarayel_");
  }
};

module.exports = {
  name: "PM'ye izin ver",
  description: "Bir kişi için kişisel mesajlaşmaya izin ver",
  command: "!allow",
  commandType: "admin",
  isDependent: false,
  help: `_Bu komutlarla pm almasına izin verebilirsiniz_ 👇\n*!allow* - PM için bir kullanıcıya izin ver\n*!nopm* -PM için izin verilen bir kullanıcıya izin verme`, // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
  execute,
};
