const keyword = require('../data/keywords.js')

const checkMessage = async (req, res, next) => {
  const msg = req.body.msg;
  const dataArray = await proccessData(msg)
  //convertArray(msg)

  res.json(dataArray)
}

const convertArray = async (msj) => {
  const chain = String(msj).split(',')
  console.log(chain)
  return chain;
}

const proccessData = async (msj) => {

  let dataMsgObj = {
    message: msj,
    question: [],
    answare: [],
    keyword: [],
    comments: []
  }

  for (faq of keyword) {
    for (let i = 0; i <= faq.keywords.length; i++) {

      if (msj.includes(faq.keywords[i])) {
        dataMsgObj.keyword.push(faq.keywords[i])
        dataMsgObj.answare.push(faq.answare)
        dataMsgObj.comments.push(faq.comments)
        dataMsgObj.question.push(faq.question)
      }

    }

  }

  
  deleteDuplicatesfromMessage(dataMsgObj.answare);
  return dataMsgObj
}

const deleteDuplicatesfromMessage = (object)=>{
  const answare = object.answare;

  const question = object.filter((item,index)=>{
    return object.indexOf(item) === index;
  })

  console.log(question)
  return question
}

module.exports = checkMessage;