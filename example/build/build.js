'use strict'

/**
 * Build npm all
 */
const shell = require('shelljs');
const signale = require('signale');
const config = require('./config');
const utils = require('./utils');

const { Signale } = signale;

//npm run build:entry
const entrytask = 'npm run build:entry';
signale.start(entrytask);
const entryinteractive = new Signale({ interactive: true });
const entryresult = shell.exec(`${entrytask} --silent`);
if (entryresult.code !== 0) {
	entryinteractive.error(entrytask);
	return false;
}
entryinteractive.success(entrytask);

const tasks = [
	'npm run clean',
	'npm run build:html',
	'npm run reset',
	'npm run build:main'
];

if(Object.keys(utils.entries()).length > 0){
	tasks.push('npm run build:views')
}

tasks.every(task => {
	signale.start(task);

	const interactive = new Signale({ interactive: true });
	interactive.pending(task);

	const result = shell.exec(`${task} --silent`);

	if (result.code !== 0) {
		interactive.error(task);
		return false;
	}

	interactive.success(task);
	return true;
});