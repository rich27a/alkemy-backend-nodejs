const { response } = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  extensionesValidas = [".png", ".jpg", ".jpeg"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    //const nombreCortado = archivo.name.split('.');
    const extension = path.extname(archivo.name).toLocaleLowerCase();
    //const extension = nombreCortado[nombreCortado.length - 1];

    //validar extension
    //const extensionesValidas = ['.png','.jpg','.jpeg','.gif'];
    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extension ${extension} no es permitida - ${extensionesValidas}`
      );
    }

    const nombreTemp = uuidv4() + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(nombreTemp);
    });
  });
};

module.exports = {
  uploadFile,
};
