function getFilePath(file) {

  if (!file || !file.path) {    
    return null;
  }

  const filePath = file.path;
  //const fileSplit = filePath.split(`\\`);
  const fileSplit = filePath.split(`/`);
 
  return `${fileSplit[1]}/${fileSplit[2]}`;
}

module.exports = {
  getFilePath,
};
