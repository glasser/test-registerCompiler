Plugin.registerCompiler({
  extensions: ['color'],
  archMatching: 'web'
}, function () {
    return new Colorizer;
});

var Colorizer = function () {
};
Colorizer.prototype.processFilesForTarget = function (inputFiles) {
  _.each(inputFiles, function (inputFile) {
    var basename = inputFile.xxxBasename();
    if (! basename.match(/\.color$/))
      throw Error("no .color");
    var className = basename.substr(0, basename.length - 6);
    var color = inputFile.xxxContentsAsBuffer().toString('utf8').trim();
    inputFile.addStylesheet({
      path: inputFile.xxxPathInPackage() + '.css',
      data: "." + className + " { background-color: " + color + "; }\n"
    });
  });
};
