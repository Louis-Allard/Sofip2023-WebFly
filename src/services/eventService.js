import axiosInstance from "axios";
const eventService = {
  addEvent: async (event) => {
    try {
      const response = await axiosInstance.post("/agenda", event);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchEvents: async () => {
    try {
      const response = await axiosInstance.get("/agenda");
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // ... Ajoutez les fonctions pour la modification et la suppression d'événements ici ...
};

export default eventService;
