'use strict'

/**
 * 1. 获取src/page下所有目录
 * 2. 在获取到的目录下找 route.config.json 文件
 * 3. 读取文件内容，判断fileName是否重复，重复报错 不重复，安装内生成入口文件
 * 4. 入口文件在src/output内部
 */
const path = require('path');
const fs = require('fs-extra');
var render = require('json-templater/string');
const PAGE_PATH = path.resolve(__dirname, '../src/page');
const OUT_PUT_PATH = path.resolve(__dirname, '../src/output');
let TPL_ENTRY = require('./lib/entry.js');
if(!fs.existsSync(PAGE_PATH)){
    throw new Error('Not Find page') 
}
if(!fs.existsSync(OUT_PUT_PATH)){
    fs.ensureDirSync(OUT_PUT_PATH);
}
// 清空output
fs.emptyDirSync(OUT_PUT_PATH);
// 获取page下的目录
const pages = fs.readdirSync(PAGE_PATH);

let routeNumbrs = [];
// 循环获取 route.config.json 文件
pages.forEach((name,index)=>{
    if(name != 'components'){
        let _path = path.join(__dirname, '../src/page/' + name + '/route.config.json') ;
        if(fs.existsSync(_path)){
            routeNumbrs.push(require(_path))
        }
    }
})
// 如果json文件数和pages个数不相同 报错
if(routeNumbrs.length != pages.length){
    throw new Error('route.config.json files is Incomplete') 
}
let exsitFiles = [];
let mesgs = [];
// 文件生成函数
const buildEntryFiles = (arr) =>{
    arr.forEach((val, index)=>{
        if(!val.redirect && val.fileName){
            if(exsitFiles.filter(o=>{return o == val.fileName}).length > 1){
                throw new Error('fileName is repeated! ' + fileName) 
            }
            exsitFiles.push(val.fileName);
            mesgs.push({
                fileName: val.fileName,
                describe: val.describe
            })
            // 生成文件
            fs.writeFileSync(path.join(__dirname, '../src/output/'+val.fileName+'.js'), render(TPL_ENTRY, {
                path: 'PAGE/'+val.path,
                id: val.fileName
            }));

        }
        if(val.children && val.children.length){
            buildEntryFiles(val.children)
        }
    })
}
// 生成文件
routeNumbrs.forEach((_s,s)=>{
    buildEntryFiles(_s);
    // console.log('output entry buiild successful!')
})
// 写入文件列表json
// if(mesgs && mesgs.length){
//     fs.writeFileSync(path.join(__dirname, '../dist/files.json'), JSON.stringify(mesgs));
// }