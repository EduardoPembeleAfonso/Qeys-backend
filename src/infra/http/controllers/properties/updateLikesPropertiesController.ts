import { Request, Response } from "express";
import { container } from "tsyringe";
import PropertiesEntity from "@/app/entities/properties.entity";
import UpdateLikesPropertiesUseCase from "@/app/useCases/properties/updateLikesPropertiesUserUseCase";

export class UpdateLikesPropertiesController {
  async handle(req: Request<PropertiesEntity>, res: Response) {
    const { id } = req.params;

    const useCase = container.resolve(UpdateLikesPropertiesUseCase);


    const index = await useCase.execute({
      id,
    } as PropertiesEntity);

    return res.status(index.status).json(index.data);
  }
}
