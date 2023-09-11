import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FullCalendar from "@fullcalendar/react"; // Assurez-vous d'installer @fullcalendar/core et @fullcalendar/react
import dayGridPlugin from "@fullcalendar/daygrid";
import { Link } from "react-router-dom";
import eventService from "../services/eventService.js";

const Agenda = () => {
  const [events, setEvents] = useState([]);

  const handleEventAdd = async (event) => {
    try {
      await eventService.addEvent(event);
      fetchEvents(); // Mettez à jour les événements localement en appelant fetchEvents
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEvents = async () => {
    try {
      const events = await eventService.fetchEvents();
      setEvents(events);
    } catch (error) {
      console.error(error);
    }
  };

  // ...

  useEffect(() => {
    fetchEvents();
  }, []);
  const handleEventRemove = (event) => {
    // Supprimez l'événement de la liste
    const updatedEvents = events.filter((e) => e.id !== event.id);
    setEvents(updatedEvents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const date = e.target.date.value;
    const newEvent = { id: events.length + 1, title, date };
    handleEventAdd(newEvent);
    e.target.reset();
  };
  const [editingEvent, setEditingEvent] = useState(null);

  const handleEdit = (e, event) => {
    e.preventDefault();
    setEditingEvent(event); // Ouvrir un formulaire de modification avec les détails de l'événement
  };

  const handleEventUpdate = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    setEditingEvent(null); // Remettre à zéro l'événement en cours de modification
  };

  const handleDelete = (e, event) => {
    e.preventDefault();
    handleEventRemove(event);
  };

  const handleEditTitle = (e) => {
    setEditingEvent({
      ...editingEvent,
      title: e.target.value,
    });
  };

  const handleEditDate = (e) => {
    setEditingEvent({
      ...editingEvent,
      date: e.target.value,
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    handleEventUpdate(editingEvent);
  };

  const cancelEdit = () => {
    setEditingEvent(null);
  };

  return (
    <div className="container">
      <Link to="/adminPanel" className="btn btn-primary mb-3">
        <i className="bi bi-chevron-left"></i> Retour
      </Link>
      <h1>Agenda</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        eventAdd={handleEventAdd}
        eventRemove={handleEventRemove}
      />
      <div className="mt-3">
        <h3>Ajouter un rendez-vous</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titre :</label>
            <input type="text" name="title" className="form-control" required />
          </div>
          <div className="form-group">
            <label>Date :</label>
            <input type="date" name="date" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary">
            Ajouter
          </button>
        </form>
      </div>
      <div className="mt-3">
        <h3>Rendez-vous existants</h3>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.title} - {event.date}
              <button
                className="btn btn-link"
                onClick={(e) => handleEdit(e, event)}
              >
                Modifier
              </button>
              <button
                className="btn btn-link text-danger"
                onClick={(e) => handleDelete(e, event)}
              >
                Supprimer
              </button>
            </li>
          ))}
          {editingEvent && (
            <div className="mt-3">
              <h3>Modifier un rendez-vous</h3>
              <form onSubmit={handleUpdateSubmit}>
                <div className="form-group">
                  <label>Titre :</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={editingEvent.title}
                    onChange={handleEditTitle}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date :</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={editingEvent.date}
                    onChange={handleEditDate}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Enregistrer les modifications
                </button>
                <button
                  className="btn btn-link text-danger"
                  onClick={cancelEdit}
                >
                  Annuler
                </button>
              </form>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Agenda;
