/** Handles camera integration and actions for Wine Glass client
 * (c) Kyle Benson 2014
 */

var handleImage = function(path) {
  var img=document.createElement("img");
  img.setAttribute('src', path);
  img.setAttribute('height', '100px');
  img.setAttribute('width', '100px');
  document.body.appendChild(img);
}

// camera callbacks
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

