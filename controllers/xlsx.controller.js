const dictionary = require("../models/nosql/dictionary.model.js");
const XLSX = require("xlsx");
const {
  convertArray,
  cleanString,
} = require("../controllers/dictionary.controller.js");

const createDictionary = async (req, res, next) => {
  const file = req.files.file;

  var workbook = XLSX.read(file.data);
  var wsnames = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[wsnames];

  var jsa = await parseData(XLSX.utils.sheet_to_json(worksheet));

  await dictionary.insertMany(jsa);

  return res.json(jsa);
};

const parseData = async (objects_array) => {
  let objects_parsed = [];
  objects_array.forEach((element) => {
    const {
      ID,
      Pregunta,
      Respuesta,
      Keywrod,
      "Comentarios Seguros el Roble": comments,
    } = element;
    let parsed_array = {
      ID: ID,
      question: Pregunta,
      answare: cleanString(Respuesta),
      keywords: convertArray(Keywrod),
      comments: comments,
    };
    objects_parsed.push(parsed_array);
  });

  return objects_parsed;
};

module.exports = { createDictionary };
