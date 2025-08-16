let gs1Prefixes = {};

// Map GS1 country names to Flagpedia ISO 3166-1 alpha-2 codes
const countryMap = {
  "United States": "us",
  "FranceandMonaco": "fr",
  "Cambodia": "kh",
  "Japan": "jp",
  "Germany(440 code inherited from formerEast Germanyupon reunification in 1990)": "de",
  "China": "cn",
  "Thailand": "th",
  "Vietnam": "vn",
  "South Korea": "kr",
  "India[4]": "in",
  "United Kingdom": "gb",
  // Add more mappings as needed for your GS1 JSON
};

function lookupCountry(code) {
  const prefix = parseInt(code.substring(0, 3), 10);

  // Find the country from GS1 JSON
  let country = "Unknown / Not in list";
  for (const entry of gs1Prefixes) {
    if (entry.prefix.includes("–")) {
      const [start, end] = entry.prefix.replace('–','-').split('-').map(s => parseInt(s,10));
      if (prefix >= start && prefix <= end) country = entry.country;
    } else {
      if (prefix === parseInt(entry.prefix, 10)) country = entry.country;
    }
  }

  // Build flag URL if mapping exists
  const flagUrl = countryMap[country] 
    ? `https://flagcdn.com/w80/${countryMap[country]}.png`
    : "";

  return { country, flagUrl };
}

document.addEventListener("DOMContentLoaded", () => {
  // Load GS1 JSON
  fetch("data/gs1_prefixes.json")
    .then(res => res.json())
    .then(data => {
      gs1Prefixes = data;

      // Start scanner after JSON loads
      startScanner((barcode) => {
        const { country, flagUrl } = lookupCountry(barcode);

        // Update result text
        document.getElementById('result').innerHTML = 
          `Barcode: <b>${barcode}</b><br>Country: <span class="country">${country}</span>`;

        // Update flag
        const flagEl = document.getElementById('flag');
        if (flagUrl) {
          flagEl.src = flagUrl;
          flagEl.style.display = "block";
        } else {
          flagEl.style.display = "none";
        }
      });
    })
    .catch(err => {
      console.error("❌ Error loading GS1 prefixes:", err);
      document.getElementById('result').textContent = "Failed to load country data";
    });
});
