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
      coordinates,
      numberBedrooms,
      numberBathrooms
    } = req.body;
    const { userId } = req.params;

    const file = req.file as CustomFile
    // let files: CustomFile[];
    // let imageUrls: any[];
    // if (req.files) {
    //   files = req.files as CustomFile[];
    //   imageUrls = files.map(file => file.fileUrl);
    // }

    const useCase = container.resolve(CreatePropertiesUseCase);

    const area = parseInt(areaProperty)
    const bathrooms = parseInt(numberBathrooms)
    const bedrooms = parseInt(numberBedrooms)

    console.log({
      address,
      title,
      description,
      areaProperty: area,
      numberBathrooms: bathrooms,
      numberBedrooms: bedrooms,
      photo: file.fileUrl,
      coordinates,
      price,
      userId,
    })

    const index = await useCase.execute({
      address,
      title,
      description,
      areaProperty: area,
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
