import { Request, Response } from "express";
import { container } from "tsyringe";
import PropertiesEntity from "@/app/entities/properties.entity";
import CreatePropertiesUseCase from "@/app/useCases/properties/createPropertiesUseCase";
import { CustomFile } from "@/helpers/interface/file.interface";

export class CreatePropertiesController {
  async handle(req: Request<PropertiesEntity>, res: Response) {
    const {
      address,
      title,
      description,
      areaProperty,
      price,
      photo,
      isForSale,
      coordinates,
      numberBedrooms,
      numberBathrooms
    } = req.body;
    const { userId } = req.params;

    const file = req.file as CustomFile
    let forSale = false;
    if (isForSale.trim() === "true") {
      forSale = true
    } else {
      forSale = false
    }

    const useCase = container.resolve(CreatePropertiesUseCase);

    const area = parseInt(areaProperty)
    const bathrooms = parseInt(numberBathrooms)
    const bedrooms = parseInt(numberBedrooms)


    const index = await useCase.execute({
      address,
      title,
      description,
      areaProperty: area,
      isForSale: forSale,
      numberBathrooms: bathrooms,
      numberBedrooms: bedrooms,
      photo: file.fileUrl,
      coordinates,
      price,
      userId,
    } as unknown as PropertiesEntity);



    return res.status(index.status).json(index.data);
  }
}
