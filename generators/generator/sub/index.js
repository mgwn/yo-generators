const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const chalk = require('chalk');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.argument('name', { type: String, required: true });
    }

    writing() {
        const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
        const { name } = this.options
        this.fs.copy(this.templatePath(), this.destinationPath(name));
        mkdirp(this.destinationPath(`${name}/templates`));
        if (!!pkg.files | pkg.files.indexOf(this.options.name)) {
            this.log(chalk.yellow(`Add ${name} to package.json files`));
            pkg.files.push(name);
            this.fs.writeJSON(this.destinationPath('package.json'), pkg);
        }
    }

};