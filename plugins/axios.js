export default function ({ $axios, error: nuxtError }) {
  $axios.onRequest(config => {
    config.headers['Content-Type'] = 'application/json';
  });

  $axios.onError(error => {
    nuxtError({
      statusCode: (error.response && error.response.status) || 500,
      message: error.message || 'Server error',
    });
  });
}