const { Client, LocalAuth, MessageMedia, Buttons, decryptMedia } = require('whatsapp-web.js');

const fs = require('fs');

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const google = require('google-it')

const { spawn, exec } = require('child_process')
const menulis = {
  magernulissatu: 'Harap Tunggu, Bot Sedang Menulis Di Buku 1!~',
  errormagernulissatu: 'Error, Terjadi Kesalahan Saat Menulis Di Buku 1!~'
  }

const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();
const fetch  = require('node-fetch');

const projectId = 'main-dialog-ibqu'
const sessionId = uuid.v4();
const path = require('path');
const mime = require('mime-types');

const str_replace = require('str_replace');
//const fs = require('fs')
const puppeteer = require('puppeteer')
const args = process.argv.slice(2);
const url = str_replace('\[', ' ', args)
const crawl = async (url) => {
  try {
    //console.log(`Crawling ${url}`)
    const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium',args: ['--no-sandbox'],})
    const page = await browser.newPage()
    await page.goto(url)
    //const selector = '.style-scope.ytd-video-renderer'
    const selector2 = '#video-title'
    //await page.waitForSelector(selector)
    await page.waitForSelector(selector2)
    //const list = []
    //const links = await page.$$eval(selector2, am => am.filter(e => e.href).map(e => e.href))
    const links2 = await page.$$eval(selector2, list =>list.map(n => n.getAttribute('aria-label')))
    const links3 = await page.$$eval(selector2, list =>list.map(n => n.getAttribute('href')))
    //list.push({links,links2})
    let text = "";
    for (let i = 0; i < 6 ; i++) {
      text += links2[i] + " - https://www.youtube.com" + links3[i] +"\n";
      text += "\n";
    }
    console.log(text);
    await browser.close()
  }
   catch (err) {
    console.log(err)
  }
}

crawl(url)

const sessionClient= new dialogflow.SessionsClient({
    keyFilename: "main-dialog-ibqu-b97f49d8b989.json"
  });
  

    const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

const Scraper = require('@yimura/scraper').default;
const youtube = new Scraper();


async function Chatting(inputText ) {
const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // query untuk dikirim ke agen dialogflow
        text: inputText,
        // Bahasa yang digunakan (id-ID)
        languageCode: 'id-ID',
      },
    },
  };

  // Kirim permintaan dan hasil log
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  return result.fulfillmentText;

}

const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { headless: false,  
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
                    },
        
});

const ffmpeg = require('@ffmpeg-installer/ffmpeg');
console.log(ffmpeg.path, ffmpeg.version);

const axios = require('axios');

function donwloadGambar(url){
        return axios.get(url, {responseType: 'arraybuffer'})
                .then(response => Buffer.from(response.data, "binary").toString("base64"))
}

client.on('qr', (qr) => {
    // Menghasilkan dan memindai kode ini dengan ponsel Anda
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    getUnreadMsg(client);
  
});
async function getUnreadMsg(client) {
  try {
    const allChats = await client.getChats();

    console.log(allChats);
  } catch (e) {
    console.error(e);
  }
}


