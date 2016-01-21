var savePixels = require("save-pixels");
var getPixels = require("get-pixels");
var path = require('path');
var fs = require('fs');

var FineArt = module.exports = function(opts) {
  this.getFrom = opts.getFrom;
  this.imgType = 'jpg';
}

FineArt.prototype.getImg = function(imgId) {
  if(this.getFrom === undefined) {
    throw new Error('getImg requires FineArt has getFrom defined');
  }
  var imgPath = this.getImgPath(imgId);
  return new Promise(function(resolve, reject) {
    getPixels(imgPath, function(err, pixels) {
      if(err) {
        reject(err);
      }
      else{
        accept(pixels);
      }
    });
  });
};

FineArt.prototype.getImgPath = function(imgId){
  return path.join(this.getFrom, imgId+"."+this.imgType);
}

FineArt.prototype.saveImg = function(pixels, imgId){
  var imgPath = this.saveImgPath(imgId);
  savePixels(pixels, "jpg").pipe(fs.createWriteStream(imgPath));
  return new Promise(function(resolve){
    setTimeout(resolve, 200);
  });
}

FineArt.prototype.saveImgPath = function(imgId){
  if(this.saveTo === undefined) {
    throw new Error('getImg requires FineArt has saveTo defined');
  }
  return path.join(this.saveTo, imgId+"."+this.imgType);
}
