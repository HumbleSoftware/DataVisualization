var fs = require('fs');
var sys = require('sys');
var path = require('path');
var config = require('./config.js');
var exec = require('child_process').exec;

var target = 'target';

// Default Task
desc('This is the default task');
task('default', function (params) {
    console.log('Starting default task...');
});

// Clean
task('clean', function (params) {
    console.log('Executing task clean...');
    try {
        console.log('  Removing "'+target+'".');
        exec('rm -rf '+target, function (error, stdout, stderr) {
            complete();
            console.log('Build complete.');
            console.log('');
        });
    } catch (e) {}
}, true);

// Build
task({'build' : [
    'pre-build',
    'target/js/dvc.js'
]}, function () {
    console.log('Build complete.');
});

// Pre-build
task('pre-build', function () {
    fs.mkdirSync(target, '755');
    fs.mkdirSync(target+'/js', '755');
    fs.mkdirSync(target+'/css', '755');
});

// dvc.js
file({'target/js/dvc.js': config.groups.dvc}, function () {
    var files   = this.prereqs,
        outFile = this.name;
    console.log(outFile);
    concatSync(files, outFile);
    minify(outFile);
}, true);


/**
 * Helper Methods
 */

function concatSync(files, outFile) {
    var output = '';
    files.forEach(function (file) {
        output += fs.readFileSync(file);
    });
    fs.writeFileSync(outFile, output);
    return outFile;
}

function minify (inFile, outFile) {
    var cmd = 'java -jar ./tools/yuicompressor-2.4.5.jar -o '+(outFile || inFile)+' '+inFile;
    exec(cmd, function (error, stdout, stderr) {
        complete();
    });
}
