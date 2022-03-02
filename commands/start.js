//jshint esversion:8
const config = require("../config");
const axios = require("axios");
const { MessageMedia } = require("whatsapp-web.js");
const packageJson = require("../package.json");

async function get(battery, phn_info) {
  let batttxt;

  if (battery.plugged) {
    batttxt = `${battery.battery}% (Charging)`;
  } else {
    batttxt = `${battery.battery}%`;
  }

  return {
    msg:
      `*Karayel Bot*\n\nThis chat is Powered By *Felix Karayel*\n\n*Batarya Seviyesi:* ${batttxt}\n*Cihaz:* ${phn_info.device_manufacturer} ${phn_info.device_model}\n*WA Versiyon:* ${phn_info.wa_version}\n*Karayel Bot Versiyon:* ${packageJson.version}\n*Özel Pm İzni:* ${config.pmpermit_enabled},
    mimetype: "image/jpeg",
    data: Buffer.from(
      (
        await axios.get("https://sosyprism.xyz/data/assets/logo/hd2p9lp2.png", {
          responseType: "arraybuffer",
        })
      ).data
    ).toString("base64"),
    filename: "start.jpg",
  };
}

const execute = async (client, msg) => {
  msg.delete(true);
  let startdata = await get(
    await client.info.getBatteryStatus(),
    client.info.phone
  );
  await client.sendMessage(
    msg.to,
    new MessageMedia(startdata.mimetype, startdata.data, startdata.filename),
    { caption: startdata.msg }
  );
};

module.exports = {
  name: "Start",
  description: "Cihaz, istemci ve bot bilgilerini alın",
  command: "!start",
  commandType: "info",
  isDependent: false,
  help: "Karaye Bot'unuz hakkında bilgi alın",
  execute,
};
