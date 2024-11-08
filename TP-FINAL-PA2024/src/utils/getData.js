const ACCES_TOKEN = import.meta.env.VITE_ACCES_TOKEN; // Accede al token desde .env

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCES_TOKEN}` // Usa el token en el encabezado
    }
};

const getData = async (url) => {
    try {
        const response = await fetch(url, options); // Hace la llamada a la API con opciones
        if (!response.ok) {
            throw new Error('Error: ' + response.status); // Manejo de errores
        }
        const data = await response.json(); // Convierte la respuesta a JSON
        return data; // Retorna los datos
    } catch (error) {
        console.log("Error fetching data: ", error); // Imprime errores en la consola
    }
};

export default getData; // Exporta la función para que puedas usarla en otros componentes
