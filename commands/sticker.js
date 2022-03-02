//jshint esversion:8
const {MessageMedia} = require('whatsapp-web.js');

const execute = async (client,msg) => {
    msg.delete(true);
    let quotedMsg = await msg.getQuotedMessage();
    if (quotedMsg.hasMedia) {
        let attachmentData = await quotedMsg.downloadMedia();
        await client.sendMessage(msg.to, new MessageMedia(attachmentData.mimetype, attachmentData.data, attachmentData.filename), { sendMediaAsSticker: true });
    } else {
        await client.sendMessage(msg.to, `🙇‍♂️ *Hata*\n\n` + "```Sticker Yapılacak Resim Bulunamadı```");
    }
};

module.exports = {
    name: 'Sticker Maker',
    description: 'Resimleri Stickere Dönüştürün',
    command: '!sticker',
    commandType: 'plugin',
    isDependent: false,
    help: `*Sticker Maker*\n\nResimi Stickere Dönüştürün\n\nResime yanıt vererek *!sticker* yazınız.`,
    execute};