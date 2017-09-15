---
title: 上传文件
---

## 代码演示

### 注

目前该上传组件采用FormData向后台提交文件数据。

### 基本展示形式（列表形式）, 用于表单上传

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-upload action='https://nos.kaolafed.com/upload'></jr-upload>
```
<!-- demo_end -->

### 卡片展示形式，用于表格上传

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-upload action='https://nos.kaolafed.com/upload' list-type="card"></jr-upload>
```
<!-- demo_end -->

### 基本展示形式，配置多选上传

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-upload action='https://nos.kaolafed.com/upload' multiple={true}></jr-upload>
```
<!-- demo_end -->

### 卡片展示形式，配置多选上传

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-upload action='https://nos.kaolafed.com/upload' file-list={list} list-type="card" multiple={true}></jr-upload>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        list: [
            {
                name: 'kaola-logo.jpeg',
                url: 'http://haitao.nos.netease.com/264271ddbec447288f17aef71119b1f4.png?imageView&thumbnail=220x0&quality=85&v=1'
            },
            {
                name: '权限申请交互.rar',
                url: 'http://jira.netease.com/secure/attachment/176692/%E6%9D%83%E9%99%90%E6%89%B9%E9%87%8F%E7%94%B3%E8%AF%B7%E4%BA%A4%E4%BA%92-%E7%94%B3%E8%AF%B7%E7%AF%AE.rar'
            },
            {
                name: 'app-2dcode.jpg',
                url: 'http://pic23.nipic.com/20120903/10422454_211025593122_2.jpg'
            }
        ]
    }
});
```
<!-- demo_end -->

### 文件类型限制

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-upload action='https://nos.kaolafed.com/upload' file-list={list} accept=".jpg,.zip,video/*,audio/*"></jr-upload>
```
<!-- demo_end -->

### 文件大小限制

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-upload action='https://nos.kaolafed.com/upload' max-size="830M"></jr-upload>
```
<!-- demo_end -->

### 每行展示文件个数和总文件个数限制

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-upload action='https://nos.kaolafed.com/upload' multiple={true} num-limit={15} num-perline={4}></jr-upload>
```
<!-- demo_end -->

### 带有已上传文件的形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-upload action='https://nos.kaolafed.com/upload' file-list={list}></jr-upload>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        list: [
            {
                name: 'kaola-logo.jpeg',
                url: 'http://haitao.nos.netease.com/264271ddbec447288f17aef71119b1f4.png?imageView&thumbnail=220x0&quality=85&v=1'
            },
            {
                name: '权限申请交互.rar',
                url: 'http://jira.netease.com/secure/attachment/176692/%E6%9D%83%E9%99%90%E6%89%B9%E9%87%8F%E7%94%B3%E8%AF%B7%E4%BA%A4%E4%BA%92-%E7%94%B3%E8%AF%B7%E7%AF%AE.rar'
            },
            {
                name: 'app-2dcode.jpg',
                url: 'http://pic23.nipic.com/20120903/10422454_211025593122_2.jpg'
            }
        ]
    }
});
```
<!-- demo_end -->
