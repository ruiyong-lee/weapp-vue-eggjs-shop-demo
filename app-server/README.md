# app-server

app server

## 快速入门

如需进一步了解，参见 [egg 文档][egg]。

##### 开发环境、工具

- **node.js：** v8.11.0 （>= v8.0.0）

- **mysql：** v5.5.51

- **redis：** v3.2.0  需要打开配置：notify-keyspace-events Ex

- **redis配置：** notify-keyspace-events Ex

- **westorm：** 2018.1

- **Webstorm配置：** File - Settings - Languages & Frameworks - Node.js and NPM 里面的Node.js Core library 设置成 enabled ，这样就会有代码提示



### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org
