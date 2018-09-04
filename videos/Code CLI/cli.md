# VSCode CLI

![Install Code CLI](https://ahmda.ws/2LVbpgl)

1. Download, install and open Visual Studio Code for Mac.
2. Open the Command Palette (⌘ + ⇧ + P on Mac) OR View ❯ Command Palette
3. Type shell command to find and install `Shell Command: Install 'code' command in PATH command`

## Behind The Scene

This is what it installs behind the scene on MacOS. But prefer the above method.

```sh
cat << EOF >> ~/.bash_profile
# Add Visual Studio Code (code)
export PATH="\$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
EOF
```

Peace! ✌️
