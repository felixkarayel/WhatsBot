//jshint esversion:8
const execute = async (client,msg) => {
    if (!msg.to.includes("-")) {
        let chat = await msg.getChat();
        await chat.unmute(true);
        msg.reply(`*🗣 *\n\nSesi açıldı\n\n _Powered by FelixKarayel_`);
    }
};

module.exports = {
    name: 'Ses Açma', //name of the module
    description: 'Kapalı Sohbeti Açmak', // short description of what this command does
    command: '!unmute', //command with prefix. Ex command: '!test'
    commandType: 'admin', //
    isDependent: true, //whether this command is related/dependent to some other command
    help: 'Bu komut !mute ile ilgilidir. Bunu öğrenmek için !help mute yazın', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};