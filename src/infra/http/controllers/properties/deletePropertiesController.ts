import { Request, Response } from "express";
import { container } from "tsyringe";
import DeletePropertiesUseCase from "@/app/useCases/properties/deletePropertiesUserUseCase";
import PropertiesEntity from "@/app/entities/properties.entity";

export class DeletePropertiesController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(DeletePropertiesUseCase);

    const index = await useCase.execute({
        id: req.params.id
    } as PropertiesEntity);

    return res.status(index.status).json(index.data);
}
}
