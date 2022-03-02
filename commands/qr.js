//jshint esversion:8
const {MessageMedia} = require('whatsapp-web.js');
const qr = require('qr-image');

async function qrgen(text) {

    const data = ({
        mimetype: "image/png",
        data: await (qr.imageSync(text, { type: 'png' }).toString('base64')),
        filename: text + ".png"
    });
    return data;
}

const execute = async (client,msg,args) => {

    let data;
    msg.delete(true);

    if(msg.hasQuotedMsg) {
        let quotedMsg = await msg.getQuotedMessage();
        data = await qrgen(quotedMsg.body);
        msg = quotedMsg;
    }
    else {
        data = await qrgen(args.join(' '));
    }
    
    await client.sendMessage(msg.to, new MessageMedia(data.mimetype, data.data, data.filename), { caption: `QR code for 👇\n` + "```" + msg.body + "```" });
};

module.exports = {
    name: 'QR Kod Üreticisi',
    description: 'Verilen metin için QR oluşturur',
    command: '!qr',
    commandType: 'plugin',
    isDependent: false,
    help: '`*QR Kod Üreticisi*\n\nBu modül ile QR kodu oluşturun. Sadece sizin için QR Kod resmi oluşturacağı metni gönderin.\n\n*!qr [Yazı]*\nya da,\nOluşturmak için *!qr* ile bir mesajı yanıtlayın`',
    execute};