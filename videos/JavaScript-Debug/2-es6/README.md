# VSCode Node + Babel Recipe

Debug Modern JavaScript with VSCode. Part of [VSCode Course](https://VSCode.pro/).

## 1. init a module:

```sh
npm init -y
```

## 2. Babel setup

```sh
npm i -D babel-cli babel-core babel-preset-env
```

## 3. Add `.babelrc`

```sh
touch .babelrc
```

## 4. Edit `.babelrc`

```json
{
  "presets": ["env"]
}
```

## 5. The package.json file looks like

```json
{
  "name": "vscodepro",
  "description": "VSCode.pro for Power Users",
  "version": "1.0.0",
  "author": "AhmadAwais",
  "license": "MIT",
  "main": "index.js",
  "scripts": {
    "start": "babel-node index.js",
    "debug": "babel-node debug index.js"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-preset-env": "^1.7.0",
  }
}
```

## 6. My `.vscode/launch.json` file

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"type": "node",
			"request": "attach",
			"name": "Attach",
			"restart": true,
			"port": 9229
		},
		{
			"type": "node",
			"request": "launch",
			"protocol": "inspector",
			"name": "ES6 Debugger",
			"program": "${workspaceFolder}/index.js",
			"runtimeExecutable": "${workspaceRoot}/node_modules/.bin/babel-node",
			"runtimeArgs": ["--presets", "env"]
		}
	]
}
```

## 7. My node version `v9.7.1`

Peace! ✌️
