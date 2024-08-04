// utils/swrConfig.js

import { fetcher } from './fetcher';

const swrConfig = {
  fetcher: fetcher,
  onError: (error) => {
    console.error('Error fetching data:', error);
  },
  revalidateOnFocus: true, // Revalida los datos cuando la ventana vuelve a estar en foco
  revalidateOnReconnect: true, // Revalida los datos cuando se reconecta a la red
  refreshInterval: 30000, // Intervalo de refresco en milisegundos (30 segundos)
};

export default swrConfig;
