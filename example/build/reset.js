'use strict'
const fs = require('fs-extra');
const path = require('path');
const render = require("json-templater/string");
let TPL_ROUTER = require('./lib/router.js');
// router ----

let _p = path.join(__dirname, '../src/page/'),
    mks = [];

if (fs.existsSync(_p)) {
    fs.readdirSync(_p).forEach((el, i) => {
        if(el !== 'components'){
            let _path = ('../src/page/' + el + '/route.config.json');
            if (el != '.svn' && fs.existsSync(path.join(__dirname, _path))) {
                mks.push(el);
            }
        }
    });
}
let routers = [];
let list = [];
mks.forEach((val)=>{

    routers.push(`import ${val}RouterConfig from "@/page/${val}/route.config.json"`);
    list.push('...'+val+'RouterConfig');
})
fs.writeFileSync(path.join(__dirname, '../src/router/routes.js'), render(TPL_ROUTER, {
    routers: routers.join(';\n'),
    list: list.join(',')
}));