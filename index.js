const { Plugin } = require('powercord/entities')
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

module.exports = class OpenInApp extends Plugin {
  startPlugin() {
    const MessageContent = getModule(m => m.type && m.type.displayName == 'MessageContent', false);

    // Inject app support for types of links
    inject('open-in-steam', MessageContent, 'type', this.openInSteam);

    MessageContent.type.displayName = "MessageContent"
  }

  openInSteam(args, res) {
    const children = res.props.children.find(c => Array.isArray(c));

    children.forEach(child => {
      if (!child.props?.href?.toLowerCase().includes('steamcommunity.com')) return;

      child.props.href = `steam://openurl/${child.props.title}`
    })

    return res;
  }

  pluginWillUnload() {
    uninject('open-in-steam')
  }
}