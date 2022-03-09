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
          "icon": "public/favicon_io/android-chrome-512x512.png",
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
            },
            {
              "from": "resources/default.app.json",
              "to": "Resources/default.app.json",
              "filter": [
                "**/*"
              ]
            },
            {
              "from": "resources/default.config.json",
              "to": "Resources/default.config.json",
              "filter": [
                "**/*"
              ]
            }
          ]
        },
        "win": {
          "icon": "public/favicon_io/android-chrome-512x512.png",
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
            },
            {
              "from": "resources/default.app.json",
              "to": "Resources/default.app.json",
              "filter": [
                "**/*"
              ]
            },
            {
              "from": "resources/default.config.json",
              "to": "Resources/default.config.json",
              "filter": [
                "**/*"
              ]
            }
          ]
        },
        "nsis": {
          "oneClick": false,
          "allowToChangeInstallationDirectory": true
        },
        "linux": {
          "icon": "public/favicon_io/android-chrome-512x512.png",
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
            },
            {
              "from": "resources/default.app.json",
              "to": "resources/default.app.json",
              "filter": [
                "**/*"
              ]
            },
            {
              "from": "resources/default.config.json",
              "to": "resources/default.config.json",
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
