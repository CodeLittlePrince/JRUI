---
title: 快速上手
type: components
order: 0
---



## regUI

regUI 是一个基于 Regularjs 的组件库，主要用于中后台系统

### 引入 regUI

```
npm i regularjs@0.4.3 regUI -S
```

```javascript
import REGUI from 'regUI'
import 'node_modules/regUI/dist/css/regUI.default.min.css'
```

或者直接在需要引入的页面上

```html
<link rel="stylesheet" href="//unpkg.com/regUI/dist/css/regUI.default.min.css">
<script type="text/javascript" src="//unpkg.com/regUI/dist/vendor/regular.min.js"></script>
<script type="text/javascript" src="//unpkg.com/regUI/dist/js/regUI.min.js"></script>
```

以这种内嵌 Script 方式引入的时候 REGUI 会自动挂在 Window 上

### 使用 regUI

由于使用 NEIUI 的组件需要先注册，我们可以在工程里面的 BaseComponent 里面使用 REGUI 暴露出来的一个 install 方法来将组件注册到 BaseComponent 上，这样继承自 BaseComponent 的组件就可以直接在模板里面使用组件了

```javascript
import { install } from 'regUI';
import Regular from 'regularjs';

const BaseComponent = Regular.extend({
    //
});
install(Regular);
```

如果不想将 REGUI 的组件全部注册到全局上，或者是自己已有的组件和 REGUI 里面的组件命名冲突，也可以手动的注册想要使用的组件到 Regular 实例上

```
var Component = BaseComponent.extend({}).component('kl-tooltip', REGUI.KLTooltip)
```