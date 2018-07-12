
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
    url: `http://dl.stream.qqmusic.qq.com/C400003v4UL61IYlTY.m4a?vkey=CDEBF23B9DF75B7AFD09A409507FC468FAB2A00F6653266F44CF2448A690A732B93A0D2A736A1FE6F2A4FAE8241397DB2094DDFF677B1603&guid=1051136425&uin=0&fromtag=66`
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
