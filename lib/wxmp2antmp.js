var wxml2axml = require('wxml2axml');
var fs = require('fs');
var shelljs = require('shelljs');

function to (from, to) {
    file = fs.readFileSync(from, 'utf8');
    if (/\.axml$/i.test(from)) {
        // console.log(from)
        file = file.replace('onTap', 'bindTap');
        // file = wxml2axml.compiler(file);
        fs.writeFile(to, file, function (err) {
            if (err) throw err;
        });
    } else if (/\.js$/i.test(from)) {
        file = 'const my = wx;\n' + file;
        fs.writeFile(to, file, function (err) {
            if (err) throw err;
        });
    } else if (/\.wxss$/i.test(from)) {
        file = file.replace('.acss"', '.wxss"').replace('.acss\'', '.wxss\'');
        fs.writeFile(to, file, function (err) {
            if (err) throw err;
        });
    } else {
        shelljs.cp(from, to);
    }
}
module.exports = {
    to: to 
}