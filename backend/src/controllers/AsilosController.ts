import { Request, Response } from "express";
import { getRepository } from "typeorm";
import asilosView from "../views/asilos_view";
import * as Yup from "yup";

import Asilo from "../models/Asilo";

export default {
  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const asiloRepository = getRepository(Asilo);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
      images,
    };
    const schema = Yup.object().shape({
      name: Yup.string().required("Nome é obrigatório!"),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });
    await schema.validate(data, {
      abortEarly: false,
    });
    const asilo = asiloRepository.create(data);

    await asiloRepository.save(asilo);

    return response.status(201).json(asilo);
  },

  async index(request: Request, response: Response) {
    const asiloRepository = getRepository(Asilo);

    const asilos = await asiloRepository.find({
      relations: ["images"],
    });

    return response.status(200).json(asilosView.renderMany(asilos));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const asiloRepository = getRepository(Asilo);

    const asilos = await asiloRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return response.status(200).json(asilosView.render(asilos));
  },
};
