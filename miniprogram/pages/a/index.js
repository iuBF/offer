// pages/index/index.js
Page({
  data: {
    tabs: [],
    activeIndex: 0,
    list: [],
    searchResultList: [], // 搜索结果列表
    keyword: "", // 搜索关键词
  },

  async onLoad() {
    await this.getTabs();
    await this.getList();
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index
    });
    this.getList();
  },

  async getTabs() {
    const db = wx.cloud.database();
    const _ = db.command;
    const res = await db.collection('data').where({
      type: _.eq('tab')
    }).get();
    const tabs = res.data.map(item => item.data.name);
    this.setData({
      tabs
    });
  },

  async getList() {
    const db = wx.cloud.database();
    const _ = db.command;
    const res = await db.collection('data').where({
      school: _.eq('石河子大学')
    }).get();
    this.setData({
      list: res.data.map(item => item.data)
    });
    console.log("list: ", list);
  },

  onInput(e) {
    this.setData({
      keyword: e.detail.value
    });
  },

  async onSearch() {
    const keyword = this.data.keyword.trim();
    if (!keyword) {
      wx.showToast({
        title: '请输入关键词',
        icon: 'none'
      });
      return;
    }

    try {
      const { result } = await wx.cloud.callFunction({
        name: "search",
        data: {
          keyword: keyword,
        }
      });

      // 判断搜索结果是否为空
      const result1 = result.data || [];
      console.log("result1: ", result1);
      const list = result1.map((item) => {
        const transformedItem = {
          id: item._id,
          data: {
            title: item.data.title,
            time: item.data.time,
            views: item.data.views
          }
        };
        transformedItem.title = item.data.title; // 新增代码
        transformedItem.time = item.data.time;
        transformedItem.views = item.data.views;
        return transformedItem;
      });
      
      this.setData({
        list
      });
      console.log("search result: ", list);
    } catch (error) {
      console.log(error);

      wx.showToast({
        title: '搜索失败，请稍后再试',
        icon: 'none'
      });
    }
  }
});

