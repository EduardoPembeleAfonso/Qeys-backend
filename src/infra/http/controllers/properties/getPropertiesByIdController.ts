import PropertiesEntity from "@/app/entities/properties.entity";
import GetPropertiesByIdUseCase from "@/app/useCases/properties/getPropertiesByIdUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class GetPropertiesByIdController {
  async handle(req: Request<PropertiesEntity>, res: Response) {
    const { userId } = req.params;

    const useCase = container.resolve(GetPropertiesByIdUseCase);

    const index = await useCase.execute({
      userId,
    } as PropertiesEntity);

    return res.status(index.status).json(index.data);
  }
}
