let gs1Prefixes = {};

function lookupCountry(code) {
  const prefix = code.substring(0, 3);
  return gs1Prefixes[prefix] || "Unknown / Not in list";
}

document.addEventListener("DOMContentLoaded", () => {
  // Load GS1 prefixes JSON before starting scanner
  fetch("data/gs1_prefixes.json")
    .then(res => res.json())
    .then(data => {
      gs1Prefixes = data;

      // Start scanner once data is loaded
      startScanner((barcode) => {
        const country = lookupCountry(barcode);

        document.getElementById('result').innerHTML = 
          `Barcode: <b>${barcode}</b><br>Country: <span class="country">${country}</span>`;
      });
    })
    .catch(err => {
      console.error("❌ Error loading GS1 prefixes:", err);
      document.getElementById('result').textContent = "Failed to load country data";
    });
});
