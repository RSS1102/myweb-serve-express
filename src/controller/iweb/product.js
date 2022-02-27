module.exports = {
    getGithubList(req, res) {
        let options = {
                method: 'GET',
                port: 443, //https的默认port：443
                hostname: 'api.github.com', //这里不需要用https：//
                path: '/users/RSS1102/repos',
                headers: {
                    'User-Agent': 'RSS1102'
                } //用来验证用户见：https://blog.csdn.net/zhuming3834/article/details/77649960
            }
            // 这里不能用request,用get
        https.get(options, _res => {
            let body = '';
            _res.on('data', data => body += data);
            _res.on('end', () => {
                console.log(body)
            })
            _res.on('error', err => {
                console.log("err", err)
            })

        })

    }
}