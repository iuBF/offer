Component({
  data: {
    keyword: ""
  },
  methods: {
    onInput(e) {
      this.setData({
        keyword: e.detail.value
      });
    },
    onSearch() {
      const keyword = this.data.keyword.trim();
      
      if (keyword === "") {
        // 如果用户未输入关键词就点击了搜索，则直接返回
        wx.showModal({
          title: '提示',
          content: '',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定')}
               else {//这里是点击了取消以后
                console.log('用户点击取消')
              }
            }
          })
        return;
      }
      // 处理搜索操作
      wx.showModal({
        title: '提示',
        content: '这是一个模态弹窗',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')}
             else {//这里是点击了取消以后
              console.log('用户点击取消')
            }
          }
        })
      wx.cloud.callFunction("search", keyword)({
        name: "search",
        data: {
          keyword: keyword
        }
      })
      
    }
  }
});