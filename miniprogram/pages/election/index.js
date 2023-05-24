
Page({
  currentPage: 1,
  data: {
    carousel: [],
  },
  onLoad(){
    this.getCarousel();
  },
  getCarousel(){
    const db = wx.cloud.database()
    db.collection('carousel').get().then(res =>{
      this.setData({
        carousel:res.data
      })
    })
  }
});
