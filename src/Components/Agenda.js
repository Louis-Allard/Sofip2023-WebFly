import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FullCalendar from "@fullcalendar/react"; // Assurez-vous d'installer @fullcalendar/core et @fullcalendar/react
import dayGridPlugin from "@fullcalendar/daygrid";
import { Link } from "react-router-dom";
import eventService from "../services/eventService.js";
import { useSelector } from "react-redux";

const Agenda = () => {
  const [events, setEvents] = useState([]);
  const [existingEvents, setExistingEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
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
      const fetchedEvents = await eventService.fetchEvents();
      const formattedEvents = fetchedEvents.map((event) => ({
        id: event.ID_CALENDRIER,
        title: event.TITLE,
        start: event.DATE_CALENDRIER,
      }));
      setEvents(formattedEvents);
      setExistingEvents(fetchedEvents); // Mettez à jour les rendez-vous existants
    } catch (error) {
      console.error(error);
    }
  };

  // ...

  useEffect(() => {
    fetchEvents();
  }, []);
  const handleEventRemove = async (event) => {
    try {
      await eventService.removeEvent(event.ID_CALENDRIER);
      fetchEvents(); // Mettez à jour les événements localement en appelant fetchEvents
    } catch (error) {
      console.error(error);
    }
    // Supprimez l'événement de la liste
    const updatedEvents = events.filter(
      (e) => e.ID_CALENDRIER !== event.ID_CALENDRIER
    );
    setEvents(updatedEvents);
  };

  const id = useSelector((state) => state.idUser);
  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const date = e.target.date.value;
    const newEvent = { id: events.length + 1, title, date, id };
    handleEventAdd(newEvent);
    e.target.reset();
  };

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

  const handleDelete = async (e, event) => {
    e.preventDefault();
    try {
      await eventService.removeEvent(event.ID_CALENDRIER);
      // Mettez à jour à la fois events et existingEvents
      const updatedEvents = events.filter((e) => e.id !== event.ID_CALENDRIER);
      setEvents(updatedEvents);
      setExistingEvents(updatedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTitle = (e) => {
    setEditingEvent({
      ...editingEvent,
      TITLE: e.target.value,
    });
  };

  const handleEditDate = (e) => {
    setEditingEvent({
      ...editingEvent,
      DATE_CALENDRIER: e.target.value,
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
      <Link to="/join" className="btn btn-primary mb-3">
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
          {existingEvents.map((event) => (
            <li key={event.ID_CALENDRIER}>
              {event.TITLE} - {event.DATE_CALENDRIER}
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
                    value={editingEvent.TITLE}
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
                    value={editingEvent.DATE_CALENDRIER}
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
