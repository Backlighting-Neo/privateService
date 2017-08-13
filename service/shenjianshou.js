const crypto = require('crypto');
const fetch = require('../utils/fetch');

const config = require('../config/shenjianshou');

class ShenJianShou {
	constructor() {
	  this.userKey = config.userKey;
		this.userSecret = config.userSecret;
	}

	getSign() {
		let _timestamp = parseInt(Date.now()/1000);
		return({
			user_key: this.userKey,
			timestamp: _timestamp,
			sign: crypto.createHash('md5').update(`${this.userKey}${_timestamp}${this.userSecret}`).digest('hex')
		});
	}

	activeCrawler(crawler_id) {
		let params = Object.assign({}, this.getSign(), {
			crawler_id
		});
		params = Object.keys(params).map(key=>`${key}=${params[key]}`).join('&');
		return fetch('http://www.shenjianshou.cn/rest/crawler/start?'+params)
	}
}

module.exports = new ShenJianShou();