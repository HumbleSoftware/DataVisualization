var fs = require('fs');
var path = require('path');
var config = require('./config.js');
var exec = require('child_process').exec;
var path = '../';

desc('This is the default task');
task('default', [], function (params) {

    console.log('Starting default task...');
    for (group in config.groups) {

        console.log();
        console.log('Starting group "'+group+'":');

        config.groups[group].forEach(function (file, index) {
            console.log(file);
            build();
        });

        console.log('Group complete.');
    }

    console.log();
    console.log('Build complete.');
}, true);

function build (files) {
    exec('ls', function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
}
