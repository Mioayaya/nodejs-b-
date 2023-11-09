const getVideoBybvid = require('./src/main/getVideoBybvid');

const bvid = 'BV1oa4y1X7Zt';
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
  await getVideoBybvid(bvid,qn['1080p']);
  console.log('下载完成——————');
  try {
  } catch {
    console.log("下载失败");
  }
}

run();