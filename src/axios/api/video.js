const request = require("../axios")

// 获取视频信息
const getWebInterface = (bvid) => {
  return request({
    url: `web-interface/view?bvid=${bvid}`,
    method: 'GET',
  })
}

const getPlayurl = (bvid,cid,qn) => {
  return request({
    url: `player/playurl`,
    method: 'GET',
    params: {
      bvid,cid,qn
    }
  })
}

module.exports = {
  getWebInterface,
  getPlayurl
}