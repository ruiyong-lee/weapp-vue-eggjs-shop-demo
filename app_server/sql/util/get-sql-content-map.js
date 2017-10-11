const fs = require('fs') // 内置的文件系统模块，负责读写文件
const getFileMap = require('./get-file-map')

/**
 * 读取某个sql文件内容
 * @param String fileName 文件名称
 * @param String path 文件路径
 * @return String sql文件内容
 */
const getSqlContent = (path) => {
  return fs.readFileSync(path, 'binary')
}

/**
 * 获取scripts目录下的文件路径Map
 * @return Object Map
 */
const getSqlMap = () => {
  let path = __dirname.replace(/\\/g, '/') // __dirname获取的路径是反斜杠，替换成正斜杠
  let index = path.lastIndexOf('/')
  path = path.substring(0, index) + '/scripts/' // 获取上级目录下的scripts目录路径

  return getFileMap(path, 'sql')
}

/**
 * 封装所有sql文件内容
 * @return Object sqlContentMap
 */
const getSqlContentMap = () => {
  let sqlContentMap = {}
  let sqlMap = getSqlMap()

  for (let key in sqlMap) {
    sqlContentMap[key] = getSqlContent(sqlMap[key])
  }

  return sqlContentMap
}

module.exports = getSqlContentMap
