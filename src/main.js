var fs = require('fs');
var path = require('path');

/**
 * copy file from source to target
 * @param  {String}   src    source file path
 * @param  {String}   target target file path
 * @param  {Function} cb     the callback for error occur
 * @return {void}
 */
var _copyFile = function (src, target, cb) {
    var cbCalled = false;

    var rs = fs.createReadStream(src);
    rs.on("error", done);

    var ws = fs.createWriteStream(target);
    ws.on("error", done);
    ws.on("close", function(ex) {
        done();
    });
    rs.pipe(ws);

    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
};

/**
 * create folders in folder path, is similar to mkdir -p aaa/bbb/ccc
 * @param  {String} dirpath folder path
 * @param  {String} mode    folder's file mode, pass to mkdirSync's second argument
 */
var _mkdir = function(dirpath, mode){
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
            if (!dirname){
                pathtmp = '/';
            }
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }

            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
};

/**
 * traversal folder then excute the callback
 *     callback's arguments: {
 *         path: filePath,
 *         type: 1|0    1: file  0: folder
 *     }
 * @param  {String}   src folder path
 * @param  {Function} cb  callback
 * @return {void}
 */
var _readDir = function(src, cb){
    var isPathExists = fs.existsSync(src);
    if (isPathExists){
        var realPath =fs.realpathSync(src);
        var sta = fs.statSync(realPath);
        if (sta.isFile()){
            cb({
                path: realPath,
                type: 1
            });
        } else if (sta.isDirectory()){
            cb({
                path: realPath,
                type: 0
            });
            var dirs = fs.readdirSync(src);
            dirs.forEach(function(dirName, index){
                _readDir(realPath + path.sep + dirName, cb);
            });
        }
    }
};

module.exports = {
    copyFile: _copyFile,
    mkdir: _mkdir,
    readDir: _readDir
};