const prefix = "!";

        client.on('message', async msg => {
          try {
          client.sendMessage(msg.from, await Chatting(msg.bod));
          }
          catch(err) {
            console.log("opsie, " + err.message)
          }

          
          if (msg.body[0] == prefix){
            var [cmd, ...args] = msg.body.slice(1).split(" ");
            args  = args.join(" ");
          }
          if (cmd == "say" || cmd == "Say" || cmd == "SAY"){client.sendMessage(msg.from, args);
          }
  
          if (cmd == "gambar1"){
            const gambar = await donwloadGambar("https://images6.alphacoders.com/100/1002129.jpg");
            const media = new MessageMedia('image/jpg', gambar);
            client.sendMessage(msg.from, media);
          }
          if (cmd == "gambar2"){
            const gambar = await donwloadGambar("https://a-static.besthdwallpaper.com/kaguya-sama-love-is-war-chika-fujiwara-wallpaper-1366x768-17609_46.jpg");
            const media = new MessageMedia('image/jpg', gambar);
            client.sendMessage(msg.from, media);
          }
          
          if (cmd == "gambar3"){
                    const media = MessageMedia.fromFilePath ('./IMAGES/chika.jpg');
                    client.sendMessage(msg.from, media);
          }
          if (cmd == "waifu" || cmd == "Waifu" || cmd == "WAIFU" || cmd == "anime" || cmd == "Anime" || cmd == "ANIME"|| cmd == "gambar"){
            linkgambar = ["https://i.waifu.pics/rF-pZ8a.jpg","https://i.waifu.pics/QQW7VKy.jpg","https://cdn.discordapp.com/attachments/1011226226788155402/1014193116129021982/unknown.png","https://i.waifu.pics/nxREZO6.png","https://i.waifu.pics/II9WeHB.png","https://cdn.discordapp.com/attachments/1011226226788155402/1013835886263291987/unknown.png","https://i.waifu.pics/BwHGNNK.png","https://cdn.discordapp.com/attachments/1011226226788155402/1013835718579212428/unknown.png","https://i.waifu.pics/CxL~Tbz.jpg","https://i.waifu.pics/~bMLxB_.jpg","https://i.waifu.pics/AoPMBb_.jpeg","https://i.waifu.pics/TrwecOg.jpg","https://i.waifu.pics/GLGHJqM.jpg","https://i.waifu.pics/CmAsGKo.jpg","https://i.waifu.pics/E_U9eeg.jpg","https://cdn.discordapp.com/attachments/1011226226788155402/1011913335534534676/unknown.png","https://i.waifu.pics/sLd~4NU.jpg","https://i.waifu.pics/tE7-FfJ.jpg","https://i.waifu.pics/kBYBvIP.jpg","https://i.waifu.pics/WGTA1vN.png","https://i.waifu.pics/VxoRcT4.jpeg","https://i.waifu.pics/5At1P4A.jpg","https://i.waifu.pics/8m-r1_O.png","https://i.waifu.pics/ysB8wtC.jpg","https://i.waifu.pics/lA-Jaec.jpg","https://i.waifu.pics/yYcF1Me.png","https://i.waifu.pics/P6X-ph6.jpg","https://i.waifu.pics/Y5-tibK.png","https://i.waifu.pics/gnpc_Lr.jpeg","https://i.waifu.pics/V2kTPbJ.jpg","https://i.waifu.pics/5tN4N4D.jpg","https://i.waifu.pics/LOR7MBO.jpg","https://i.waifu.pics/CNzs4Pd.jpg","https://i.waifu.pics/i~RQhRD.png","https://i.waifu.pics/cG2o0Hs.jpg","https://i.waifu.pics/0paXBfG.png","https://i.waifu.pics/ueqBS0o.jpg","https://i.waifu.pics/2qfjhSP.jpg","https://i.waifu.pics/r0UW03D.jpg","https://s1.zerochan.net/Oosaki.Amana.600.3734915.jpg","https://s1.zerochan.net/San.%28Mononoke.Hime%29.600.913337.jpg","https://s1.zerochan.net/Mikasa.Ackerman.600.3718808.jpg","https://i.waifu.pics/94LH-aU.jpg","https://i.waifu.pics/slz3yPL.png","https://i.waifu.pics/LhA7EZ9.jpg","https://i.waifu.pics/pgLtw5E.jpg","https://i.waifu.pics/ZPXy_XG.jpg","https://data.whicdn.com/images/362558858/original.jpg","https://i.pinimg.com/474x/46/60/99/46609963809bc952e57334e09d5d6162.jpg", "https://memegenerator.net/img/instances/85622524.jpg", "https://i.waifu.pics/cKe~bpZ.jpg", "https://i.waifu.pics/XSy69q6.png", "https://a-static.besthdwallpaper.com/kaguya-sama-love-is-war-chika-fujiwara-wallpaper-1366x768-17609_46.jpg", "https://images6.alphacoders.com/100/1002129.jpg", "https://i.waifu.pics/Fs1hUxz.jpg", "https://c4.wallpaperflare.com/wallpaper/393/423/638/anya-forger-spy-x-family-anime-girls-hd-wallpaper-preview.jpg", "https://i.waifu.pics/R5n5P7f.png", "https://i.waifu.pics/Hd7NRd9.png", "https://i.waifu.pics/_NBeyLj.png", "https://i.waifu.pics/dPXxQqE.png", "https://i.waifu.pics/mJkPaVR.png", "https://i.waifu.pics/xUYXg76.png", "https://i.waifu.pics/wPbusA9.png", "https://i.pinimg.com/736x/9a/5e/03/9a5e03b5bb22c46c3ba17ef896b15063.jpg","https://cdn.discordapp.com/attachments/1011226226788155402/1011226304588283965/unknown.png","https://cdn.discordapp.com/attachments/1011226226788155402/1011226288842866798/unknown.png","https://cdn.discordapp.com/attachments/1011226226788155402/1011226258245435484/unknown.png","https://i.waifu.pics/VIJYb_Z.png","https://cdn.discordapp.com/attachments/1011226226788155402/1013833447602667631/unknown.png","https://i.waifu.pics/04afe1y.jpg","https://i.waifu.pics/2Xdpuov.png","https://cdn.discordapp.com/attachments/1011226226788155402/1011244669193175200/unknown.png","https://cdn.discordapp.com/attachments/1011226226788155402/1013832659358711868/unknown.png","https://cdn.discordapp.com/attachments/1011226226788155402/1013831770875121715/unknown.png","https://cdn.discordapp.com/attachments/1011226226788155402/1011244739410006056/unknown.png"]
            var link = linkgambar[Math.floor(Math.random()*linkgambar.length)];
            const media = await MessageMedia.fromUrl(link);
            client.sendMessage(msg.from, media);
        }

          if (cmd == "husbu" || cmd == "Husbu" || cmd == "HUSBU" || cmd == "gambar" || cmd == "anime" || cmd == "ANIME" || cmd == "Anime"){
          linkgambar = ["https://cdn.wallpapersafari.com/83/96/oxfdU1.jpg","https://cdn.discordapp.com/attachments/1011229329457418313/1014193487702405214/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1014193226447601685/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1014192954497318912/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011913023839010886/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1013835216554557460/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1013834995053379754/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011912582669537310/unknown.png","https://i.pinimg.com/originals/e0/9d/26/e09d26c64fc636b78f452df2aaf66820.jpg","https://c4.wallpaperflare.com/wallpaper/616/450/559/anime-hunter-x-hunter-killua-zoldyck-hd-wallpaper-preview.jpg","https://cdn.discordapp.com/attachments/1011229329457418313/1011245198182981712/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011245230936309790/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011245260980113448/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011245316768538624/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011245357558136882/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011245384527532062/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011245415892521000/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011245433215012925/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011245456703094834/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011245467138531379/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011245486524608622/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011245507156377690/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1011245556342992966/unknown.png","https://assets-a2.kompasiana.com/items/album/2021/06/17/images-jpeg-5-60cade4695a0ab63e81214e2.jpg?t=o&v=500","https://belajartulis.com/wp-content/uploads/2021/03/boruto-full-karma-800x400.jpg", "https://cdn.discordapp.com/attachments/1011229329457418313/1013438025742700584/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1013438682969161809/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1013438712400592947/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1013438735238582282/unknown.png","https://cdn.discordapp.com/attachments/1011229329457418313/1013438941430550609/unknown.png"]
          var link = linkgambar[Math.floor(Math.random()*linkgambar.length)];
          const media = await MessageMedia.fromUrl(link);
          client.sendMessage(msg.from, media)
        }

        if (cmd == "meme" || cmd == "Meme" || cmd == "MEME"){
          linkgambar = ["https://i.kym-cdn.com/photos/images/newsfeed/001/895/227/980.jpg","https://cdn.discordapp.com/attachments/833284841540943892/1013478964209131562/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1014197796137619547/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1014197568189767762/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1014197080220258426/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1014196520167407747/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1014196245755076619/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1014195900899410040/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1014195702408151040/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1014195514650136677/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1014195227055112263/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011915850586013706/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011915455314792498/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011911816273744023/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011910980755800064/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011910581382549544/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011906907033849976/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011906745192431676/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011906576774336592/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011906372167802920/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011906184728543312/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011905822277767198/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011905106217795654/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011262898976325663/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011262661188661320/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1011257149076275200/unknown.png","https://media.discordapp.net/attachments/1010126068134457424/1010473121498791936/unknown.png","https://media.discordapp.net/attachments/1010126068134457424/1010472687702921266/unknown.png","https://media.discordapp.net/attachments/1010126068134457424/1010472144959967272/unknown.png?width=676&height=676","https://media.discordapp.net/attachments/1010126068134457424/1010471835437117481/unknown.png?width=676&height=676","https://media.discordapp.net/attachments/1010126068134457424/1010471475821682738/unknown.png?width=676&height=676","https://media.discordapp.net/attachments/833284841540943892/1010446962715275315/FB_IMG_1660979712887.jpg","https://media.discordapp.net/attachments/1010126068134457424/1010469346285457458/unknown.png","https://media.discordapp.net/attachments/1010126068134457424/1010469252886704138/unknown.png","https://media.discordapp.net/attachments/1010126068134457424/1010468986871361576/unknown.png","https://media.discordapp.net/attachments/1010126068134457424/1010468517868486666/unknown.png?width=676&height=676","https://media.discordapp.net/attachments/1010126068134457424/1010468271729938505/unknown.png?width=676&height=676","https://media.discordapp.net/attachments/1010126068134457424/1010467996076093460/unknown.png?width=676&height=676","https://media.discordapp.net/attachments/1010126068134457424/1010467468394889296/unknown.png?width=676&height=676","https://media.discordapp.net/attachments/1010126068134457424/1010466806873464872/unknown.png","https://media.discordapp.net/attachments/1010126068134457424/1010467164316246028/unknown.png?width=380&height=676","https://media.discordapp.net/attachments/1010126068134457424/1010466384930680863/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1010465905186189342/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1010231948381278429/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1010229670576398406/unknown.png", "https://cdn.memes.com/up/24551061595129931/i/1595246140879.jpg", "https://cdn.discordapp.com/attachments/1010126068134457424/1010126752909111316/299514668_3084717601839837_960423698678917824_n.jpg", "https://cdn.discordapp.com/attachments/1010126068134457424/1010129806077202532/285688895_126861839787513_6066360208566354097_n.jpg", "https://cdn.discordapp.com/attachments/1010126068134457424/1010129806790238268/298586498_146334787729111_2607171448847337321_n.jpg", "https://cdn.discordapp.com/attachments/1010126068134457424/1010129806077202532/285688895_126861839787513_6066360208566354097_n.jpg", "https://cdn.discordapp.com/attachments/1010126068134457424/1010129806333063238/293058204_180746957649868_8669246689037163425_n.jpg", "https://cdn.discordapp.com/attachments/833284841540943892/1009410768409722932/FB_IMG_1660732612131.jpg", "https://img-9gag-fun.9cache.com/photo/agLddDr_460s.jpg","https://cdn.discordapp.com/attachments/1010126068134457424/1010129807020920862/298751012_839825103846776_4013871737651708262_n.jpg", "https://cdn.discordapp.com/attachments/1010126068134457424/1010129807234838548/299093325_1735339803531821_7371829242872968150_n.jpg","https://cdn.discordapp.com/attachments/1010126068134457424/1010231370922065930/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1010231050816995409/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1010230720091918436/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1010230366226894858/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1010230072302653530/unknown.png", "https://cdn.discordapp.com/attachments/1010126068134457424/1010129807427772446/299196694_794113768390760_3047179163723482998_n.jpg", "https://cdn.discordapp.com/attachments/1010126068134457424/1010129807654260786/299208039_795080558176010_82031388004882159_n.jpg","https://cdn.discordapp.com/attachments/1010126068134457424/1010129807914303499/299373009_1302032937286627_5114157882668058035_n.jpg","https://cdn.discordapp.com/attachments/1010126068134457424/1010129808140804167/299535200_184675410601627_8745521946330518432_n.jpg","https://cdn.discordapp.com/attachments/1010126068134457424/1010129808371486750/300192306_763948871607164_5264742565087434347_n.jpg", "https://cdn.discordapp.com/attachments/1010126068134457424/1010129859491667998/299688853_513533223872515_5756880690209971503_n.jpg", "https://cdn.discordapp.com/attachments/1010126068134457424/1010129859764310087/299723726_738090787489079_620974297560623147_n.jpg", "https://cdn.discordapp.com/attachments/1010126068134457424/1010129860036935730/299782352_6129040113789180_7492315856567718687_n.jpg", "https://cdn.discordapp.com/attachments/1010126068134457424/1010129860284403772/299799994_1048986545762542_7430148384560109323_n.jpg", "https://cdn.discordapp.com/attachments/1010126068134457424/1010129860586389554/299867518_378240437779071_7927777136435395627_n.jpg", "https://cdn.discordapp.com/attachments/1010126068134457424/1010129860854820985/299960072_483080589850375_4939213527951126645_n.jpg", "https://cdn.discordapp.com/attachments/833284841540943892/1009688718308810752/unknown.png", "https://media.discordapp.net/attachments/892828443165732885/1005003281300471858/FB_IMG_1658179525739.jpg","https://cdn.discordapp.com/attachments/833284841540943892/1007073697808535593/FB_IMG_1660175469368.jpg","https://cdn.discordapp.com/attachments/1010126068134457424/1014191693098127451/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1014192021189173318/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1014192097689092176/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1014192410496086106/unknown.png","https://cdn.discordapp.com/attachments/1010126068134457424/1014192657192456302/unknown.png"]
          var link = linkgambar[Math.floor(Math.random()*linkgambar.length)];
          const media = await MessageMedia.fromUrl(link);
          client.sendMessage(msg.from, media);
        }

          if (msg.body.startsWith('!menfess ')) {
            //  command chat nomor
            let number = msg.body.split(' ')[1];
            let messageIndex = msg.body.indexOf(number) + number.length;
            let message = msg.body.slice(messageIndex, msg.body.length);
            number = number.includes('@c.us') ? number : `${number}@c.us`;
            let chat = await msg.getChat();
            chat.sendSeen();
            client.sendMessage(number, message);
            msg.reply('pesan berhasil terkirim');
          }

          if (msg.body.startsWith('!Menfess ')) {
            //  command chat nomor
            let number = msg.body.split(' ')[1];
            let messageIndex = msg.body.indexOf(number) + number.length;
            let message = msg.body.slice(messageIndex, msg.body.length);
            number = number.includes('@c.us') ? number : `${number}@c.us`;
            let chat = await msg.getChat();
            chat.sendSeen();
            client.sendMessage(number, message);
            msg.reply('pesan berhasil terkirim');
          }

          if (msg.body.startsWith('!menfes ')) {
            //  command chat nomor
            let number = msg.body.split(' ')[1];
            let messageIndex = msg.body.indexOf(number) + number.length;
            let message = msg.body.slice(messageIndex, msg.body.length);
            number = number.includes('@c.us') ? number : `${number}@c.us`;
            let chat = await msg.getChat();
            chat.sendSeen();
            client.sendMessage(number, message);
            msg.reply('pesan berhasil terkirim');
          }

          if (msg.body.startsWith('!Menfes ')) {
            //  command chat nomor
            let number = msg.body.split(' ')[1];
            let messageIndex = msg.body.indexOf(number) + number.length;
            let message = msg.body.slice(messageIndex, msg.body.length);
            number = number.includes('@c.us') ? number : `${number}@c.us`;
            let chat = await msg.getChat();
            chat.sendSeen();
            client.sendMessage(number, message);
            msg.reply('pesan berhasil terkirim');
          }

          if (cmd == "yt" || cmd == "youtube" || cmd == "YT" || cmd == "Yt"){
            youtube.search(args).then(result => {
              //console.log();
              client.sendMessage(msg.from, result.videos[0].description  + " " + result.videos[0].link );
            });
          }

          else if (msg.body.startsWith('!google ')){
            const googleSearch = msg.body.slice(8)
            if(googleSearch == undefined || googleSearch == ' ') return msg.reply(`*Result : ${googleSearch}* not found`)
            google({ 'query': googleSearch }).then(results => {
            let vars = `_*Result : ${googleSearch}*_\n`
            for (let i = 0; i < results.length; i++) {
                vars +=  `\n------------------------------------------------\n\n*Judul* : ${results[i].title}\n\n*Keterangan* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
            }
                msg.reply(vars);
            }).catch(e => {
                console.log(e)
                msg.reply('Google Error : ' + e);
            })
          }

          

          if (cmd == 'info' || cmd == 'Info' || cmd == 'INFO' || cmd == 'P' || cmd == 'p')  {
              //Kirim pesan baru sebagai balasan untuk yang saat ini
              msg.reply(`CHIKA-BOT
Terima kasih telah menghubungi CHIKA BOT.
Silakan ketik !Help untuk melihat menu
(BOT INI MASIH DALAM MODE PENGEMBANGAN HARAP MAKLUM JIKA FITUR BOT SEDIKIT)`)
        }

        if (cmd == 'ping' || cmd == 'Ping' || cmd == 'PING' )  {
          //Kirim pesan TES BOT
msg.reply(`CHIKA CHAN
BOT AKTIF`)
    }
      if (cmd == 'donasi' || cmd == 'Donasi' || cmd == 'DONASI' || cmd == 'Donate' || cmd == 'donate' || cmd == 'DONATE') {
        //PESAN DONASI
msg.reply('gak butuh yahahah hayuk')
}        
         
        if (msg.body == 'makasih' || msg.body == '!makasih' || msg.body == 'Makasih' || msg.body == '!Makasih' || msg.body == 'Makasih ya kk' || msg.body == 'Makasih ya kak' || msg.body == 'terimakasih'|| msg.body == '!terimakasih' || msg.body == 'Terimakasih'||  msg.body == 'terima kasih' || msg.body == '!terima kasih' || msg.body == 'Terima kasi' || msg.body == 'I love you bot' || msg.body == 'Thanks' || msg.body == 'maksih' || msg.body == 'Makaseeh' || msg.body == 'Makaseh' || msg.body == 'Makasii minn❤️❤️' || msg.body == 'Makasii minn' || msg.body == 'Makasih😁' || msg.body == 'Othey makacih😍' || msg.body == 'Keren makasih'){
          msg.reply
(`
sama-sama🙏  
`)
        }


        if (msg.body == 'P' || msg.body == 'p' || msg.body == 'menu' || msg.body == 'Menu' || msg.body == 'MENU' || msg.body == '.menu' || msg.body == '.Menu' || msg.body == '.MENU' || msg.body == 'help' || msg.body == 'Help' || msg.body == 'HELP' || msg.body == '.help' || msg.body == '.Help' || msg.body == '.HELP' || msg.body == 'Hallo' || msg.body == 'Halo' || msg.body == 'halo' || msg.body == 'Hi'){
          msg.reply( ` CHIKA-BOT

Terima kasih telah menghubungi CHIKA BOT.
Silakan ketik !Help untuk melihat menu
(BOT INI MASIH DALAM MODE PENGEMBANGAN HARAP MAKLUM JIKA FITUR BOT SEDIKIT)`);
}
       
        
        if (msg.body == 'irfan' || msg.body == 'Irfan' || msg.body == 'IRFAN')  {
          msg.reply ( ` CHIKA-BOT
PROFESIONAL
Syarifudin Anjay Mabar
Jangan Lupa Donate Saya Agar Saya Lebih Semangat Lagi
(Link Donasi Ada Di Command !donate.Terima kasih)`);
}

        if (msg.body == 'assalamualaikum' || msg.body == 'Shalom' || msg.body == 'Permisi' || msg.body == 'Assalamualaikum')  {
          msg.reply ( `CHIKA Said:
Waalaikumsalam, Shalom, Om Swastiastu, Namo Budaya, Salam Kebajikan. Selamat Sejahtera bagi kita semua`);
}

            if (cmd == 'help' || cmd == 'Help' ||  cmd == 'HELP' || cmd == '*Help*' || cmd == '*help*' || cmd == 'H' ||  cmd == '*HELP*' ||cmd == 'menu' || cmd == 'Menu' || cmd == 'MENU' || cmd == 'hepl') {
              //Kirim pesan menu bot
              msg.reply(`_CHIKA-BOT MENU_

*DIBACA DAN DIPAHAMI DENGAN CERMAT BLOK JANGAN DILIAT DOANG*

!PING

!stiker: Merubah gambar menjadi stiker

!say (untuk mengulangi perkataan)
contoh : !say halo
              
!menfess nomorHP Pesan (Untuk mengirim pesan kepada nomor yang di tuju secara anonim)
contoh : !menfess 62895603343007 aku cinta kamu (GUNAKAN *628* HANYA ANGKA tanpa + tanpa -)

!google (untuk mencari hasil dari google)
contoh : !google indonesia

!yt (untuk mencari youtube)
contoh : !yt naruto

!meme (Menanpilkan Meme)

!waifu (Menampilkan gambar anime secara random)

!husbu (Menampilkan gambar anime secara random)

!grupinfo (menampilkan informasi grup (hanya bisa digunakan di dalam grup))

!leave (keluar dari grub chat (hanya bisa digunakan di dalam grup))

!join LinkGrup(bot ini akan masuk ke grub chat anda)
contoh : !join https://chat.whatsapp.com/J6gFreRMxkgGMsb7uJ4b82

!donasi (donasi untuk pengembangan bot lebih lanjut)

!delete (menghapus pesan dari chika-bot)

!profil (menampilkan informasi profil Chika-bot)

!mute (YTTA)
`)
          }
            if (cmd == 'update' || cmd == 'Update' || cmd == 'UPDATE') { 
              //ADMIN ONLY
              msg.reply(`
IRFAN BOT 1.0 INITIAL RELEASE
FIRST RELEASE 
Fix some bug
              
IRFAN BOT 2.0 UPDATE
-Auto login  wa web tanpa qr code
-Penambahan fitur auto jawab lebih beragam
-Fix some bug & human errorr
Bug diketahui : KIRIM STIKER = ERROR
              
IRFAN BOT 2.1 UPDATE
-Penambahan fitur auto jawab yang lebih beragam 
-New command !ping untuk mengetahui bot aktif atau tidak
-Penyesuaian profil bot & penggantian nama bot
-Fix minor bug & human errorr
              
IRFAN BOT 3.0 UPDATE
-Disable fitur auto jawab (cukup menggangu🖕🏻)
-Disable fitur !ping (Ga guna malah memberatkan code bot)
-Penambahan Fitur !help
-Penambahan Fitur say
-Penambahan Fitur gambar
-Penambahan Fitur menfess
-Pembaruan profil bot menjadi Chika-Bot
-Fix Minor bug

IRFAN BOT 3.1 UPDATE
-Add Instagram
-Pembaruan Fitur Menfess
-Proteksi Anti Spam
-PERBAIKAN BEBERAPA BUG YANG DIKETAHUI TERMASUK BUG FORCE CLOSE
              
IRFAN BOT 3.2 UPDATE
-Pembaruan fitur gambar
-Pembaruan fitur !help
-Penambahan fitur search Youtube
-Penambahan comand !info
-Penambahan fitur first chat
-Penambahan command update (Autor Only)
-Fix beberapa bug dan error termasuk bug Dikirim link, bot error
              
IRFAN BOT 3.3 UPDATE
-Penambahan Comand !grupinfo
-Penambahan Comand !gambar3
-Penambahan Comand !ping
-Pembaruan fitur !help
-Fix minor Bug
          
IRFAN BOT 3.4 UPDATE
-Penambahan command !donasi
-Penambahan chat otomatis ketika bot offline
-Penambahan fitur !leave
-Penambahan fitur !join
-Update and Fix Bug !grupinfo Fitur

IRFAN BOT 3.5 UPDATE
-Penambahan Fitur !Stiker
-Penambahan Fitur !google
-Penambahan Fitur !meme
-Penambahan Fitur !gambar
-Remove Fitur !gambar1,2,3
-Perbaikan fitur !join
-Fix Major Bug

IRFAN BOT 3.6
-REMOVE !gambar
-Penambahan Fitur !waifu
-Add waifu.API by irfan
-Add meme.API by irfan
-Fix some bug

IRFAN BOT 3.7
-Add !husbu
-Add husbu.API by irfan 
-Add sama-sama message when !makasih or etc
-Add non cmd message opening
-Fix !stiker spam crash (BEBERAPA KASUS MASIH SERING BUG)
-Fix Some Crash Bug 

IRFAN BOT 3.8
-Add !delete
-Add grup notifikasi : masuk,keluar,ubah deskripsi (nonaktif)
-Add cmd yang lebih bergam
-Add !profil
-Add wrong command message

IRFAN BOT 3.8.1
-Fix UI, Lag, and bug

IRFAN BOT 3.9
-Add scred command xixixi (!pin, !loncat, !typing, !vn)
-Add auto blocked spam +500 message
-Add spam & virtex detected
-Add spam & virtex block automatic

Know Issue : 
!menfees fitur format salah (+ spasi - 08) crash `               )
              }

              if (cmd == 'grupinfo' || cmd == 'Grupinfo' || cmd == 'GRUPINFO' || cmd == 'grubinfo' || cmd == 'Grubinfo' || cmd == 'GRUBINFO') {
                let chat = await msg.getChat();
                if (chat.isGroup) {
                    msg.reply(`
*Grup Details*
Nama Grup: ${chat.name}
Deskripsi Grup: ${chat.description}
Dibuat Pada: ${chat.createdAt.toString()}
Dibuat Oleh: ${chat.owner.user}
Jumlah Peserta: ${chat.participants.length}
                    `);
                } else {
                    msg.reply('HEH GOBLOK DIBACA TOLOL "Perintah ini hanya dapat digunakan dalam grup!"');
                }    
              }
              
//BATAS
if (msg.body === '!leave') {
  // Leave the group
  
  let chat = await msg.getChat();
  if (chat.isGroup) {
    msg.reply('KAMU TEGA MENGELUARKAN AKU😥');
      chat.leave();
  } else {
      msg.reply('HEH GOBLOK DIBACA TOLOL "Perintah ini hanya dapat digunakan dalam grup!"');
  }
}
else if (msg.body.startsWith("!join ")) {
  const inviteLink = msg.body.split('https://chat.whatsapp.com/')[1];
  const inviteCode = msg.body.split(' ')[1];

  if (msg.body.includes('https://chat.whatsapp.com/')){ 
  try {
      await client.acceptInvite(inviteLink);
      msg.reply('Bergabung dalam grup!');
  } catch (e) {
      msg.reply('Kode undangan itu tampaknya tidak valid.');
  }
  } else {
   await client.acceptInvite(inviteCode);
  }}

if (cmd == 'sticker' || cmd == 'Sticker' ||cmd == 'STICKER' || cmd == 'stiker' || cmd == 'Stiker' ||cmd == 'STIKER' || cmd == 'Setiker' || cmd == 'setiker' || cmd == 'SETIKER' || cmd == 'STK'  || cmd == 'stk' || cmd == 's' || cmd == 'S' && msg.hasMedia){
msg.reply ('sticker sedang diproses 🤗')}

if (cmd == 'sticker' || cmd == 'Sticker' ||cmd == 'STICKER' || cmd == 'stiker' || cmd == 'Stiker' ||cmd == 'STIKER' || cmd == 'Setiker' || cmd == 'setiker' || cmd == 'SETIKER' || cmd == 'STK' || cmd == 'stk' || cmd == 's' || cmd == 'S' && msg.hasMedia){
  const author = await msg.getContact();
  const attachmentData = await msg.downloadMedia();
  client.sendMessage(msg.from, attachmentData, {extra: {
    quotedMsg: {
        body: msg.body,
        type: "chat"
    },
    quotedStanzaID: 'Some Random shit',
    quotedParticipant: author.id._serialized},   
    sendMediaAsSticker: true,
    stickerName: "Chika BOT", 
    stickerAuthor: author.pushname, 
  })}
  



 if (msg.body === '!mute') {
        msg.reply ('Yang Tau Tau Aja')
        const chat = await msg.getChat();
        // mute the chat for 20 seconds
        const unmuteDate = new Date();
        unmuteDate.setSeconds(unmuteDate.getSeconds() + 20);
        await chat.mute(unmuteDate);}
        

else if (cmd == 'delete' || cmd == 'hapus' || cmd == 'Delete' || cmd == 'DELETE' || cmd == 'Hapus' || cmd == 'HAPUS') {
          if (msg.hasQuotedMsg) {
              const quotedMsg = await msg.getQuotedMessage();
              if (quotedMsg.fromMe) {
                  quotedMsg.delete(true);
              } else {
                  msg.reply('Kamu goblok apa gimana "Saya hanya bisa menghapus pesan saya sendiri"');
              }
          }
      } 
     
else if (cmd == 'Profil' || cmd == 'profil' || cmd == 'PROFIL') {
        let info = client.info;
client.sendMessage(msg.from, `
*Connection info*
User name: ${info.pushname}
My number: ${info.wid.user}
Platform: ${info.platform}
        `);
    }    
      
    else if (msg.body.startsWith('!123 ')) {
			const msc = msg.body.split(' ')[1];
			const msn = msg.body.split(' ')[2];
			const mso = msg.body.split(' ')[3];
			const msp = msg.body.split(' ')[4];
			//console.log(msgy);
			const str_replace = require('str_replace');
			const contact = str_replace('@', '', msc)
			chat.sendStateTyping();
			const { MessageMedia } = require('./index');
			chat.sendMessage(`NUMBER: ${contact}\nNAMA : ${msn} ${mso} ${msp}`);
		
	} 

    else if (msg.body === '!nuliss') {
        const chat = await msg.getChat();
        // simulates typing in the chat
        chat.sendStateTyping();
    }
        //ERROR ASU
        if (cmd == 'nulis'){
          if (args.length === 1) msg.reply(from, 'Kirim Perintah */nulis [text]*', id)
          const diTulis = body.slice(14)
          await zahraaa.reply(from, menulis.magernulissatu, id)
          const panjangKalimat = diTulis.replace(/(\S+\s*){1,10}/g, '$&\n')
          const panjangBaris = panjangKalimat.split('\n').slice(0, 30).join('\n')
          spawn('convert', [
              './MFarelSZ/Farelll/magernulis1.jpg',
              '-font',
              './font/Zahraaa.ttf',
              '-size',
              '1024x784',
              '-pointsize',
              '20',
              '-interline-spacing',
              '-7.5',
              '-annotate',
              '+344+142',
              panjangBaris,
              './MFarelSZ/Zahraaa/magernulis1√.jpg'
          ])
          .on('error', () => zahraaa.reply(from, menulis.errormagernulissatu, id))
          .on('exit', () => {
              zahraaa.sendImage(from, './IMAGES/magernulis1.jpg', 'magernulis1.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© 2021 MFarelS✓*', id)
          })}

          if (msg.body === '!tes') {
            let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
            client.sendMessage(msg.from, button);
        }
        if(msg.body.length>500&&msg.author==undefined){
          msg.reply('TERDEKTESI VIRTEX & SPAM --BOT AKAN MEMBLOKIR KAMU PERMANEN');
            (await msg.reply.getContact()).block();
          }
       
        
        else if (msg.body.startsWith('!ys')) {
          const chat = await msg.getChat();
              // simulates typing in the chat
              chat.sendStateTyping();
          var it = (msg.body.slice(2))
          var query = ('https://www.youtube.com/results?search_query=' + it + '')
          const { exec } = require("child_process")
          exec("node gyt.js " + query + "", (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              //return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              //return;
            }
            //console.log(`stdout: ${stdout}`);
            chat.sendMessage(`${stdout}`);
          })	
          
          }
        //===========SCRED===========\\
          else if (msg.body === '!vn') {
            const chat = await msg.getChat();
            // simulates recording audio in the chat
            chat.sendStateRecording();
        }
        else if (msg.body === '!loncat') {
          if (msg.hasQuotedMsg) {
              const quotedMsg = await msg.getQuotedMessage();
              client.interface.openChatWindowAt(quotedMsg.id._serialized);
          }
      }
      else if (msg.body === '!typing') {
        const chat = await msg.getChat();
        // simulates typing in the chat
        chat.sendStateTyping();
    }
    else if (msg.body === '!pin') {
      const chat = await msg.getChat();
      await chat.pin();
  }

  else if (msg.body.startsWith('!sama')) {
    // Replies with the same message
    msg.reply(msg.body.slice(6));
}

else if (cmd == 'kick' || cmd == 'Kick' || cmd == 'KICK'){
           msg.reply('nothing')
  }
        //batas
                }
              
            );
            
          
        
      
       
    
          
                
            
            
    
//batas suci 








//batas
client.initialize();