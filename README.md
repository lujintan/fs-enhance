# fs-enhance
generate files by the sample files, [see more](http://www.kkyfj.com/opensource/fs-enhance)

###Installation

```base
npm install -g fs-enhance
```

###API

####fsEnhance.copyFile
copy file

######parameter:

* `src`: `String` source file path
* `target`: `String` target file path
* `cb`: `Function` the callback for error occur

######example:

```javascript
var fsEnhance = require('fs-enhance');

fsEnhance.copyFile('aaa.js', 'bbb.js', function(err) {
    if (err){
        throw new Error('Error: copy file aaa.js error');
    }
});
```

####fsEnhance.mkdir
create folders in folder path, is similar to mkdir -p aaa/bbb/ccc

######parameter:

* `dirpath`: `String` source folder path
* `mode`: `String|Number` folder's file mode, mode defaults to 0777

######example:

```javascript
var fsEnhance = require('fs-enhance');

fsEnhance.mkdir('aaa/bbb/ccc');
```

####fsEnhance.readDir
traversal folder then excute the callback

######parameter:

* `src`: `String` source file path
* `cb`: `Function` the callback for each file or folder
```javascript
//cb's arguments
{
    path: filePath,   //file's real path
    type: 1|0    //file's type 1: file  0: folder
}
```

######example:

```javascript
var fsEnhance = require('fs-enhance');

fsEnhance.readDir('./test', function(fileInfo){
    console.log(fileInfo.path);
    if (fileInfo.type === 1) {
        //file ...
    } else if (fileInfo.type === 0) {
        //folder ...
    }
});
```
