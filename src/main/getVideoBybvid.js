// 通过bv号爬取视频
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const appRoot = require("app-root-path");
const { getWebInterface, getPlayurl } = require("../axios/api/video");
const { getRefererByBvid } = require("../utils/getReferer");
const _path = appRoot.path;

const deleteArr = ['/','*','"\"','?','"',':','|'];

const replaceTitle = (title) => {
  let _title = title;
  for(let i in deleteArr) {
    _title = _title.replace(deleteArr[i],"");
  }
  return _title;
}

const getVideoBybvid = async (bvid,qn) => {
  const { data } = await getWebInterface(bvid);
  const { cid, title } = data;
  const res = await getPlayurl(bvid,cid,qn);
  const url = res.data.durl[0].url
  const referer = getRefererByBvid(bvid);
  let _title = replaceTitle(title);
  const target = path.join(_path,`/video/${_title}.mp4`);

  if(fs.existsSync(target)) {
    console.log(`视频: ${target} 已存在`);
    return Promise.resolve();
  } else {
    const res = await axios.get(url,{
      headers: {
        referer
      },
      responseType: "stream",
    })
    console.log('开始下载···',_title);
    const writer = fs.createWriteStream(target);
    res.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  }
}

module.exports = getVideoBybvid;