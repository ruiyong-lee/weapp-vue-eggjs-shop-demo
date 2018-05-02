const fs = require('fs') // 内置的文件系统模块，负责读写文件

/**
 * 遍历某个目录下指定后缀的文件
 * @param String dir 目录路径
 * @param String extension 文件后缀名
 * @return Object 遍历后的结果
 */

const getFlieMap = (dir, extension) => {
  let filesMap = {}
  let files = fs.readdirSync(dir) // 获取path目录下所有文件名称的数组

  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    let arr = file.split('.')
    let len = arr.length
    let itemExtension = len > 1 ? arr[len - 1] : ''

    if (itemExtension === extension) {
      filesMap[file] = dir + file
    }
  }

  return filesMap
}

module.exports = getFlieMap
