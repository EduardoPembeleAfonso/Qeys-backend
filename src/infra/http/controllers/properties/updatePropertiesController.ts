import { Request, Response } from "express";
import { container } from "tsyringe";
import PropertiesEntity from "@/app/entities/properties.entity";
import UpdatePropertiesUseCase from "@/app/useCases/properties/updatePropertiesUserUseCase";
import { CustomFile } from "@/helpers/interface/file.interface";

export class UpdatePropertiesController {
  async handle(req: Request<PropertiesEntity>, res: Response) {
    const {
      address,
      title,
      description,
      areaProperty,
      price,
      photo,
      likes,
      numberBedrooms,
      numberBathrooms
    } = req.body;
    const { id } = req.params;

    let file: CustomFile;
    if (req.file) {
      file = req.file as CustomFile;
    }

    const area = parseInt(areaProperty)
    const bathrooms = parseInt(numberBathrooms)
    const like = parseInt(likes)
    const bedrooms = parseInt(numberBedrooms)

    const useCase = container.resolve(UpdatePropertiesUseCase);


    const index = await useCase.execute({
      id,
      address,
      title,
      description,
      areaProperty: area,
      numberBathrooms: bathrooms,
      likes: like,
      numberBedrooms: bedrooms,
      photo: file ? file.fileUrl : photo,
      price,
    } as unknown as PropertiesEntity);

    return res.status(index.status).json(index.data);
  }
}
