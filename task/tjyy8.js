const shenjianshou = require('../service/shenjianshou');

(async function activeCrawler() {
  console.log(await shenjianshou.activeCrawler(30241));
})();