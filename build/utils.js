// 引入node path，glob API
var path = require('path');
var glob = require('glob');

// 路径查询
exports.pickFiles = function(options) {
    var files = glob.sync(options.pattern);
    return files.reduce(function(data, filename) {
        var matched = filename.match(options.id);
        var name = matched[1];
        data[name] = path.resolve(__dirname, filename);
        return data;
    }, {});
};

// 获取全路径
exports.fullPath = function(dir) {
    return path.resolve(__dirname, dir);
};


// 获取ip地址
exports.getIP = function() {
    var os = require('os');
    var IPv4 = '127.0.0.1';
    var interfaces = os.networkInterfaces();
    for (var key in interfaces) {
        interfaces[key].some(function(details){
            if ( key == '本地连接' && details.family == 'IPv4') {
                IPv4 = details.address;
                return true;
            }
        });
    }
    return IPv4;
}


