/*
 * @Author: JindaiKirin 
 * @Date: 2018-05-21 17:37:44 
 * @Last Modified by: JindaiKirin
 * @Last Modified time: 2018-05-21 23:08:28
 */

const cheerio = require('cheerio');

/**
 * 提取目录中所有文章的超链接
 * 
 * @param {string} html 目录html
 * @returns 超链接数组
 */
function extractCatalog(html) {
	var $ = cheerio.load(html, {
		decodeEntities: false
	});
	var _main = $($('tbody tbody tbody tbody')[2]).find('tr:not(.tbcolor13) > td:nth-child(4) a');

	var hrefs = Array();
	for (var i = 0; i < _main.length; i++) {
		hrefs.push($(_main[i]).attr('href'))
	}
	return hrefs;
}

/**
 * 提取公文通文章标题和正文
 * 
 * @param {string} html 公文通文章html
 * @returns tittle和body
 */
function extractArticle(html) {
	//去除杂项
	var $ = cheerio.load(html.replace(/<!--[^]*?-->/g, '').replace(/<\?xml:namespace[^]*?\/>/g, '').replace(/<o:p>[^]*?<\/o:p>/g, ''), {
		decodeEntities: false
	});
	$('a[name="_GoBack"]').remove();
	var _main = $('tbody tbody tbody tbody');

	//标题
	var tittle = filtrateSpace($(_main.find('b font')[0]).html().replace(/<[^]*?>/g, ''));

	//正文
	var body = '';
	var _p = _main.find('p');
	for (var i = 0; i < _p.length; i++) {
		if (i != 0) body += ' ';
		body += extractP($(_p[i]).html());
	}
	body = filtrateSpace(body.replace(/( | |　)+/g, ' '));

	return ({
		tittle,
		body
	});
}

/**
 * 去除字符串前后空格（半角和全角）
 * 
 * @param {string} str 字符串
 * @returns 处理后的字符串
 */
function filtrateSpace(str) {
	//空格和全角空格
	return str.replace(/^( | |　)*/g, '').replace(/( | |　)*$/g, '');
}

/**
 * 从<p>中提取内容
 * 
 * @param {string} html p的html
 * @returns 提取内容
 */
function extractP(html) {
	return html.replace(/<[^]*?>/g, '').replace(/\n/g, '');
}

exports.article = extractArticle;
exports.catalog = extractCatalog;
