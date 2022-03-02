//jshint esversion:8
const execute = async (client, msg) => {
  client.sendPresenceAvailable();
  msg.reply("```" + "bundan sonra online olacağım." + "```");
};

module.exports = {
  name: "Uyanmak",
  description: "Her zaman çevrimiçi kalın !",
  command: "!awake",
  commandType: "plugin",
  isDependent: false,
  help: undefined,
  execute,
};
