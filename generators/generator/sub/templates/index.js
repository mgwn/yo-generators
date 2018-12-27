const Generator = require('yeoman-generator');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const config = require('./config');
const commandExists = require('command-exists');
const pkg = require('../package.json')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        for (let optionName in config.options) {
            this.option(optionName, config.options[optionName]);
        }
        this.argument('name', { type: String, required: false });
    }

    async prompting() {
        if (!this.options['skip-welcome-message']) {
            this.log(
                yosay(
                    pkg.description
                )
            )
        }
        this.answers = await this.prompt(config.prompts);
    }

    writing() {

        if (!!this.options.name) {
            // if user input the name, then should create sub dir
            this.destinationRoot(this.destinationPath(this.options.name));
        }

        const context = {
            name: this.options.name || this.determineAppname,
            date: new Date().toUTCString(),
            ...this.answers
        };

        for (let { input, output } of config.filesToRender) {
            this.fs.copyTpl(this.templatePath(input), this.destinationPath(output), context);
        }

        for (let { input, output } of config.filesToCopy) {
            this.fs.copy(this.templatePath(input), this.destinationPath(output));
        }

        for (let item of config.dirsToCreate) {
            mkdirp(this.destinationPath(item));
        }
    }

    install() {
        const hasYarn = commandExists('yarn');
        this.installDependencies({
            npm: !hasYarn,
            yarn: hasYarn,

            bower: false,
            skipMessage: this.options['skip-install-message'],
            skipInstall: this.options['skip-install'],
        });
    }
};