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
    'target/js/dvc.js',
    'target/js/script.js',
    'target/css/stylesheet.css',
    'post-build'
]}, function () {
    console.log('Build complete.');
});

// Pre-build
task('pre-build', function () {
    fs.mkdirSync(target, '755');
    fs.mkdirSync(target+'/images', '755');
    fs.mkdirSync(target+'/js', '755');
    fs.mkdirSync(target+'/css', '755');
});

file({'target/js/script.js' : [
    '../lib/jquery/jquery.min.js',
    '../lib/jquery-ui/js/jquery-ui-1.8.10.custom.min.js',
    '../lib/raphael/raphael.js',
    '../lib/raphael/g.raphael-min.js',
    '../lib/raphael/g.pie.js',
    '../lib/underscore/underscore-min.js'
]}, function () {
    var files   = this.prereqs,
        outFile = this.name;
    console.log(outFile);
    concatSync(files, outFile);
    complete();
}, true);

// dvc.js
file({'target/js/dvc.js' : config.groups.dvc}, function () {
    var files   = this.prereqs,
        outFile = this.name;
    console.log(outFile);
    concatSync(files, outFile);
    minify(outFile);
}, true);

// stylesheet.css
file({'target/css/stylesheet.css' : config.groups.stylesheet}, function () {
    var files   = this.prereqs,
        outFile = this.name;
    console.log(outFile);
    concatSync(files, outFile);
    minify(outFile);
});

task('post-build', function () {
    var count = 0,
        total = 2;
    exec('cp -R ../images/* target/images/', function (error, stdout, stderr) {
        count++;
        if (count === total) complete();
    });
    exec('cp ../index_build.html target/index.html', function (error, stdout, stderr) {
        count++;
        if (count === total) complete();
    });
});

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
    var cmd  = 'java -jar ./tools/yuicompressor-2.4.5.jar',
        type = ' --type '+(inFile.substring(inFile.search(/\./)+1)),
        out  = ' -o '+(outFile || inFile)+' '+inFile;
    exec(cmd+type+out, function (error, stdout, stderr) {
        complete();
    });
}
