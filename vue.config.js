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
        "afterSign": "./build/notarize.js",
        "appId": "com.github.epiccash.epic-gui-wallet",
        directories: {
          output: "build",
        },
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
              "type": "file",

            }
          ]
        },

        "mac": {
          "icon": "public/favicon_io/EpicCash_logo_gold_border1024x1024.png",
          "category": "public.app-category.finance",
          "provisioningProfile": "build/Epiccash_Wallet_Provisioning_Profile.provisionprofile",
          "target": "default",
          "publish": {
            "provider": "github",
            "releaseType": "draft",
            "channel": "latest",
          },
          "extraFiles": [
            {
              "from": "resources/bin/mac",
              "to": "Resources/bin/mac",
              "filter": [
                "**/*"
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
            },
            {
              "from": "resources/foundation.json",
              "to": "Resources/foundation.json",
              "filter": [
                "**/*"
              ]
            },
            {
              "from": "resources/epic-server.toml",
              "to": "Resources/epic-server.toml",
              "filter": [
                "**/*"
              ]
            }
          ]
        },
        "win": {
          "icon": "public/favicon_io/EpicCash_logo_gold_border1024x1024.png",
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
            },
            {
              "from": "resources/foundation.json",
              "to": "Resources/foundation.json",
              "filter": [
                "**/*"
              ]
            },
            {
              "from": "resources/epic-server.toml",
              "to": "Resources/epic-server.toml",
              "filter": [
                "**/*"
              ]
            }
          ]
        },
        "nsis": {
          "oneClick": false,
          "allowToChangeInstallationDirectory": false
        },
        "linux": {
          "category": "Utility",
          "executableName": "EpicWallet",
          "icon": "public/favicon_io/EpicCash_logo_gold_border1024x1024.png",
          "packageCategory": "Utility",
          "maintainer": "Johannes Hahn <j.hahn@eccence.digital>",
          "synopsis": "Epic Wallet, mind your Epic!",
          "target": [
            "AppImage"
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
            },
            {
              "from": "resources/foundation.json",
              "to": "resources/foundation.json",
              "filter": [
                "**/*"
              ]
            },
            {
              "from": "resources/epic-server.toml",
              "to": "resources/epic-server.toml",
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
