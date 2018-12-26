const Generator = require('yeoman-generator');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const config = require('./config')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        for (let optionName in config.options) {
            this.option(optionName, config.options[optionName]);
        }
        this.argument('appname', { type: String, required: false });
        this.appname = this.options.appname
    }

    async prompt() {
        if (!this.options['skip-welcome-message']) {
            this.log(
                yosay(
                    "Build a new generator in this yarn workspace"
                )
            )
        }
        this.appname = this.options.appname
        if (!!this.appname) {
            const detemineAppName = this.determineAppname();
            const answers = await this.prompt(
                {
                    type: 'input',
                    message: 'Please input project name',
                    name: 'appName',
                    default: detemineAppName
                }
            )
            this.appname = answers.appName;
        }
        this.answers = await this.prompt(config.prompts);
    }

    writing() {
        const templateData = {
            appname: this.appname,
            date: new Date().toUTCString(),
            ...this.answers
        }

        const copy = (input, output) => {
            this.fs.copy(this.templatePath(input))
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