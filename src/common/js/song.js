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
    url: `http://dl.stream.qqmusic.qq.com/C400003jaSM148ORfL.m4a?vkey=F7E6478B2BC2EC430835486125DCF77EB62D6BCB05C0AEBC88A3AA73895B1DA35774FB0E5E0DE1D7FAB9A59587B5459663C2D4F952E7FB61&guid=1051136425&uin=2195643971&fromtag=66`
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
