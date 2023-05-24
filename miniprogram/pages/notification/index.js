Page({
  data: {
    tabs: [],
    activeIndex: 0,
    list: []
  },
  
  onLoad() {
    this.getTabs();
    this.getList();
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index
    });
    this.getList();
  },

  getTabs() {
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('data').where({
      type: _.eq('tab')
    }).get().then(res => {
      const tabs = res.data.map(item => item.data.name);
      this.setData({
        tabs
      });
      this.getList();
    });
  },

  getList() {
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('data').where({
      type: _.eq('item'),
      tab: _.eq(this.data.tabs[this.data.activeIndex])
    }).get().then(res => {
      this.setData({
        list: res.data.map(item => item.data)
      });
    });
  }
});