# 卡片集合工程

![](https://img.shields.io/npm/v/xmmp-cli.svg)

请保持本地 xmmp-cli 为最新版本

### Start

安装依赖

```
npm install # 或 yarn install
```

启动服务

```
npm run serve
```

⚠️ 预览，预览需要通过手机 app 扫码，执行下面命令生成二维码

```
# 端口按照本地的来
xmmp qrcode 8080
```

可以看到本地存在的 demo 卡片

###  Usage

### 添加一个卡片

```
xmmp card test-123
```

会在 `src/card-collection` 目录下新建卡片目录 `test-123`

### 预览卡片

修改 `src/main.js` 中的组件名称

```
// 当前预览的卡片组件名
const componentName = 'test-123'
```

### 打包单个卡片

```
xmmp build test-123
```

### 批量打包

```
xmmp build
```

###  Advance Usage

在使用高级功能之前，我们需要达成一些共识：卡片命名和项目目录规范。

#### 卡片命名

对于业务小程序，一般会使用多个 tab 去存放不同功能业务的卡片，我们约定卡片名称为：

```
# 卡片名称由卡片标识和卡片 id 组成，中间用 - 分隔
<业务模块>_<tabIndex>_<tabCardIndex>-<appId>
```

例如：我在写"产能外迁"业务，业务包含 3 个 tab，每个 tab 下有很多卡片，如果我在开发"第一个 tab 下的第 2 个卡片"，那么卡片名称应该是 `capacity_tab1_2-<appId>`。

> ⚠️ 其中卡片标识为 capacity_tab1_2，我们需要在后台创建好卡片，再用 卡片标识 和 appId 来本地初始化文件

#### 目录规范

在了解卡片名称约定后，我们还需要了解目录规范，这在拷贝模版数据时至关重要。

因为卡片还包含了自身的数据，例如 echarts 那么多配置项。

所以，我们约定，卡片中的所有数据应该来自 `src/mock` 目录，借用上面的例子，我们应该在 `src/mock` 目录下创建 `capacity` 文件夹，文件数据名称为 `<业务模块>` 名称，每个 tab 对应一个文件，目录结构为：

```
src/
  -- mock/
    -- capacity/
      -- tab1.js
      -- tab2.js
      -- tab3.js
```

其中每个 tab 的数据文件的格式：

```
export default [
  // 卡片1
  {},
  // 卡片2
  [],
  // 卡片3
  {}
]
```

### 基于已存在的卡片创建卡片

很多时候，不同的卡片所使用的组件是一致的，包括数据，如果手动拷贝的话会很繁琐，且容易出错。

```
npm run create <baseTabName> <baseAppId> <baseCard>
```

命令参数解析：

- `baseTabName` 指定为业务模块的哪个 tab 创建卡片，即 `<业务模块>_<tabIndex>` 
- `baseAppId` 指定基准 AppId，生成的卡片 id 会在此基础上加1，第一次创建卡片必须指定，后续可传 null，为空时会去匹配最大且不重复的 appId。
- `baseCard` 基于已存在的卡片创建新的卡片，可不传，即 `<业务模块>_<tabIndex>_<tabCardIndex>` 

例如，要创建新的卡片 `demo_tab2_1-33333334`，且基于已存在的卡片 `demo_tab1_1-33333333`

那么命令应该为：

```
npm run create demo_tab2 33333333 demo_tab1_1
```

### 打包 N 个卡片，N = 字符匹配数量

```
xmmp build <卡片名称> -r
```

会去匹配卡片名称包含 `卡片名称` 的所有卡片，卡片名称可以是：

- `<业务模块>`
- `<业务模块>_<tabIndex>`
- `<业务模块>_<tabIndex>_<tabCardIndex>`

### 配置文件 xmmprc-dev.js

通过高级方法创建的卡片会自动注入到配置文件中，我们可以快速的更新卡片：

```
# 全量更新
xmmp auto card update

# 更新单个
xmmp auto card update <appId>

# 更新多个
xmmp auto card update <卡片名称> -s
```

其中更新多个的参数"卡片名称"规则同上。

#### 代码规范

> tips: 如果项目不需要 eslint，编辑 vue.config.js，打开注释即可

```js
// chainWebpack: config => config.module.rules.delete('eslint')
```

另外，还需要注释掉 `build/create-card.js` 中末尾的 `lint` 操作。
