const db = require('./util/db')
const WeChatShopDb = db.WeChatShop
const getSqlContentMap = require('./util/get-sql-content-map')

// 打印脚本执行日志
const sqlEnventLog = (error, sqlFile, index) => {
  if (error) {
    console.log(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本执行失败！`)
  } else {
    console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本执行成功!`)
  }
}

// 获取所有sql脚本内容
let sqlContentMap = getSqlContentMap()

// 执行所有sql脚本
const createTables = async () => {
  for (let key in sqlContentMap) {
    let sqlShellList = sqlContentMap[key].split(';')

    for (let [i, shell] of sqlShellList.entries()) {
      if (shell.trim()) {
        await WeChatShopDb.query(shell).then(() => {
          sqlEnventLog(null, key, i)
        }, () => {
          sqlEnventLog(true, key, i)
        })
      }
    }
  }
  console.log('sql脚本执行结束，请按 ctrl + c 退出！')
}

// 执行
createTables()
