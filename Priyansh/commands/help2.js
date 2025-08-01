module.exports.config = {
  name: "help2",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "SHAAN",
  description: "THIS BOT IS SHAAN",
  commandCategory: "BOT-ALL-COMMAND-NAME",
  usages: "HELP-2",
  cooldowns: 1,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 300
  }
};

module.exports.languages = {
  "en": {
    "moduleInfo": "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 «",
    "helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
    "user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports. run = function({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  if (!command) {
    const arrayInfo = [];
    const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 9999;

    let i = 0;
    let msg = "";

    for (var [name, value] of (commands)) {
      name += ``;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);

    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);

    for (let item of returnArray) msg += `😈  [${++i}] 【＿   ${item}   ＿】 \n`;


    const siu = `𝐎𝐰𝐧𝐞𝐫 ➻     𝐒𝐡𝐚𝐚𝐧 𝐊𝐡𝐚𝐧\n\n● ────────────────── ●\n\n𝐓𝐨𝐓𝐚𝐋 𝐂𝐨𝐦𝐌𝐚𝐧𝐃 𝐋𝐢𝐬𝐓\n\n● ────────────────── ●`;

 const text = `PAGE ❣️  [ ${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)} ]\n\n𝐎𝐑 𝐂𝐨𝐦𝐌𝐚𝐧𝐃 𝐊𝐞 𝐋𝐢𝐲𝐄 𝐌𝐞𝐍𝐮 𝐓𝐲𝐩𝐄 𝐊𝐚𝐑𝐨\n\n𝐎𝐰𝐧𝐞𝐫 ➻    𝐒𝐡𝐚𝐚𝐧 𝐊𝐡𝐚𝐧 \n\n● ────────────────── ●\n\n𝐌𝐘 𝐎𝐰𝐧𝐞𝐑  𝐒𝐡𝐚𝐚𝐧 𝐊𝐡𝐚𝐧 .... < 𝐄𝐃𝐈𝐓 > .... 𝐘𝐞 𝐁𝐨𝐓 𝐒𝐢𝐫𝐅 𝐎𝐰𝐧𝐞𝐑 𝐊 𝐋𝐢𝐘𝐞 𝐇 .... 𝐌𝐮𝐣𝐇𝐞 𝐀𝐚𝐏 𝐋𝐨𝐆𝐨 𝐊𝐨 𝐇𝐚𝐬𝐚𝐍𝐞 𝐊 𝐋𝐢𝐘𝐞 𝐁𝐚𝐧𝐘𝐚 𝐆𝐲𝐚 𝐇 𝐓𝐨𝐇 𝐇𝐚𝐩𝐩𝐘 𝐑𝐞𝐇𝐚𝐍𝐀 𝐀𝐩𝐩𝐤𝐚 𝐀𝐩𝐩𝐧𝐚 𝐎𝐰𝐧𝐞𝐑  𝐒𝐡𝐚𝐚𝐧 𝐊𝐡𝐚𝐧\n\n● ────────────────── ●`;

    return api.sendMessage(siu + "\n\n" + msg  + text, threadID, async (error, info) => {
      if (autoUnsend) {
        await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
        return api.unsendMessage(info.messageID);
      } else return;
    }, event.messageID);
  }

  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};
