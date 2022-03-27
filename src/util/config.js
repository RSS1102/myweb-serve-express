  const a = 'ghp_'
  const b = 'Gx4dVRJ6jOaQCFdhShY4ls0HFHf0Kd477W1p'
  const Authorization = a + b

  // sql数据库地址
  const webtest = {
      sqlAddress: '101.34.251.59',
      db: 'webtest',
      user: 'webtest',
      pass: 'webtest',
  }
  const sqlweb = {
      sqlAddress: '101.34.251.59',
      db: 'jimmy',
      user: 'jimmy',
      pass: 'RSS13470936725',
  }

  const sql = {
      sqlAddress: 'localhost',
      db: 'web',
      user: 'root',
      pass: 'root',
  }
  let sqlAddress = webtest
  module.exports = {
      Authorization,
      sqlAddress
  }