const { React } = require('powercord/webpack');
const { SwitchItem } = require('powercord/components/settings');

module.exports = React.memo(
  ({ getSetting, toggleSetting }) => (
    <div>
      <SwitchItem
        note='Toggle whether Steam links should be opened in the app or not'
        value={getSetting('open-in-app-steam', true)}
        onChange={() => toggleSetting('open-in-app-steam')}
      >
        Steam
      </SwitchItem>
      <SwitchItem
        note='Toggle whether Spotify links should be opened in the app or not'
        value={getSetting('open-in-app-spotify', true)}
        onChange={() => toggleSetting('open-in-app-spotify')}
      >
        Spotify
      </SwitchItem>
      <SwitchItem
        note='Toggle whether Tidal links should be opened in the app or not'
        value={getSetting('open-in-app-tidal', true)}
        onChange={() => toggleSetting('open-in-app-tidal')}
      >
        Tidal
      </SwitchItem>
    </div>
  )
);
