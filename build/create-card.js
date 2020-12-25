const fs = require('fs-extra')
const path = require('path')
const { execSync } = require('child_process')
const getSrc = str => path.resolve(__dirname, '../src', str)
const [, , baseName, baseAppId, baseCard] = process.argv

if (!baseName) {
  console.log('请输入 baseName，例如 cc_investment_tab3')
  process.exit(0)
}
const collectionDir = getSrc('card-collection')
// 已存在的卡片 ID 列表
const appIds = []
// 匹配到的相关卡片 componentSymbol 列表
const relationNames = []
// 已存在的卡片列表
const collectionCardDirs = fs.readdirSync(collectionDir).map(dir => {
  const dirSplit = dir.split('-')
  if (dirSplit.length > 1) {
    appIds.push(dirSplit.pop())
  }
  if (dir.indexOf(baseName) > -1) {
    relationNames.push(dir)
  }
  return dir
})

// http://10.0.17.202:3000/project/93/interface/api/2457

/**
 * 生成 AppId
 * @param baseId 基准 ID
 * @param existsIds 已存在的 ID 列表
 * @returns {*}
 */
function getId (baseId, existsIds) {
  let num = 10
  while (existsIds.includes(String(baseId)) && num > 0) {
    baseId = Number(baseId) + 1
    // console.log('', num)
    num --
  }
  return baseId
}

// --------------------- 创建卡片 ---------------------

// 新的卡片 symbol
let newBaseName = ''
// 新的卡片 ID
let baseId = baseAppId
// 新的卡片名称
let newCardName = ''
const isAppIdValid = num => num && /^\d+$/.test(num)
if (relationNames.length > 0) {
  const max = Math.max.apply(null, relationNames.map(x => +x.split('-')[0].split('_').pop()))
  newBaseName = `${baseName}_${max + 1}`
  if (!isAppIdValid(baseId)) {
    const baseItem = relationNames.find(x => x.indexOf(`${baseName}_${max}`) > -1)
    baseId = getId(baseItem.split('-').pop(), appIds)
  }
} else {
  newBaseName = `${baseName}_1`
  if (!isAppIdValid(baseId)) {
    if (!appIds.length) {
      console.log('本地不存在任何卡片，请提供基准 appId')
      process.exit(0)
    }
    baseId = getId(Math.max.apply(null, appIds), appIds)
  }
}
newCardName = `${newBaseName}-${baseId}`
execSync(`xmmp card ${newCardName}`)
console.log(`创建卡片成功 ${newCardName}`)

// --------------------- 注入 xmmprc 配置 ---------------------

const baseNameArr = newBaseName.split('_')
// index
const newDataIndex = baseNameArr.pop()
// tabIndex
const newTabIndex = baseNameArr.pop()
const moduleName = baseNameArr.pop()
const rcFile = path.resolve(__dirname, '../', `rc.${moduleName}.js`)
const insert = `  {
    file: 'zip/${newCardName}.zip',
    name: '${newCardName}',
    appId: ${baseId},
    componentSymbol: '${newBaseName}'
  }`
if (fs.pathExistsSync(rcFile)) {
  let content = fs.readFileSync(rcFile, 'utf8')
  content = content.replace(/(\])/, ',\n' + insert + '\n$1')
  fs.outputFileSync(rcFile, content)
} else {
  fs.outputFileSync(rcFile, `module.exports = [
${insert}
]`)
  // 添加到 xmmprc-dev.js 中
  const devFile = path.resolve(__dirname, '../', `xmmprc-dev.js`)
  let content = fs.readFileSync(devFile, 'utf8')
  content = `const ${moduleName}Card = require('./rc.${moduleName}.js')\n${content}`
  content = content.replace(/(cardList: \[)/, `$1\n    ...${moduleName}Card,`)
  fs.outputFileSync(devFile, content)
}
console.log(`注入 xmmprc 配置 rc.${moduleName}.js 成功`)

// --------------------- 基于模版修改新创建的卡片 ---------------------

// 修改模版文件
if (baseCard) {
  const baseCardItem = collectionCardDirs.find(x => x.indexOf(baseCard) > -1)
  if (!baseCardItem) {
    console.log(`卡片不存在: ${baseCard}`)
    process.exit(0)
  }
  console.log(`基于卡片 ${baseCardItem} 生成模版`)
  const baseCardArrSplit = baseCardItem.split('-')
  const baseCardAppId = baseCardArrSplit.pop()
  const baseCardArr = baseCardArrSplit.pop().split('_')
  baseCardArr.pop()
  const tabIndex = baseCardArr.pop()
  const module = baseCardArr.pop()

  const baseCardFile = path.join(collectionDir, baseCardItem, 'card.vue')
  const newCardFile = path.join(collectionDir, newCardName, 'card.vue')
  let content = fs.readFileSync(baseCardFile, 'utf8')
  // 替换卡片名称
  content = content.replace(new RegExp(baseCardItem, 'g'), newCardName)
  // 替换 appId
  content = content.replace(new RegExp(baseCardAppId, 'g'), baseId)
  // 替换 mock 数据
  content = content.replace(`mock/${module}/${tabIndex}`, `mock/${moduleName}/${newTabIndex}`)
  let referPath = ''
  content = content.replace(new RegExp(`(mock[.a-zA-Z]*?\\[(\\d+)\\])`), (p, a, c) => {
    referPath = a
    return a.replace(c, newDataIndex - 1)
  })
  fs.outputFileSync(newCardFile, content)

  if (referPath) {
    // 检查 mock 数据
    const mockFile = getSrc(`mock/${moduleName}/${newTabIndex}.js`)
    const mock = eval(fs.readFileSync(getSrc(`mock/${module}/${tabIndex}.js`), 'utf8').replace('export default', 'module.exports ='))
    const mockData = eval(referPath)
    pushEsModule(mockFile, mockData)
  }
  console.log('模版修改成功！')
}

function pushEsModule (file, item) {
  let content
  if (fs.pathExistsSync(file)) {
    content = fs.readFileSync(file, 'utf8')
    content = content.replace('export default', 'module.exports =')
    const data = eval(content)
    data.push(item)
    content = 'export default ' + JSON.stringify(data, null, 2)
  } else {
    content = `export default [
  ${JSON.stringify(item, null, 2)}
]
`
  }
  fs.outputFileSync(file, content)
}

// --------------------- 格式化代码 ---------------------

// 如果不需要 eslint ，需要注释这段代码
console.log('npm run lint')
execSync('npm run lint')

// --------------------- 结束 ---------------------

console.log('操作完成')

