# fth-rbac-sdk-npm
FTH-RBAC 客户端 npm 版

***
#### 使用
```javascript
import FthRbacClient from 'fth-rbac-client';

// http://xxx.xxx.xxx
FthRbacClient.serverDomain = '填入FthRbac搭建服务的地址';
FthRbacClient.appId = '应用ID';


FthRbacClient.menu(roleId).then(resp => {}).catch(e => {});
FthRbacClient.btn(roleId, pageUrl).then(resp => {}).catch(e => {});
```
### 错误码
| code | message | 解决方案 |
| --- | --- | --- |
| 901 | 未知APPID | 通过FthRbacClient.appId设置 |
| 902 | 未知应用 | 请检查 appId 和系统中录入的是否一致 |
| 903 | 未配置应用域 | 请检查系统中录入的domain |
| 904 | 错误的请求域 | 请检查系统中录入的domain 和 请求的Host是否一致 |
