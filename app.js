const getVideoBybvid = require('./src/main/getVideoBybvid');

const bvid = 'BV1vK4y1P74F'; // bv号 
const Page = 41;   // p几
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

const run = async () => {
  await getVideoBybvid(bvid,qn['1080p'],Page);
  console.log('下载完成——————');
  try {
  } catch {
    console.log("下载失败");
  }
}

run();