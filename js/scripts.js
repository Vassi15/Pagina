document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fetchData').addEventListener('click', function() {
        const resultadosDiv = document.getElementById('resultados');

        // URL de la API del BOE
        const apiUrl = 'https://www.boe.es/datosabiertos/api/datos-auxiliares/materias';

        // Fetch datos XML de la API
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/xml'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            console.log('Contenido XML:', data);  // Imprime el XML para verificar

            // Procesar el XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            // Obtener los datos de <item>
            const items = xmlDoc.getElementsByTagName('item');

            // Generar HTML para los resultados
            let resultadosHtml = '<h2>Materias</h2>';

            if (items.length === 0) {
                resultadosHtml += '<p>No se encontraron datos.</p>';
            } else {
                for (let i = 0; i < items.length; i++) {
                    const codigo = items[i].getElementsByTagName('codigo')[0]?.textContent || 'No disponible';
                    const descripcion = items[i].getElementsByTagName('descripcion')[0]?.textContent || 'No disponible';
                    resultadosHtml += `
                        <div>
                            <h3>${codigo}</h3>
                            <p>${descripcion}</p>
                        </div>
                    `;
                }
            }
            resultadosDiv.innerHTML = resultadosHtml;
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            resultadosDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    });
});


