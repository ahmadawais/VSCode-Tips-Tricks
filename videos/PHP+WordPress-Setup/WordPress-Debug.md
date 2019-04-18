<h1 align="center">
  <img src="https://on.ahmda.ws/qMzI/c" />

  VSCode WordPress Debugging Setup: WordPress Xdebug Setup for Local by FlyWheel with VSCode
</h1><br>

## 🚅 TL;DR

- Make sure your `Local by FlyWheel` WordPress install is a custom install
- Configure `xdebug.remote_autostart = 1` in the `php.ini` file
- Restart your site container in `Local by FlyWheel` to apply new settings
- Install VSCode PHP Debugger extension
- Add PHP Debugger Configuration with an extra property for the `Listen for Xdebug` section i.e. `"pathMappings": {"/app/public": "${workspaceRoot}"}`

## 🚥 Detailed Tutorial

Here're are some easy steps to follow to make sure you can debug WordPress in Local by FlyWheel with VSCode:

- [🚅 TL;DR](#%F0%9F%9A%85-tldr)
- [🚥 Detailed Tutorial](#%F0%9F%9A%A5-detailed-tutorial)
	- [1️⃣ Custom WordPress Install](#1%EF%B8%8F%E2%83%A3-custom-wordpress-install)
	- [2️⃣ Configure Xdebug](#2%EF%B8%8F%E2%83%A3-configure-xdebug)
	- [3️⃣ Restart The Site](#3%EF%B8%8F%E2%83%A3-restart-the-site)
	- [4️⃣ Visual Studio Code Configuration](#4%EF%B8%8F%E2%83%A3-visual-studio-code-configuration)
	- [5️⃣ Debug Your WordPress](#5%EF%B8%8F%E2%83%A3-debug-your-wordpress)
- [🔥 Extra Plugin (optional)](#%F0%9F%94%A5-extra-plugin-optional)

### 1️⃣ Custom WordPress Install

> Make sure your `Local by FlyWheel` WordPress install is a custom install.

- ✅ Flywheel Local has Xdebug installed by default if you choose “Custom” instead of “Preferred” when setting up a new local environment.
- ⚠️ You can check your already installed WP with the ”Site Setup” tab. If you can change the PHP version there, you have the “Custom” environment running and you have Xdebug installed.
- ⚠️ If not, just export your site, import it back while creating a new site and this time choose “Custom”.


### 2️⃣ Configure Xdebug

> Configure `xdebug.remote_autostart = 1` in the `php.ini` file.

Now in the right environment we need to configure Xdebug for that:

- Go to your local WordPress install path E.g. `/PATH_WHERE_YOU_INSTALLED_WORDPRESS/conf/php/7.x.x/php.ini`
- Search for the `[Xdebug]` section
- Add the following line in this section

```ini
xdebug.remote_autostart = 1
```

> While only the above option is required but some 3rd party extension/plugin for local can sometimes change things so make sure in the `[Xdebug]` section all the following settings are set to `1` (only if your debugger is not working).

```ini
xdebug.scream = 1
xdebug.remote_enable = 1
xdebug.show_local_vars = 1
xdebug.remote_autostart = 1
xdebug.remote_connect_back = 1
```

Save the `php.ini` file.

### 3️⃣  Restart The Site

> Restart your site container in `Local by FlyWheel` to apply new settings.

- On the left side menu, right click on your site
- Select `Restart` option to restart the site.

![Restart GIF](https://on.ahmda.ws/2d212283e762/c)

### 4️⃣  Visual Studio Code Configuration

Let's start configuration of VSCode:

- First of all, install [PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug) extension
- Open your Local WordPress site project folder in VSCode. You should open the entire WordPress site folder i.e. `/PATH_WHERE_YOU_INSTALLED_WORDPRESS/app/public`
- Go to the Debug view in VSCode `COMMAND (⌘) + SHIFT (⇧) + D`
- Click “Add configuration” from the top toolbar
- Select `PHP` and add the configuration
- In the `.vscode/launch.json` file that was created inside the `Listen for Xdebug` section add `"pathMappings": {"/app/public": "${workspaceRoot}"}`

In short, your debug `launch.json` file will look like this:

``` json
{
	// Use IntelliSense to learn about possible attributes.
	// Hover to view descriptions of existing attributes.
	// For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
	"version": "0.2.0",
	"configurations": [
		{
			"name": "Listen for Xdebug",
			"type": "php",
			"request": "launch",
			"port": 9000,
			"pathMappings": {
				"/app/public": "${workspaceRoot}"
			}
		},
		{
			"name": "Launch currently open script",
			"type": "php",
			"request": "launch",
			"program": "${file}",
			"cwd": "${fileDirname}",
			"port": 9000
		}
	]
}
```

### 5️⃣  Debug Your WordPress

> Now go ahead and debug your WordPress app/plugin/theme and what not.

![WP VSCode Debug GIF](https://on.ahmda.ws/43bea345c293/c)

- After all this, click the play button next to “Listen for Xdebug” in the top debug bar
- Create a breakpoint in your PHP code e.g. add this line and a breakpoint`<?php $true_story = 'Ahmad is cool and VScode.pro is awesome!'; ?>` to `header.php` of your theme
- Browse your site and VSCode should pop up showing all your debug info

>Remember to stop debugging process when you stop working. A good theme helps with that, install [🦄 Shades of Purple →](https://marketplace.visualstudio.com/items?itemName=ahmadawais.shades-of-purple)


## 🔥 Extra Plugin (optional)

You can also install a local plugin called [`local-addon-xdebug-control`](https://github.com/lucatume/local-addon-xdebug-control) for UI based control of Xdebug settings in your `Local by FlyWheel` software.

> Make sure everything is set to yes for a sane debugging experience.

![Add-on](https://on.ahmda.ws/9155be150de8/c)


> For more follow [@MrAhmadAwais](https://twitter.com/MrAhmadAwais/) →

Peace! ✌️

---

#### ⚡︎ Setup Xdebug in Plain Docker for WordPress

Chris Bibby one of the VSCode.pro customers wrote a guide on [Setting up Xdebug with VSCode for WordPress in Docker](https://medium.com/@cmbibby/how-to-setup-xdebug-in-vscode-for-wordpress-in-docker-5d5276421afc?sk=b100e535d2e06ef001e6d885d1ab4d43) for folks who don't use FlyWheel's Local.
