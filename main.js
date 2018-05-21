/*
 * @Author: JindaiKirin 
 * @Date: 2018-05-21 18:04:15 
 * @Last Modified by: JindaiKirin
 * @Last Modified time: 2018-05-21 23:30:57
 */

const Spider = require("./spider/main");

Spider.spide("http://www1.szu.edu.cn/board/?infotype=%D1%A7%CA%F5", "example_result.txt", article => {
	if (article.tittle.indexOf("讲座") >= 0) return "0";
	return "1";
});
