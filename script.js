// URL de la API
const apiUrl = 'https://jsonplaceholder.typicode.com/users';
let allData = [];

// Función para obtener los datos de la API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        allData = data; // Almacena todos los datos en una variable global
        populateTable(data);
        console.log(allData);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Función para llenar la tabla con los datos
function populateTable(data) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    // Limpiar la tabla antes de llenarla
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    // Llenar los encabezados de la tabla
    if (data.length > 0) {
        const headers = Object.keys(data[0]);
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            tableHeader.appendChild(th);
        });

        // Llenar los datos de la tabla
        data.forEach(item => {
            const tr = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = item[header];
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }
}

// Función para buscar y filtrar personas por nombre
function searchPerson() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredData = allData.filter(person => person.name.toLowerCase().includes(searchInput));
    populateTable(filteredData);
}

// Función para ordenar los datos por el primer nombre
function sortByName() {
    const sortedData = [...allData].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
    populateTable(sortedData);
}

// Llamar a la función para obtener los datos al cargar la página
document.addEventListener('DOMContentLoaded', fetchData);
