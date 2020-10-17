import Asilo from "../models/Asilo";
import imagesView from "./images_view";

export default {
  render(asilo: Asilo) {
    return {
      id: asilo.id,
      name: asilo.name,
      latitude: asilo.latitude,
      longitude: asilo.longitude,
      about: asilo.about,
      instructions: asilo.instructions,
      opening_hours: asilo.opening_hours,
      open_on_weekends: asilo.open_on_weekends,
      images: imagesView.renderMany(asilo.images),
    };
  },

  renderMany(asilos: Asilo[]) {
    return asilos.map((asilo) => this.render(asilo));
  },
};
