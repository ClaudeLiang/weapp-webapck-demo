var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');
//var WebpackDevServer = require('webpack-dev-server')
var path = require('path')
var glob = require('glob')
var rm = require('rimraf')
var Program = require('commander')

Program
    .version('1.0.0')
    .option('-w, --watch')
    .option('-b, --build')
    .parse(process.argv)

emit(!!Program.watch)

function emit(watch) {
    Promise.all([
        getEntry().then(function (entry) {
            return webpckConfig(entry, watch)
        }),
        clean()
    ]).then(function (res) {
        console.info(res[1])
        return construct(res[0], watch)
    }).then(function (res) {
        console.log(res)
    }).catch(function (err) {
        console.log(err.join('\n'))
    })
}

function clean() {
    return new Promise(function (resolve, reject) {
        rm('./build', [], function (err) {
            if (!err) resolve('clean success');
            reject(err);
        })
    })
}

function construct(cfg, watch) {
    return new Promise(function (resolve, reject) {
        if (!watch) webpack(cfg, errHandler)
        else webpack(cfg).watch({
            aggregateTimeout: 300,
            poll: true
        }, errHandler)

        function errHandler(err, stats) {
            var jsonStats = stats.toJson();
            if (err) return handleFatalError(err);
            if (jsonStats.errors.length > 0) reject(jsonStats.errors);
            resolve(watch ? 'watching...' :'construct success');
        }
    })
}

function getEntry() {
    return new Promise(function (resolve, reject) {
        glob('./src/**/*.js', function (err, files) {
            if (err || files.length === 0) reject('here\'s no bull shit')
            var entry = {}
            Array.prototype.forEach.call(files, function(p) {
                entry[p] = p
            })
            resolve(entry)
        })
    })
}

function webpckConfig(entry) {
    return {
        entry: entry,
        output: {
            filename: '[name]',
            path: path.resolve(__dirname, 'build')
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                {from: './src/**/*.wxml'},
                {from: './src/**/*.wxss'},
                {from: './src/**/*.json'}
            ])
        ]
    }
}
