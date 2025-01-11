import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../style.css';
import { motion } from 'framer-motion';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const Itineraries = () => {
  const [itineraries, setItineraries] = useState([]);
  const [newItinerary, setNewItinerary] = useState('');
  const [toDoList, setToDoList] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCnFsjJCTymCjBztmc-gnVjbM7EHFjznjk',
  });

  const getCoordinates = async (address) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyBIYKWYyrH0NCjMvLM0THu029M10rfc8vM`
    );
    const data = await response.json();
    console.log('Răspuns API:', data);
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    }
    alert('Locația nu a fost găsită. Verifică introducerea.');
    return null;
  };

  const handleAddItinerary = async () => {
    if (newItinerary.trim() !== '' && locationInput.trim() !== '') {
      const coordinates = await getCoordinates(locationInput);
      if (coordinates) {
        const newItineraryObj = { title: newItinerary, id: Date.now(), ...coordinates };
        setItineraries([...itineraries, newItineraryObj]);
        setLocations((prev) => [...prev, { id: newItineraryObj.id, ...coordinates }]);
        setNewItinerary('');
        setLocationInput('');
      }
    }
  };

  const handleDeleteItinerary = (id) => {
    setItineraries(itineraries.filter((itinerary) => itinerary.id !== id));
    const updatedToDo = { ...toDoList };
    delete updatedToDo[id];
    setToDoList(updatedToDo);

    const updatedRecommendations = { ...recommendations };
    delete updatedRecommendations[id];
    setRecommendations(updatedRecommendations);

    setLocations(locations.filter((location) => location.id !== id));
  };

  const generateGoogleMapsLink = () => {
    if (locations.length < 2) return '#';

    const origin = `${locations[0].lat},${locations[0].lng}`;
    const destination = `${locations[locations.length - 1].lat},${locations[locations.length - 1].lng}`;
    const waypoints = locations
      .slice(1, -1)
      .map((loc) => `${loc.lat},${loc.lng}`)
      .join('|');

    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=driving`;
  };

  const exportAllToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Itinerariile mele', 10, 10);

    itineraries.forEach((itinerary, index) => {
      const tasks = toDoList[itinerary.id] || [];
      const recs = recommendations[itinerary.id] || [];

      doc.setFontSize(16);
      doc.text(`${index + 1}. ${itinerary.title}`, 10, doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 20);

      doc.autoTable({
        head: [['Categorie', 'Detalii']],
        body: [
          ['To-Do List', tasks.length ? tasks.join(', ') : 'Nu există sarcini.'],
          ['Recomandări', recs.length ? recs.join(', ') : 'Nu există recomandări.'],
        ],
        theme: 'grid',
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 30,
      });
    });

    doc.save('Itinerariile_Mele.pdf');
  };

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <div className="itineraries-container">
      <h2 className="section-title">Itinerariile mele</h2>
      <div className="summary-container">
        <p>Total itinerarii: {itineraries.length}</p>
      </div>

      <div className="itinerary-input-group">
        <input
          type="text"
          value={newItinerary}
          onChange={(e) => setNewItinerary(e.target.value)}
          placeholder="Adaugă un itinerar..."
          className="itinerary-input"
        />
        <input
          type="text"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          placeholder="Introduce locația (ex. București, Paris)"
          className="location-input"
        />
        <button onClick={handleAddItinerary} className="itinerary-button">
          Adaugă
        </button>
      </div>

      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px', margin: '20px 0' }}
        center={locations.length ? locations[0] : { lat: 44.4268, lng: 26.1025 }}
        zoom={8}
      >
        {locations.map((loc) => (
          <Marker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }} />
        ))}
      </GoogleMap>

      <button
        onClick={() => window.open(generateGoogleMapsLink(), '_blank')}
        className="view-map-button"
      >
        Vezi Harta în Google Maps
      </button>

      <div className="itinerary-list">
        {itineraries.map((itinerary) => (
          <motion.div
            key={itinerary.id}
            className="itinerary-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="itinerary-title">{itinerary.title}</h3>
            <div className="button-group">
              <button
                onClick={() => handleDeleteItinerary(itinerary.id)}
                className="delete-itinerary-button"
              >
                Șterge
              </button>
            </div>
            <div className="itinerary-details">
              <h4>To-Do List:</h4>
              <input
                type="text"
                placeholder="Adaugă o sarcină..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const task = e.target.value;
                    setToDoList((prev) => ({
                      ...prev,
                      [itinerary.id]: [...(prev[itinerary.id] || []), task],
                    }));
                    e.target.value = '';
                  }
                }}
                className="to-do-input"
              />
              <ul className="to-do-list">
                {(toDoList[itinerary.id] || []).map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
              <h4>Recomandări:</h4>
              <input
                type="text"
                placeholder="Adaugă o recomandare..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const recommendation = e.target.value;
                    setRecommendations((prev) => ({
                      ...prev,
                      [itinerary.id]: [
                        ...(prev[itinerary.id] || []),
                        recommendation,
                      ],
                    }));
                    e.target.value = '';
                  }
                }}
                className="recommendation-input"
              />
              <ul className="recommendation-list">
                {(recommendations[itinerary.id] || []).map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <button onClick={exportAllToPDF} className="export-all-button">
        Salvează toate în PDF
      </button>
    </div>
  );
};

export default Itineraries;
