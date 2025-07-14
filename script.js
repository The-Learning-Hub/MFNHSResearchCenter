document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const file = form.pdf.files[0];

  if (!file || file.type !== 'application/pdf') {
    alert('Only PDF files are allowed.');
    return;
  }

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64 = reader.result.split(',')[1];

    const payload = new URLSearchParams();
    payload.append('title', form.title.value);
    payload.append('abstract', form.abstract.value);
    payload.append('keywords', form.keywords.value);
    payload.append('area', form.area.value);
    payload.append('message', form.message.value || '');
    payload.append('authors', form.authors.value);
	payload.append('authors', form.emailadd.value);
    payload.append('country', form.country.value);
    payload.append('address', form.address.value);
    payload.append('fileName', file.name);
    payload.append('fileData', base64);

    const response = await fetch('https://script.google.com/macros/s/AKfycbw_4ZuKb0AzPrMm72uI_a2vxdbV46GR9x6LB0505nVxyimBcP67F8qrktVv9V2rpoMx/exec', {
      method: 'POST',
      body: payload
    });
	
	// ✅ Hide popup
     document.getElementById("uploadPopup").style.display = "none";
	
    const result = await response.text();
    alert(result);
    form.reset();
  };

  reader.readAsDataURL(file);
});
