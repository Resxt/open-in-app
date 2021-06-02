const { Plugin } = require('powercord/entities')
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

module.exports = class OpenInApp extends Plugin {
  startPlugin() {
    const MessageContent = getModule(m => m.type && m.type.displayName == 'MessageContent', false);
    inject('open-in-app', MessageContent, 'type', this.openInApp);
    MessageContent.type.displayName = "MessageContent"
  }

  openInApp(args, res) {
    const children = res.props.children.find(c => Array.isArray(c));
   
    children.forEach(child => {
      if (child.props?.href?.toLowerCase().includes('open.spotify.com')) {
        child.props.href = `spotify:${child.props.title}`
      } else if (child.props?.href?.toLowerCase().includes('store.steampowered.com') || child.props?.href?.toLowerCase().includes('steamcommunity.com') || child.props?.href?.toLowerCase().includes('help.steampowered.com')) {
        child.props.href = `steam://openurl/${child.props.title}`
      } else if (child.props?.href?.toLowerCase().includes('tidal.com') || child.props?.href?.toLowerCase().includes('listen.tidal.com')) {
        child.props.href = `tidal://${child.props.title}`
      }

    })
    return res;
  }

  pluginWillUnload() {
    uninject('open-in-app');
  }
}
