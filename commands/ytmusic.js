//jshint esversion:8
const { MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");
const formatNum = require("../helpers/formatNum");
const processImage = require("../helpers/processImage");
const { getShortURL } = require("../commands/shorten");

async function youtube(url) {
  try {
    let data = (
      await axios.get(`https://yoothoob.vercel.app/fromLink?link=${url}`)
    ).data;
    let shortUrl = await getShortURL(data.assets.mp3);
    return {
      title: data.title,
      likes: formatNum(data.stats.likes),
      views: formatNum(data.stats.views),
      comments: formatNum(data.stats.comments),
      image: await processImage(
        data.images[3] ||
          data.images[2] ||
          data.images[1] ||
          data.images[0] ||
          null
      ),
      download_link: shortUrl === "error" ? data.assets.mp3 : shortUrl.short,
    };
  } catch (error) {
    return "error";
  }
}

const execute = async (client,msg,args) => {

    let data;

    msg.delete(true);

    if(msg.hasQuotedMsg) {
        let quotedMsg = await msg.getQuotedMessage();
        data = await youtube(quotedMsg.body);
    }
    else {
        data = await youtube(args[0]);
    }

    if (data == "error") {
        await client.sendMessage(msg.to, `🙇‍♂️ *Hata*\n\n` + "```YouTube videosunu getirirken Beklenmeyen Bir Şey Oldu```");
    } else {
        await client.sendMessage(msg.to, new MessageMedia(data.image.mimetype, data.image.data, data.image.filename), { caption: `*${data.title}*\n\nİzlenme: ` + "```" + data.views + "```\nBeğeni: " + "```" + data.likes + "```\nYorum: " + "```" + data.comments + "```\n\n*Mp3 İndirme Linki* 👇\n" + "```" + data.download_link + "```" });
    }
};

module.exports = {
  name: "YouTube Music",
  description: "Bir Youtube Linkinden mp3 indirin",
  command: "!ytmusic",
  commandType: "plugin",
  isDependent: false,
  help: `*Youtube Music*\n\nBu komutla bir Youtube Linkinden mp3 indirin.\n\n*!ytmusic [Youtube-Link]*\nor,\nBir youtube bağlantısını *!ytmusic* ile yanıtlayın`,
  execute,
};
