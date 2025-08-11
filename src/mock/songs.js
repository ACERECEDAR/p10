const [songs, setSongs] = useState([]);

useEffect(() => {
  // Pedimos las canciones a tu hoja
  fetch('https://sheetdb.io/api/v1/vvgqm7l6rkuds')
    .then(response => response.json())
    .then(data => setSongs(data))
    .catch(error => console.error('Error cargando canciones', error));
}, []);

