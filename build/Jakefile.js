var fs = require('fs');
var sys = require('sys');
var path = require('path');
var config = require('./config.js');
var exec = require('child_process').exec;

desc('This is the default task');
task('default', function (params) {
    console.log('Starting default task...');
});

task('clean', function (params) {
    console.log('Executing task clean...');
    try {
        fs.unlinkSync('dvc.js');
    } catch (e) {}

    console.log('Build complete.');
    console.log('');
});

task({'build' : [
    'dvc.js',
    'asynctest'
]}, function () {
    console.log('Build complete.');
});

file({'dvc.js': config.groups.dvc}, function () {
    console.log('building test.js');

    var files   = this.prereqs,
        outFile = this.name;

    concatSync(files, outFile);
    minify(outFile);

}, true);

task('asynctest', function () {
    setTimeout(complete, 1000);
}, true);

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
