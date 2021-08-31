const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
const { getPassword, setPassword } = require('keytar');
const GenerateComposerFile = require('./index');
const service = require('../package.json').name;

export async function cli(args) {
	getPassword(service, 'github')
		.then(async (token) => {
			if (!token || args.includes('--github-token')) {
				promptTokenAdd();
				return;
			}

			const dir = path.dirname('./');
			if (!fs.existsSync(path.join(dir, 'wp-content', 'plugins'))) {
				console.error('Not a WordPress install!');
				return;
			}

			const name = path.basename(process.cwd());
			const composer = new GenerateComposerFile(dir, name, token);

			let composerObj = null;
			if (await fs.existsSync(path.join(dir, 'composer.json'))) {
				composerObj = await composer.update();
			} else {
				composerObj = await composer.generate();
			}
			await composer.write(dir, composerObj.json);

			console.log('Done!');
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
