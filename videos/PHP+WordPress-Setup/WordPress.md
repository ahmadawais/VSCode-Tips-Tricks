# VSCode WordPress Setup, Formatting, Extensions

## Install WordPress Coding Standards

For having these standards you need to install a couple of things like Composer, PHPCS, WordPress Coding Standards. Run the following commands.

```sh
# Make ~/bin dir.
cd ~ && mkdir -p bin && cd bin

# Download install Composer.
curl -s http://getcomposer.org/installer | php

# Clone PHPCS and WPCS repo.
git clone https://github.com/squizlabs/PHP_CodeSniffer.git phpcs
git clone -b master https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards.git wpcs

# Install composer, phpcs, and phpcbf.
sudo ln -s ~/bin/composer.phar /usr/local/bin/composer
sudo ln -s ~/bin/phpcs/bin/phpcs /usr/local/bin/phpcs
sudo ln -s ~/bin/phpcs/bin/phpcbf /usr/local/bin/phpcbf

# Set phpcs configuration for wpcs.
phpcs --config-set installed_paths /Users/$USER/bin/wpcs
```

And then go to VSCode, install [phpcs](https://ahmda.ws/2CeELXC) extension and then go to settings ⌘ + , and add the following settings. Finally reload.

```json
// Setting for phpcs.
"phpcs.executablePath": "/usr/local/bin/phpcs",
"phpcs.standard": "WordPress",
```

Check the available standards `phpcs -i`
