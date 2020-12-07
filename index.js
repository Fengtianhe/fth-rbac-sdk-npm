import './xhr';

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
      new MyXhr({
        'options': {
          'method': 'get',
          'url': `${this.FthRbacServerDomain}/sdk/resource/menu?roleId=${roleId}`
        },
        'success': function (data) {
          console.log(data);
          resolve(data);
        },
        'error': function (error) {
          reject(error);
        }
      });
    });
  }
};

export default FthRbacClient;
