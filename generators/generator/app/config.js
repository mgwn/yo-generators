module.exports = {
    options: {
        'skip-welcome-message': {
            desc: 'Skips the welecome message',
            type: Boolean
        },
        'skip-install-message': {
            desc: 'Skips the message after the installation of dependencies',
            type: Boolean
        }
    },
    prompts: [
        {
            type: 'input',
            name: 'description',
            message: 'description'
        },
        {
            type: 'version',
            name: 'version',
            message: 'version',
            default: '1.0.0'
        }
    ],
    dirsToCreate: [],
    filesToCopy: [
    ],
    filesToRender: [
        {
            input: '_README.md',
            output: 'README.md'
        }
    ]
}