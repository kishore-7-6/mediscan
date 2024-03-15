const predictPlant = async (imageUrl, model) => {
  try {
    try {
      // 1. Fetch image data from blob URL
      const resp = await fetch(imageUrl);
      const blob = await resp.blob();

      // 2. Send image data to Flask backend using FormData
      const formData = new FormData();
      formData.append('image', blob);
      formData.append('model', model);

      const response = await fetch('https://1b9b-2409-408c-279a-d07f-7856-fa28-c34c-464b.ngrok-free.app/', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log("Prediction from server:", result);

      return result.prediction;
    } catch (error) {
      console.error('Error sending image to server:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error loading image from Blob URL:', error);
    throw error;
  }
};

export { predictPlant };
