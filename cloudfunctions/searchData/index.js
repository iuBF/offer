// 云函数searchData的代码
const cloud = require("wx-server-sdk");

cloud.init();

exports.main = async (event, context) => {
  const db = cloud.database();
  const keyword = event.keyword.trim();
  try {
    const result = await db.collection("your_collection_name")
      .where({
          school: keyword,
      })
      .field({
        title: true,
        description: true,
        // 其他需要的字段
      })
      .get();
    return result;
  } catch (error) {
    return error;
  }
};