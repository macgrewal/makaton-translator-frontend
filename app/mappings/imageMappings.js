function ImageMappings() {
  this.categories = ["Activities","Feelings","Food","Routine","Misc"];
  var contentsMap = {};
  contentsMap["Activities"] = ["Aeroplane","Ball","Bicycle"];
  contentsMap["Feelings"] = ["Angry","Cold","Frightened"];

  this.contentsMap = contentsMap;
}

module.exports = ImageMappings;
