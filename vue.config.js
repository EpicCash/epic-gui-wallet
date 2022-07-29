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

        "productName": "EpicWallet-4.0.0-beta",
        "afterSign": "./build/notarize.js",
        "appId": "com.github.epiccash.epic-gui-wallet",
        directories: {
          output: "build",
        },


        /*
        "directories": {
          "output": "build"
        },
        */


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
        "pkg": {
          "isRelocatable": true,
          "isVersionChecked": false,
          "hasStrictIdentifier": false,
          "overwriteAction": "upgrade"
        },
        "mac": {
          "icon": "public/favicon_io/android-chrome-512x512.png",
          "category": "public.app-category.finance",
          "provisioningProfile": "build/Epiccash_Wallet_Provisioning_Profile.provisionprofile",
          //"artifactName": "${productName}.${ext}",
          "target": "dmg",
          "publish": {
            "provider": "github",
            //"private": false,
            //"owner": "EpicCash",
            //"repo": "epic-gui-wallet",
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
          "allowToChangeInstallationDirectory": true
        },
        "linux": {
          "category": "Utility",
          "executableName": "EpicWallet-4.0.0-beta",
          "artifactName": "${productName}.${ext}",
          "icon": "public/favicon_io/android-chrome-512x512.png",
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
            "Name": "Epic-Wallet 4.0.0-beta",
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
