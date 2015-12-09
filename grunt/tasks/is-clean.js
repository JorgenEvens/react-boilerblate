"use strict";

module.exports = function(grunt) {
    grunt.registerTask('is-clean', function() {
        grunt.event.once('git-describe', function(v){
            if( v.dirty == '-dirty' )
                grunt.fail.warn('Repository is still dirty!');
        })
        grunt.task.run('git-describe');
    });
};
