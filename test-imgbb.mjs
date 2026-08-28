async function testImgBB() {
  const apiKey = '0ed0f92a74597fa27d5cb3c4cb499f26';
  // Use a tiny 1x1 base64 pixel
  const base64Image = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  
  const formData = new URLSearchParams();
  formData.append('image', base64Image);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

testImgBB();
