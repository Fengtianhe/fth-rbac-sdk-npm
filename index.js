const FthRbacClient = {
  serverDomain: null,

  appId: null,
  /**
   * 检查是否配置FthRbacServer的服务地址
   */
  checkDomain: function () {
    if (!this.serverDomain) {
      throw new Error('请检查是否配置FthRbacServer的服务地址，如未设置，请使用FthRbacClient.serverDomain设置');
    }
  },
  /**
   * 检查是否配置FthRbacServer的AppId
   */
  checkAppId: function () {
    if (!this.appId) {
      throw new Error('请检查是否配置FthRbacServer的AppId，如未设置，请使用FthRbacClient.appId设置');
    }
  },
  /**
   *
   * @param roleId 角色ID，多角色可用 ，分隔
   */
  menu: function (roleId) {
    this.checkDomain();
    this.checkAppId();
    return new Promise((resolve, reject) => {
      const url = `${this.serverDomain}/sdk/resource/menu?roleId=${roleId}&client=npm`;
      fetch(url, {
        method: 'GET',
        credentials: 'include'
      }).then(function (response) {
        return response.text();
      }).then(function (responseText) {
        resolve(responseText);
      }).catch(e => {
        reject(e);
      });
    });
  }
};

export default FthRbacClient;
