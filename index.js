const { Plugin } = require('powercord/entities')
const { React, getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const Settings = require('./components/Settings');

const steamHostnames = [
  'store.steampowered.com',
  'steamcommunity.com',
  'help.steampowered.com',
];
const spotifyHostnames = [
  'open.spotify.com'
];
const tidalHostnames = [
  'tidal.com',
  'listen.tidal.com'
]

module.exports = class OpenInApp extends Plugin {

  startPlugin() {
    powercord.api.settings.registerSettings('open-in-app', {
      category: this.entityID,
      label: 'Open In App',
      render: Settings
    });

    const Anchor = getModule(m => m.default?.displayName == 'Anchor', false);
    inject('open-in-app', Anchor, 'default', this.openInApp.bind(this));
    Anchor.default.displayName = "Anchor";
  }

  openInApp(_, res) {
    if (!res.props.href) {
      return res;
    }

    const hostname = (res.props.href?.hostname || new URL(res.props.href).hostname).toLowerCase();

    if (steamHostnames.includes(hostname)) {
      if (this.settings.get('open-in-app-steam', true)) {
        res.props.href = `steam://openurl/${res.props.href}`;
      }
    }
    else if (spotifyHostnames.includes(hostname)) {
      if (this.settings.get('open-in-app-spotify', true)) {
        res.props.href = `spotify:${res.props.href}`;
      }
    } else if (tidalHostnames.includes(hostname.toLowerCase())) {
      if (this.settings.get('open-in-app-tidal', true)) {
        res.props.href = `tidal://${res.props.href}`;
      }
    }

    return res;
  }

  pluginWillUnload() {
    uninject('open-in-app');
  }
}
