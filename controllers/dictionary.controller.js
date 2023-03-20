const dictionary = require("../models/nosql/dictionary.model.js");

const checkMessage = async (req, res, next) => {
  const msg = req.body.msg.trim(); //elimina espacios al inicio y fin
  const dataArray = await proccessData(msg);

  // si la answare de dataArray es un mensaje de error, regresar un objeto JSON con estatus 500
  if (typeof dataArray.answare == "string") {
    return res.status(500).json({ error: dataArray });
  }

  res.json(dataArray);
};

//covierte cadenas a arreglos
const convertArray = (msj) => {
  const dataParsed = [];
  for (let chain of String(msj).split(",")) {
    dataParsed.push(cleanString(chain));
  }
  return dataParsed;
};

const cleanString = (word) => {
  return word.trim();
};

//El objeto que retorna la petición
const proccessData = async (msj) => {
  try {
    const keyword = await dictionary.find({});
    let dataMsgObj = { question: [], answare: [], comments: [] };

    for (faq of keyword) {
      const { question, answare, keywords, comments } = faq;

      //itera sobre cada arreglo de palabras
      for (word of keywords) {
        if (msj.includes(word)) {
          dataMsgObj.answare.push(answare);
          dataMsgObj.comments.push(comments);
          dataMsgObj.question.push(question);
        }
      }
    }

    return processAnsware(dataMsgObj);
  } catch (error) {
    return processAnsware({ error: error });
  }
};

const processAnsware = (dataObj) => {
  let msg = `No he podido entender tu requerimiento ☹️.En unos momentos uno de nuestros asesores te va a apoyar con tu requerimiento`;

  //elimina respuestas, preguntas y comentarios duplicados
  dataObj.question = deleteDuplicates([...dataObj.question]);
  dataObj.comments = deleteDuplicates([...dataObj.comments]);

  dataObj.answare.length == 0
    ? (dataObj.answare = msg)
    : (dataObj.answare = deleteDuplicates([...dataObj.answare]));

  return dataObj;
};

const deleteDuplicates = (array_duplied) => {
  return array_duplied.filter((item, index) => {
    return array_duplied.indexOf(item) === index;
  });
};

module.exports = { checkMessage, convertArray, cleanString };
