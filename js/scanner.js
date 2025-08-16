const codeReader = new ZXing.BrowserBarcodeReader();

function startScanner(callback) {
  codeReader.decodeFromVideoDevice(null, 'video', (result, err) => {
    if (result) {
      callback(result.text);
    }
  });
}
