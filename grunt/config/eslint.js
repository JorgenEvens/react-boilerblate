"use strict"

module.exports = {
    eslint: {
        dist: {
            options: {
                fix: true
            },
            src: [ 'src/**/*.{jsx,js}', '!src/js/build.js' ]
        }
    }
};
