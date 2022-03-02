//jshint esversion:8
const fs = require("fs");
const path = require("path");
const { search } = require("../helpers/song");

const execute = async (client, msg, args) => {
  msg.delete(true);
  let getdata = await search(args.join(" "));
  let sendmessage = await client.sendMessage(msg.to, getdata.content); // have to grab the message ID
  if (getdata.status) {
    fs.writeFileSync(
      path.join(__dirname, `../cache/song~${sendmessage.id.id}.json`),
      JSON.stringify(getdata.songarray)
    );
  }
};

module.exports = {
  name: "Şarkı Ara",
  description: "arkı ara",
  command: "!song",
  commandType: "plugin",
  isDependent: false,
  help: `*Şarkı*\n\nBir şarkı arayın ve indirin.\n\n*!song [Arama Sonucu]*\nEx: !song ceg kafamız matiz\n\n⚡ Powered by musicder.net`,
  execute,
};
