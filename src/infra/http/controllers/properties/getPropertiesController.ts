import GetPropertiesUseCase from "@/app/useCases/properties/getPropertiesUseCase";
import { Properties } from "@prisma/client";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class GetPropertiesController {
  async handle(_: Request, res: Response<Properties[]>) {
    const useCase = container.resolve(GetPropertiesUseCase);

    const index = await useCase.execute();

    return res.status(index.status).json(index.data);
  }
}
