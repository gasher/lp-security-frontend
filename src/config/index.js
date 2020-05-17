export default {
  api: {
    // baseURL: 'https://blooming-forest-52131.herokuapp.com/',
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/',
    timeout: 25000,
    headers: {
      common: {
        'Content-Type': 'application/json',
      },
    },
  },
  googleMapsApiKey: 'AIzaSyDOdAILlldFqsxbM0YEwgoc-855gvo4RAI',
};
