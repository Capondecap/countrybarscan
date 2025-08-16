const codeReader = new ZXing.BrowserBarcodeReader();

function startScanner(callback) {
  // Request back camera
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      const video = document.getElementById('video');
      video.srcObject = stream;

      codeReader.decodeFromVideoDevice(null, video, (result, err) => {
        if (result) {
          callback(result.text);
        }
      });
    })
    .catch((err) => {
      console.error("❌ Camera access denied or unavailable:", err);
      document.getElementById('result').textContent = "Camera access is required to scan barcodes.";
    });
}
