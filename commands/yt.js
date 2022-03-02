//jshint esversion:8
const { MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");
const formatNum = require("../helpers/formatNum");
const processImage = require("../helpers/processImage");
const { getShortURL } = require("../commands/shorten");
const savefrom_base = "https://sfrom.net/";

async function youtube(url) {
  try {
    let data = (
      await axios.get(`https://yoothoob.vercel.app/fromLink?link=${url}`)
    ).data;
    let shortUrl = await getShortURL(savefrom_base + url);
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
      download_link:
        shortUrl === "error" ? savefrom_base + url : shortUrl.short,
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
        await client.sendMessage(msg.to, new MessageMedia(data.image.mimetype, data.image.data, data.image.filename), { caption: `*${data.title}*\n\nİzlenme: ` + "```" + data.views + "```\nBeğeni: " + "```" + data.likes + "```\nYorum: " + "```" + data.comments + "```\n\n*İndirme Linki* 👇\n" + "```" + data.download_link + "```" });
    }
};


module.exports = {
  name: "YouTube ",
  description: "Youtube videosu için indirme bağlantısı alır",
  command: "!yt",
  commandType: "plugin",
  isDependent: false,
  help: `*Youtube*\n\nBu komutla bir Youtube videosu indirin.\n\n*!yt [Youtube-Link]*\nor,\nİndirmek için *!yt* ile bir mesajı yanıtlayın`,
  execute,
};
