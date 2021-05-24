const { Plugin } = require('powercord/entities')
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

module.exports = class OpenInApp extends Plugin {
  startPlugin() {
    const MessageContent = getModule(m => m.type && m.type.displayName == 'MessageContent', false);

    // Inject app support for types of links
    inject('open-in-steam', MessageContent, 'type', this.openInSteam);
    inject('open-in-spotify', MessageContent, 'type', this.openInSpotify);
    inject('open-in-tidal', MessageContent, 'type', this.openInTIDAL);
    MessageContent.type.displayName = "MessageContent"
  }

  //Open In Steam
  openInSteam(args, res) {
    const children = res.props.children.find(c => Array.isArray(c));

    if (children) {
      //store.steampowered.com
      for (var i = 0; i < children.length; i++) {
        if (!children[i].props?.href?.toLowerCase().includes('store.steampowered.com')) continue

        const url = children[i].props.href.split('/');

        if (!url[2] || !url[3]) continue;
        if (!['explore', 'wishlist', 'points', 'news', 'stats', 'about', 'app', 'sub'].includes(url[3].toLowerCase())) continue;

        children[i].props.href = `steam://openurl/https://${url.slice(2).join('/')}`;
      }
      //steamcommunity.com
      for (var i = 0; i < children.length; i++) {
        if (!children[i].props?.href?.toLowerCase().includes('steamcommunity.com')) continue

        const url = children[i].props.href.split('/');

        if (!url[2] || !url[3]) continue;
        if (!['discussions', 'workshop', 'market', 'id', 'chat', 'app'].includes(url[3].toLowerCase())) continue;

        children[i].props.href = `steam://openurl/https://${url.slice(2).join('/')}`;
      }
      //help.steampowered.com
      for (var i = 0; i < children.length; i++) {
        if (!children[i].props?.href?.toLowerCase().includes('help.steampowered.com')) continue

        const url = children[i].props.href.split('/');

        if (!url[2] || !url[3]) continue;

        children[i].props.href = `steam://openurl/https://${url.slice(2).join('/')}`;
      }
    }
    return res;
  }

  //Open In Spotify
  openInSpotify(args, res) {
    const children = res.props.children.find(c => Array.isArray(c));

    if (children) {
      //open.spotify.com
      for (var i = 0; i < children.length; i++) {
        if (!children[i].props?.href?.toLowerCase().includes('open.spotify.com')) continue;

        const url = children[i].props.href.split('/');

        if (!url[3] || !url[4]) continue;
        if (!['embed', 'search', 'local', 'playlist', 'user', 'starred', 'artist', 'album', 'track', 'episode'].includes(url[3].toLowerCase())) continue;

        children[i].props.href = `spotify:${url[3]}:${url[4]}`;
      }
    }

    return res;
  }

    //Open In TIDAL
    openInTIDAL(args, res) {
      const children = res.props.children.find(c => Array.isArray(c));
  
      if (children) {
        //open.spotify.com
        for (var i = 0; i < children.length; i++) {
          if (!children[i].props?.href?.toLowerCase().includes('tidal.com')) {
            continue;
          }
  
          const url = children[i].props.href.split('/');
  
          if (!url[3] || !url[4] || !url[5]) continue;
          if (!['track', 'video', 'artist', 'album', 'playlist', 'mix', 'radio'].includes(url[4].toLowerCase())) continue;
  
          children[i].props.href = `tidal://${url[4]}/${url[5]}`;
        }
      }
  
      return res;
    }

  pluginWillUnload() {
    uninject('open-in-steam');
    uninject('open-in-spotify');
    uninject('open-in-tidal');
  }
}
