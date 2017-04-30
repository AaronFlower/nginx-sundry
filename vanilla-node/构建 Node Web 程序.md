## 构建 Node Web 程序 

### 一个完整的 `url ` 解析

```node
> require('url').parse('http://tui.qq.com:8081/aui/user/1?key=eason#ch01')
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'tui.qq.com:8081',
  port: '8081',
  hostname: 'tui.qq.com',
  hash: '#ch01',
  search: '?key=eason',
  query: 'key=eason',
  pathname: '/aui/user/1',
  path: '/aui/user/1?key=eason',
  href: 'http://tui.qq.com:8081/aui/user/1?key=eason#ch01' }
```

对于解析结果，我们应该对 host 与 hostname ， search 与 query ， path 与 pathname 的区别有一个认识。

