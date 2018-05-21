/*
 * @Author: JindaiKirin 
 * @Date: 2018-05-21 16:39:24 
 * @Last Modified by: JindaiKirin
 * @Last Modified time: 2018-05-21 23:31:42
 */

const fs = require('fs');
const GetReq = require("./getReq");
const Extractor = require("./extract");

var cnt = 0;

/**
 * 从目录爬取所有文章
 * 
 * @param {string} url 目录网址
 * @param {string} [filename=new Date().getTime() + ".txt"] 保存文件名
 * @param {function} classify 分类函数
 */
async function spide(url, filename = new Date().getTime() + ".txt", classify) {
	await GetReq.get(url).then(async chtml => {
		//取得文章超链接
		var hrefs = Extractor.catalog(chtml);

		//得到文章内容
		for (i in hrefs) {
			await GetReq.get("http://www1.szu.edu.cn/board/" + hrefs[i]).then(ahtml => {
				var article = Extractor.article(ahtml);
				writeToFile(article, filename, classify)
			});
		}
	});
}

/**
 * 将爬取到的文章写入文件
 * 
 * @param {object} article 文章
 * @param {string} filename 文件名
 * @param {function} classify 分类函数
 */
function writeToFile(article, filename, classify) {
	if (article.tittle == '' || article.body == '') return;
	var aClass = classify(article);
	fs.appendFileSync(filename, "#= " + aClass + "\n#@ " + (++cnt) + "\n#! " + article.tittle + "\n#% " + article.body + "\n\n");
}

exports.spide = spide;
