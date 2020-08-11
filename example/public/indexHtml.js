'use strict'

const fs = require('fs-extra');
const render = require("json-templater/string");
const path = require('path');

let HTMLString =  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!-- cacah ++ -->
    <meta http-equiv="pragram" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
    <title></title>
    <link rel="shortcut icon" type="image/x-icon" href="/common/images/favicon.ico">
    <!-- 图标 -->
    <link rel="stylesheet" href="/common/icon/lib/index.css"/>
    <link rel="stylesheet" href="/common/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="/common/css/materialdesignicons.min.css" />
    <!-- 组件库样式 -->
    <link rel="stylesheet" href="/common/plugins/components-ui/2.5.4/theme-chalk/index.css" />
    <link rel="stylesheet" href="/common/plugins/common-ph/1.3.3/css/common-ph.min.css" />
    <link rel="stylesheet" href="/common/plugins/file-view/1.2.2/theme-chalk/index.css" />
    <!-- 公共样式 -->
    <link rel="stylesheet" href="/common/styles/1.0.0/lib/index.css" />
    <script type="text/javascript" src="/common/config/ah-config.js?_={{version}}"></script>
</head>
<body>
    <!-- 基本布局 -->
    <div id="app">
        <div class="sy-home-header">
            <div id="page-header"></div>
        </div>
        <div class="sy-home-body" id="app-container"></div>
        <div class="sy-home-footer" >
            <div id="page-footer"></div>
        </div>
    </div>
    
    <!-- others -->
    <script type="text/javascript" src="/common/plugins/echarts/4.0.5/echarts.min.js"></script>
    <script type="text/javascript" src="/common/plugins/jquery/jquery.min.js"></script>
    <script type="text/javascript" src="/common/plugins/jquery/jquery.ztree.all.min.js"></script>
    <!-- 引入公共部分 -->
    <% if (process.env.NODE_ENV == 'development') { %>
        <script type="text/javascript" src="/common/plugins/common-ph/1.3.4/js/common-ph.min.js"></script>
    <% } %>
    <% if (process.env.NODE_ENV == 'production') { %>
        <script type="text/javascript" src="/common/plugins/common-ph/1.3.3/js/common-ph.min.js"></script>
    <% } %>
    <script type="text/javascript" src="/common/plugins/file-view/1.2.2/fileview.min.js"></script>
    <script type="text/javascript" src="/common/plugins/components-ui/2.5.4/element.min.js"></script>
    <script type="text/javascript" src="/common/plugins/components-ui/2.5.4/umd/locale/en.js"></script>
    
</body>
</html>
`

fs.writeFileSync(path.join(__dirname, 'index.html'), render(HTMLString, {
    version: new Date().getTime()
}));