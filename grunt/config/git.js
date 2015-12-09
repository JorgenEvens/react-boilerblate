"use strict";

module.exports = {
    gitcommit: {
        version: {
            options: {
                message: 'Bump version to v<%= pkg.version %>'
            },
            files: {
                src: ['package.json', 'src/Application/*.json']
            }
        }
    },

    gitpush: {
        version: {}
    },

    'git-describe': {
        options: {
            template: ''
        },
        status: {}
    }
};
