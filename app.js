const { getWebInterface, getPlayurl } = require('./src/axios/api/video');
const { getRefererByBvid } = require('./src/utils/getReferer');

const bvid = 'BV13A411x7Ex';
const qn = {
  '4k': 120,
  '1080p60': 116,
  '720p60': 74,
  '1080p+': 112,
  '1080p': 80,
  '720p': 64,
  '480p': 32,
  '360p': 16
}

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const appRoot = require("app-root-path");

console.log(appRoot.path);
console.log(path.join(appRoot.path,'radio'));

const run = async () => {
  try {
    const { data } = await getWebInterface(bvid);
    const { cid } = data;
    const res = await getPlayurl(bvid,cid,qn['1080p60']);
    const url = res.data.durl[0].url
    const referer = getRefererByBvid(bvid);    
    const target = path.join('path',`${bvid}.mp4`);
    if(fs.existsSync(target)) {
      console.log(`视频 ${target} 已存在`);
      return Promise.resolve();
    } else {
      const res = await axios.get(url,{
        headers: {
          referer
        },
        responseType: "stream",
      })
      console.log('开始下载···');
      const writer = fs.createWriteStream(target);
      res.data.pipe(writer);
      return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
    }
  } catch {
    console.log("下载失败");
  }
}

run();