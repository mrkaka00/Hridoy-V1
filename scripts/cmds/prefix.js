const fs = require("fs-extra");
const path = require("path");
const https = require("https");

module.exports = {
  config: {
    name: "prefix",
    version: "20.0",
    author: "Hridoy (final)",
    role: 0,
    category: "Utility",
    guide: {
      en: "prefix | prefix set !"
    }
  },

  onStart: async function ({ api, event, args }) {
    return runPrefix({ api, event, args });
  },

  onChat: async function ({ api, event }) {
    if (!event.body) return;

    const body = event.body.trim().toLowerCase();

    if (body === "prefix") {
      return runPrefix({ api, event, args: [] });
    }

    if (body.startsWith("prefix set")) {
      const args = body.split(/\s+/);
      return runPrefix({ api, event, args });
    }

    const prefix = getPrefix(event.threadID);
    if (body === prefix) {
      return api.sendMessage("🎀\n>ιт'ѕ ʝυѕт му ρяєƒιχ ‎", event.threadID);
    }
  }
};

// ================= SYSTEM =================

function getPrefixFile() {
  const file = path.join(__dirname, "prefixData.json");
  if (!fs.existsSync(file)) fs.writeFileSync(file, "{}");
  return file;
}

function getPrefix(threadID) {
  const data = JSON.parse(fs.readFileSync(getPrefixFile()));
  return data[threadID] || global.GoatBot.config.prefix || "!";
}

function setPrefix(threadID, prefix) {
  const file = getPrefixFile();
  const data = JSON.parse(fs.readFileSync(file));
  data[threadID] = prefix;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// ================= MAIN =================

async function runPrefix({ api, event, args }) {

  // 👉 SET PREFIX
  if (args && args[0] === "set") {
    const newPrefix = args[1];
    if (!newPrefix) {
      return api.sendMessage("❌ | Example: prefix set !", event.threadID);
    }

    setPrefix(event.threadID, newPrefix);

    return api.sendMessage(
      `✅ Prefix changed!\nNew Prefix: ${newPrefix}`,
      event.threadID
    );
  }

  const prefix = getPrefix(event.threadID);
  const botPrefix = global.GoatBot.config.prefix || "!";

  const ping = event.timestamp ? (Date.now() - event.timestamp) : 0;
  const day = new Date().toLocaleString("en-US", { weekday: "long" });
  const name = global.GoatBot.config.nickNameBot || "KakashiBot";

  // ================= LOADING =================
  const loadingSets = [

    [
      "𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐏𝐫𝐞𝐟𝐢𝐱...\n▰▱▱▱▱▱▱▱▱▱ 10%",
      "𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐏𝐫𝐞𝐟𝐢𝐱...\n▰▰▰▱▱▱▱▱▱▱ 30%",
      "𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐏𝐫𝐞𝐟𝐢𝐱...\n▰▰▰▰▰▱▱▱▱▱ 50%",
      "𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐏𝐫𝐞𝐟𝐢𝐱...\n▰▰▰▰▰▰▰▱▱▱ 70%",
      "𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐏𝐫𝐞𝐟𝐢𝐱...\n▰▰▰▰▰▰▰▰▰▱ 90%",
      "𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐏𝐫𝐞𝐟𝐢𝐱...\n▰▰▰▰▰▰▰▰▰▰ 100%"
    ],

    [
      "𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝙋𝙧𝙚𝙛𝙞𝙭...\n[■□□□□□□□□□] 10%",
      "𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝙋𝙧𝙚𝙛𝙞𝙭...\n[■■■□□□□□□□] 30%",
      "𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝙋𝙧𝙚𝙛𝙞𝙭...\n[■■■■■□□□□□] 50%",
      "𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝙋𝙧𝙚𝙛𝙞𝙭...\n[■■■■■■■□□□] 70%",
      "𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝙋𝙧𝙚𝙛𝙞𝙭...\n[■■■■■■■■■□] 90%",
      "𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝙋𝙧𝙚𝙛𝙞𝙭...\n[■■■■■■■■■■] 100%"
    ],

    [
      "𝙻𝚘𝚊𝚍𝚒𝚗𝚐 𝙿𝚛𝚎𝚏𝚒𝚡...\n◉□□□□□□□□□ 10%",
      "𝙻𝚘𝚊𝚍𝚒𝚗𝚐 𝙿𝚛𝚎𝚏𝚒𝚡...\n◉◉◉□□□□□□□ 30%",
      "𝙻𝚘𝚊𝚍𝚒𝚗𝚐 𝙿𝚛𝚎𝚏𝚒𝚡...\n◉◉◉◉◉□□□□□ 50%",
      "𝙻𝚘𝚊𝚍𝚒𝚗𝚐 𝙿𝚛𝚎𝚏𝚒𝚡...\n◉◉◉◉◉◉◉□□□ 70%",
      "𝙻𝚘𝚊𝚍𝚒𝚗𝚐 𝙿𝚛𝚎𝚏𝚒𝚡...\n◉◉◉◉◉◉◉◉◉□ 90%",
      "𝙻𝚘𝚊𝚍𝚒𝚗𝚐 𝙿𝚛𝚎𝚏𝚒𝚡...\n◉◉◉◉◉◉◉◉◉◉ 100%"
    ]

  ];

  const loading = loadingSets[Math.floor(Math.random() * loadingSets.length)];

  // ================= GIF =================
  const gifs = [
    "https://i.imgur.com/zex8uo7.gif",
    "https://i.imgur.com/4ki8eBI.gif",
    "https://i.imgur.com/AMKQCJc.gif",
    "https://i.imgur.com/rkjO7YV.gif",
    "https://i.imgur.com/SgNPn8E.gif",
    "https://i.imgur.com/u3qB5y2.gif",
    "https://i.imgur.com/KUFxWlF.gif",
    "https://i.imgur.com/FV9krHV.gif",
    "https://i.imgur.com/lFrFMEn.gif",
    "https://i.imgur.com/KrEez4A.gif"
  ];

  const frames = [

`🌟╔═༶• PREFIX INFO •༶═╗🌟
🕒 Ping: ${ping}ms
📅 Day: ${day}
💠 Bot Prefix: ${botPrefix}
💬 Group Prefix: ${prefix}
🤖 Bot Name: ${name}
🌟╚═༶• END •༶═╝🌟`,

`╭━•✧ PREFIX STATUS ✧•━╮
│ ⏱ Ping: ${ping}ms
│ 📆 Day: ${day}
│ 🔹 Bot Prefix: ${botPrefix}
│ 🔹 Group Prefix: ${prefix}
│ 🤖 Bot: ${name}
╰━━━━━━━━━━━━━━━━╯`,

`▸▸▸ PREFIX ◂◂◂
Ping: ${ping}ms
Day: ${day}
Bot Prefix: ${botPrefix}
Group Prefix: ${prefix}
Bot: ${name}`

  ];

  const msg = await api.sendMessage(loading[0], event.threadID);

  for (let i = 1; i < loading.length; i++) {
    await new Promise(r => setTimeout(r, 900));
    api.editMessage(loading[i], msg.messageID);
  }

  await new Promise(r => setTimeout(r, 500));
  api.unsendMessage(msg.messageID);

  // ================= CACHE =================
  const gif = gifs[Math.floor(Math.random() * gifs.length)];

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

  const finalText = frames[Math.floor(Math.random() * frames.length)];

  return api.sendMessage({
    body: finalText,
    attachment: fs.createReadStream(filePath)
  }, event.threadID);
        }
