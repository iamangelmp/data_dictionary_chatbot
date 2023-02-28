const keyword = require("../data/keywords.js");

const checkMessage = async (req, res, next) => {
  const msg = req.body.msg;
  const dataArray = await proccessData(msg);

  res.json(dataArray);
};

//covierte cadenas a arreglos
const convertArray = async (msj) => {
  const chain = String(msj).split(",");
  console.log(chain);
  return chain;
};

//El objeto que retorna la petición
const proccessData = async (msj) => {
  let dataMsgObj = {
    message: msj,
    question: [],
    answare: [],
    keyword: [],
    comments: [],
  };

  for (faq of keyword) {
    for (let i = 0; i <= faq.keywords.length; i++) {
      if (msj.includes(faq.keywords[i])) {
        dataMsgObj.keyword.push(faq.keywords[i]);
        dataMsgObj.answare.push(faq.answare);
        dataMsgObj.comments.push(faq.comments);
        dataMsgObj.question.push(faq.question);
      }
    }
  }

  //elimina respuestas, preguntas y comentarios duplicados
  dataMsgObj.question = deleteDuplicates([...dataMsgObj.question]);
  dataMsgObj.answare = deleteDuplicates([...dataMsgObj.answare]);
  dataMsgObj.comments = deleteDuplicates([...dataMsgObj.comments]);

  return dataMsgObj;
};


const deleteDuplicates = (array_duplied) => {
  return array_duplied.filter((item, index) => {
    return array_duplied.indexOf(item) === index;
  });
};

module.exports = checkMessage;