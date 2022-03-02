//jshint esversion:8
// Coded by Sumanjay (https://github.com/cyberboysumanjay)
const axios = require('axios');

async function getShortURL(input) {
    let mainconfig = {
        method: 'get',
        url: `https://da.gd/s?url=${input}` 
    };
    return axios(mainconfig)
        .then(async function (response) {
            let shortened = response.data;
            let out = ({
                input: input,
                short: shortened.replace(/\n/g, '')
            });
            return out;
        })
        .catch(function (error) {
            return "error";
        });
}
const execute = async (client,msg,args) => {
    msg.delete(true);
    let data;
    if(msg.hasQuotedMsg){
        let quotedMsg = await msg.getQuotedMessage();
        data = await getShortURL(quotedMsg.body);
    }
    else{
        data = await getShortURL(args[0]);
    }

    if (data == "error") {
        await client.sendMessage(msg.to, `🙇‍♂️ *Hata*\n\n` + "```Lütfen girilen URL'nin doğru biçimde olduğundan emin olun.```");
    }
    else {
        await client.sendMessage(msg.to, `Short URL for ${data.input} is 👇\n${data.short}`);
    }
};


module.exports = {
    name: 'Link Kısaltıcı',
    description: 'verilen url için kısaltılmış bağlantı al',
    command: '!shorten',
    commandType: 'plugin',
    isDependent: false,
    help: `*Link Kısaltıcı*\n\nHerhangi bir geçerli URL için kısa URL oluşturur. \n\n*!shorten [geçerli-url]*\n`,
    getShortURL,
    execute};