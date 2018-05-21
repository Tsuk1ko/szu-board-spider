/*
 * @Author: JindaiKirin 
 * @Date: 2018-05-21 17:31:30 
 * @Last Modified by: JindaiKirin
 * @Last Modified time: 2018-05-21 19:36:06
 */

const request = require('request');
const iconv = require('iconv-lite');

/**
 * 根据url获取网页内容
 * 
 * @param {string} url 网页地址
 * @returns html内容
 */
function get(url, code = "gb2312") {
	return new Promise((resolve, reject) => {
		request.get({
			url: url,
			encoding: null
		}, (err, response, body) => {
			resolve(iconv.decode(body, code));
		});
	});
}

exports.get = get;
