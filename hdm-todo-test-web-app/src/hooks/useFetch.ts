export default function useFetch() {
  const callApi = async (method: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH', route: string, data?: Record<string, any>) => {
    try {
      const myHeaders = new Headers();

      myHeaders.set('Accept', 'application/json');
      myHeaders.set('Content-Type', 'application/json');

      const requestOptions = {
        method,
        headers: myHeaders,
        ...(data ? { body: JSON.stringify(data) } : {}),
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${route}`, requestOptions);
      if (!response.ok) {
        // Si la réponse n'est pas un succès, nous lançons une erreur avec le statut HTTP
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text(); // On lit la réponse comme du texte d'abord
      return result ? JSON.parse(result) : {}; // Si la réponse n'est pas vide, on parse le JSON
    } catch (error) {
      console.error('Error in API call:', error); // Affiche une erreur plus descriptive
      return false; // Retourne false en cas d'erreur pour permettre de gérer cela dans l'appelant
    }
  };

  return {
    get: (route: string) => callApi('GET', route),
    post: (route: string, data: Record<string, any>) => callApi('POST', route, data),
    put: (route: string, data: Record<string, any>) => callApi('PUT', route, data),
    patch: (route: string, data: Record<string, any>) => callApi('PATCH', route, data),
    delete: (route: string, data?: Record<string, any>) => callApi('DELETE', route, data),
  };
}
