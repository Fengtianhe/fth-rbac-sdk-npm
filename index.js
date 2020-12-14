/**
 *
 * @param method
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 */
function fr(method, url, params) {
  checkDomain();
  checkAppId();
  return new Promise((resolve, reject) => {
    url = FthRbacClient.serverDomain + url;
    params['appId'] = FthRbacClient.appId;
    params['client'] = 'npm';

    if (method === 'GET' || method === 'DELETE') {
      url = `${url}?${parseParam(params).substring(1)}`;
    }

    fetch(url, {
      method: method,
      body: method === 'POST' || method === 'PUT' ? JSON.stringify(params) : null
    }).then(function (response) {
      return response.text();
    }).then(function (responseText) {
      const resp = JSON.parse(responseText);
      if (resp.code !== 200) {
        console.error(`Fth RBAC Client Error: ${resp.message}`);
      }
      resolve(resp);
    }).catch(e => {
      reject(e);
    });
  });
}

/**
 * 检查是否配置FthRbacServer的服务地址
 */
function checkDomain() {
  if (!FthRbacClient.serverDomain) {
    throw new Error('请检查是否配置FthRbacServer的服务地址，如未设置，请使用FthRbacClient.serverDomain设置');
  }
}

/**
 * 检查是否配置FthRbacServer的AppId
 */
function checkAppId() {
  if (!FthRbacClient.appId) {
    throw new Error('请检查是否配置FthRbacServer的AppId，如未设置，请使用FthRbacClient.appId设置');
  }
}

/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 *
 * return URL参数字符串
 */
function parseParam(param, key, encode) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += parseParam(param[i], k, encode);
    }
  }
  return paramStr;
}


const FthRbacClient = {
  serverDomain: null,

  appId: null,
  /**
   * 获取目录
   * @param roleId 角色ID，多角色可用 ，分隔
   * @returns {Promise<unknown>}
   */
  menu: function (roleId) {
    console.log('FTH RBAC 请求目录数据 ROLEID：', roleId);
    const url = `/sdk/resource/menu`;
    return fr('GET', url, { roleId });
  },

  btn: function (roleId, pageUrl) {
    console.log('FTH RBAC 请求页面按钮资源 ROLEID：', roleId, 'PAGE: ', pageUrl);
    const url = `/sdk/resource/btn`;
    return fr('GET', url, { roleId, pageUrl });
  }
};

export default FthRbacClient;
