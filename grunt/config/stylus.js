"use strict";

module.exports = {
    stylus: {
        main: {
            files: {
                'src/css/build.css': ['src/**/*.styl']
            },
            options: {
                paths: ['.', 'src/css', 'src/components'],
                sourcemap: { comment: true },
                compress: false,
                linenos: true,
                use: ['nib']
            }
        }
    }
};
