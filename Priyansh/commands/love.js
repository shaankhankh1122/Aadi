module.exports.config = {
    name: "love",
    version: "7.3.1",
    hasPermssion: 0,
    credits: " SHAAN",///don't change my Credit Coz i Edit 
    description: "Get Pair From Mention",
    commandCategory: "img",
    usages: "[@mention]",
    cooldowns: 6,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async() => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'ay.jpeg');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/jwc1ZGH.jpeg", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"]; 
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let batgiam_img = await jimp.read(__root + "/ay.jpeg");
    let pathImg = __root + `/batman${one}_${two}.jpeg`;
    let avatarOne = __root + `/avt_${one}.jpeg`;
    let avatarTwo = __root + `/avt_${two}.jpeg`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    batgiam_img.composite(circleOne.resize(170, 170), 100, 110).composite(circleTwo.resize(170, 170), 430, 110);

    let raw = await batgiam_img.getBufferAsync("image/jpeg");

    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);

    return pathImg;
}
async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api, args }) {    
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);
    if (!mention[0]) return api.sendMessage("Please mention 1 person.", threadID, messageID);
    else {
        const one = senderID, two = mention[0];
        return makeImage({ one, two }).then(path => api.sendMessage({ body: "🌸===『*★𝗖𝗿𝗲𝗱𝗶𝘁'𝘀 𒁍 𝐒𝐡𝐚𝐚𝐧☜ ✧•❁ 𝐋𝐎𝐕𝐄 ❁•✧\n\n╔═══❖••° °••❖═══╗\n\n   𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥 𝐏𝐚𝐢𝐫𝐢𝐧𝐠\n\n╚═══❖••° °••❖═══╝\n\n   ✶⊶⊷⊷❍⊶⊷⊷✶\n\n       👑𝐘𝐄 𝐋𝐄 𝐌𝐈𝐋 𝐆𝐘𝐀 ❤\n\n𝐓𝐄𝐑𝐀 𝐏𝐘𝐀𝐑 🩷\n\n   ✶⊶⊷⊷❍⊶⊷⊷✶                    ─━━◉❖𝐈 𝐋𝐎𝐕𝐄 𝐘𝐎𝐔🤗❖◉━━─           ❥═≛𝐒𝐎 𝐌𝐔𝐂𝐇 💝≛═❥                ─━━◉❖ 𝐌𝐘 𝐉𝐀𝐀𝐍𝐔 🙈❖◉━━─\nỖ𝐖ηᗴ𝐑◉❖𒁍आदि बाबू", attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
}