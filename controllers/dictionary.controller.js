const keyword = require('../data/keywords.js')

const checkMessage = async (req, res, next) => {
  const msg = req.body.msg;
  const dataArray = await proccessData(msg)
  //convertArray(msg)
  const msjObj = {
    msg,
    question: [],
    answare: [],
    keyword: dataArray,
    comments: []
  }
  res.json(msjObj)
}

const convertArray = async (msj) => {
  const chain = String(msj).split(',')
  console.log(chain)
  return chain;
}

const proccessData = async (msj) => {
  let keys = []

  for (faq of keyword) {
    for (let i = 0; i <= faq.keywords.length; i++) {
      
      if (msj.includes(faq.keywords[i])) {
        keys.push(faq.keywords[i])
      }

    }

  }


  return keys;
}

module.exports = checkMessage;