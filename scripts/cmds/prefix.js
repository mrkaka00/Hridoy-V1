const fs = require("fs-extra");
const path = require("path");
const https = require("https");

module.exports = {
  config: {
    name: "prefix",
    version: "17.0",
    author: "Hridoy (final clean)",
    description: "Prefix system with animation + gif + full control",
    category: "Utility"
  },

  onStart: async function ({ message, event, api, args }) {

    const prefixFile = path.join(__dirname, "prefixData.json");

    if (!fs.existsSync(prefixFile)) {
      fs.writeFileSync(prefixFile, JSON.stringify({}, null, 2));
    }

    const data = JSON.parse(fs.readFileSync(prefixFile));

    const getPrefix = (threadID) => {
      return data[threadID] || global.GoatBot.config.prefix || "!";
    };

    const setPrefix = (threadID, newPrefix) => {
      data[threadID] = newPrefix;
      fs.writeFileSync(prefixFile, JSON.stringify(data, null, 2));
    };

    // ================= SET PREFIX =================
    if (args && args[0] === "set") {
      const newPrefix = args[1];

      if (!newPrefix) {
        return message.reply("❌ | Example: prefix set !");
      }

      setPrefix(event.threadID, newPrefix);

      return message.reply(`✅ Prefix changed successfully!\nNew Prefix: ${newPrefix}`);
    }

    const groupPrefix = getPrefix(event.threadID);
    const botPrefix = global.GoatBot.config.prefix || "!";

    // 👉 ONLY PREFIX দিলে reply
    if (event.body && event.body.trim() === groupPrefix) {
      return message.reply("🎀\nit's just my prefix");
    }

    const ping = event.timestamp ? (Date.now() - event.timestamp) : 0;
    const day = new Date().toLocaleString("en-US", { weekday: "long" });
    const BOTNAME = global.GoatBot.config.nickNameBot || "KakashiBot";

    // ================= LOADING =================
    const loading = [
      "Loading Prefix...\n[■□□□□□□□□□] 10%",
      "Loading Prefix...\n[■■■□□□□□□□] 30%",
      "Loading Prefix...\n[■■■■■□□□□□] 50%",
      "Loading Prefix...\n[■■■■■■■□□□] 70%",
      "Loading Prefix...\n[■■■■■■■■■□] 90%",
      "Loading Prefix...\n[■■■■■■■■■■] 100%"
    ];

    const gifs = [
      "https://i.imgur.com/zex8uo7.gif",
      "https://i.imgur.com/4ki8eBI.gif",
      "https://i.imgur.com/AMKQCJc.gif",
      "https://i.imgur.com/rkjO7YV.gif",
      "https://i.imgur.com/SgNPn8E.gif"
    ];

    const frames = [
`🌟 PREFIX INFO 🌟
🕒 Ping: ${ping}ms
📅 Day: ${day}
💠 Bot Prefix: ${botPrefix}
💬 Group Prefix: ${groupPrefix}
🤖 Bot Name: ${BOTNAME}`,

`╭━ PREFIX STATUS ━╮
│ ⏱ ${ping}ms
│ 📆 ${day}
│ 🔹 Bot: ${botPrefix}
│ 🔹 Group: ${groupPrefix}
│ 🤖 ${BOTNAME}
╰━━━━━━━━━━━━━━━╯`
    ];

    const gif = gifs[Math.floor(Math.random() * gifs.length)];
    const text = frames[Math.floor(Math.random() * frames.length)];

    // ================= LOADING ANIMATION =================
    const msg = await message.reply(loading[0]);

    for (let i = 1; i < loading.length; i++) {
      await new Promise(r => setTimeout(r, 900));
      api.editMessage(loading[i], msg.messageID);
    }

    await new Promise(r => setTimeout(r, 500));
    api.unsendMessage(msg.messageID);

    // ================= CACHE =================
    const cache = path.join(__dirname, "cache");
    if (!fs.existsSync(cache)) fs.mkdirSync(cache);

    const fileName = path.basename(gif);
    const filePath = path.join(cache, fileName);

    if (!fs.existsSync(filePath)) {
      await new Promise((res, rej) => {
        const file = fs.createWriteStream(filePath);
        https.get(gif, r => {
          r.pipe(file);
          file.on("finish", () => file.close(res));
        }).on("error", rej);
      });
    }

    return api.sendMessage({
      body: text,
      attachment: fs.createReadStream(filePath)
    }, event.threadID);
  },

  // ================= NO PREFIX =================
  onChat: async function ({ event, message, api }) {
    if (!event.body) return;

    const body = event.body.trim().toLowerCase();

    // 👉 prefix লিখলে full info
    if (body === "prefix") {
      return this.onStart({ message, event, api, args: [] });
    }

    // 👉 prefix set !
    if (body.startsWith("prefix set")) {
      const args = body.split(/\s+/);
      return this.onStart({ message, event, api, args });
    }
  }
};
