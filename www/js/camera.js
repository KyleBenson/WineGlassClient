/** Handles camera integration and actions for Wine Glass client
 * (c) Kyle Benson 2014
 */
WineImages = Lawnchair({'name' : 'wineImages', 'record' : 'wineImage', 'adapter' : 'dom'}, function(){});

// record metadata about images and display them
var handleImage = function(path) {

  // add image to document
  var img=document.createElement("img");
  img.setAttribute('src', path);
  img.setAttribute('class', 'thumb');
  document.body.appendChild(img);

  // record image in database for future upload
  var wineImage = {'file' : path};
  WineImages.save(wineImage, 'alert(wineImage)');
  console.log(wineImage.key + 'saved');
};

// camera callbacks on each captured image
var captureSuccess = function(mediaFiles) {
  var i, path, len;
  for (i = 0, len = mediaFiles.length; i < len; i += 1) {
    path = mediaFiles[i].fullPath;
    handleImage(path);
  }
};

var captureError = function(error) {
  alert('Error code: ' + error.code, null, 'Capture Error');
};

takePicture = function() {
  navigator.device.capture.captureImage(captureSuccess, captureError, {limit : 20});
};

uploadPictures = function() {
  //WineImages.each('alert(obj + " idx: " + index)');
  WineImages.keys('keys.forEach(console.log.bind(console))');
  WineImages.each(function(wineImage, idx) {
    console.log(wineImage.file);
    alert(wineImage.file);
    //TODO: upload image
    WineImages.remove(wineImage.key);
  });
  console.log("Pictures NOT uploaded");
};

function inputHandlePictures(evt) {
    var files = evt.target.files; // FileList object

    for (var i = 0, f; f = files[i]; i++) {
      //alert("pic!");
      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          handleImage(e.target.result);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
}
