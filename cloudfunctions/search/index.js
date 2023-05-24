// 云函数searchData的代码
const cloud = require("wx-server-sdk");

cloud.init();

exports.main = async (event, context) => {
  const db = cloud.database();
  const keyword = event.keyword.trim();
  try {
    const result = await db.collection("data")
    .where(db.command.or(
      {
    'data.title':db.RegExp({
      regexp: '.*' + keyword,
      options: 'i'
    })
  },
  {
    school:keyword
  }
  ))
      .get();
    return result;
  } catch (error) {
    return error;
  }
};