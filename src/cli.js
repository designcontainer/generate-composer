// External dependencies.
const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
const chalk = require('chalk');
const { getPassword, setPassword } = require('keytar');

// Internal dependencies.
const GenerateComposerFile = require('./index');
const service = require('../package.json').name;

export async function cli(args) {
	getPassword(service, 'github')
		.then(async (token) => {
			if (!token || args.includes('--github-token')) {
				promptTokenAdd();
				return;
			}

			console.time('Generated Composer file in');
			const dir = path.dirname('./');
			if (!fs.existsSync(path.join(dir, 'wp-content', 'plugins'))) {
				console.error('Not a WordPress install!');
				return;
			}

			const name = `designcontainer/${path.basename(process.cwd())}`;
			const composer = new GenerateComposerFile(dir, name, token);

			let composerObj = null;
			if (await fs.existsSync(path.join(dir, 'composer.json'))) {
				composerObj = await composer.update();
			} else {
				composerObj = await composer.generate();
			}
			await composer.write(dir, composerObj.json);

			console.timeEnd('Generated Composer file in');
			console.log('File:', path.resolve(path.join(dir, 'composer.json')));
			console.log(chalk.green('Added:', composerObj.added.join(', ')));
			console.log(chalk.blue('Already Exists:', composerObj.exists.join(', ')));
			console.log(chalk.yellow('Ignored:', composerObj.ignored.join(', ')));
			console.log(chalk.red('Failed:', composerObj.failed.join(', ')));
		})
		.catch((error) => {
			console.error(error);
		});
}

function promptTokenAdd() {
	prompt.start({ allowEmpty: false, colors: true, message: 'Please enter your GitHub token' });
	prompt.get(['token'], (error, result) => {
		if (error) return console.error(error);
		setPassword(service, 'github', result.token);
	});
}
