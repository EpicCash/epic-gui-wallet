// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: false,
      mainProcessFile: 'src/background.js',
      preload: 'src/preload.js',
      builderOptions: {

        "productName": "EpicWallet",
        "appId": "epic.tech",
        "directories": {
          "output": "build"
        },
        "extraFiles": [
          {
            "from": "hedwig",
            "to": "resources/bin/hedwig",
            "filter": [
              "**/*",
              "!test.js"
            ]
          }
        ],

        "dmg": {
          "contents": [
            {
              "x": 410,
              "y": 150,
              "type": "link",
              "path": "/Applications"
            },
            {
              "x": 130,
              "y": 150,
              "type": "file"
            }
          ]
        },
        "mac": {
          "icon": "build/icons/icon.icns",
          "target": "pkg",
          "extraFiles": [
            {
              "from": "resources/bin/mac",
              "to": "Resources/bin/mac",
              "filter": [
                "**/*"
              ]
            },
            {
              "from": "epicRs",
              "to": "resources/bin/epicRs",
              "filter": [
                "**/*",
                "!native",
                "!test.js",
                "!node.exe"
              ]
            }
          ]
        },
        "win": {
          "icon": "build/icons/icon.ico",
          "target": "nsis",
          "extraFiles": [
            {
              "from": "resources/bin/win",
              "to": "resources/bin/win",
              "filter": [
                "**/*"
              ]
            },
            {
              "from": "epicRs",
              "to": "resources/bin/epicRs",
              "filter": [
                "**/*",
                "!native",
                "!test.js"
              ]
            }
          ]
        },
        "nsis": {
          "oneClick": false,
          "allowToChangeInstallationDirectory": true
        },
        "linux": {
          "icon": "build/icons",
          "target": [
            "deb",
            "appImage"
          ],
          "extraFiles": [
            {
              "from": "resources/bin/linux",
              "to": "resources/bin/linux",
              "filter": [
                "**/*"
              ]
            }
          ],
          "desktop": {
            "Name": "Epic-Wallet",
            "Encoding": "UTF-8",
            "Type": "Application",
            "Comment": "Epic Wallet, mind your Epic!",
            "StartupWMClass": "Epic-Wallet"
          }
        }

      }


    }
  }
}
