import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64';

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }
  getLyric(){
    if(this.lyric){
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve,reject) => {
      getLyric(this.mid).then((res)=>{
        if(res.retcode === ERR_OK){
          this.lyric = Base64.decode(res.lyric);
          resolve(this.lyric)
        }else{
          reject('no lyric')
        }
      })

    })
    
  }
}


export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400004dADLe4ec8RG.m4a?vkey=6313975C5D220E1778E8541E2734DCBF0B06EC16A4C21B475B303F04E3287A1853EE71E8B1674DF06FEA1F7FEF68463278D931700325572E&guid=1051136425&uin=2195643971&fromtag=66`
  });
}


function filterSinger(singer) {
  let ret = [];
  if (!singer) {
    return "";
  }
  singer.forEach(s => {
    ret.push(s.name);
  });
  return ret.join("/");
}
