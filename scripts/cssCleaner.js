var fs = require('fs');

console.log("Cleaning minified CSS");
fs.readFile("dist/index.js", function(err, buf) {
    if (err) console.log(err);
    var file = buf.toString();
    var filepart1 = file.substring(0, file.indexOf('start:css'));
    var filepart2 = file.substring(file.indexOf('end:css')+'end:css'.length, file.length);
    var css = file.substring(file.indexOf('start:css')+'start:css'.length, file.indexOf('end:css')-'end:css'.length+1);
    css = css.replace(/\s\s+/g, '').replace(/\\n/g, '')
        .replace(/ > /g, '>')
        .replace(/: /g, ':')
        .replace(/{ /g, '{')
        .replace(/ }/g, '}');
    var final = filepart1+css+filepart2;
    fs.writeFile("docs/index.js", final, (err) => {
        if (err) console.log(err);
    });
    fs.writeFile("dist/index.js", final, (err) => {
        if (err) console.log(err);
        console.log("Done!");

        var stats = fs.statSync("dist/index.js");
        console.log("Final bundle size: " + parseFloat(stats.size / 1024).toFixed(2) + " kb")
    });
});