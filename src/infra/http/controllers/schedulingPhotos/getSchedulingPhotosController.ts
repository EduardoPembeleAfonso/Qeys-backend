import SchedulingPhotosEntity from "@/app/entities/schedulingPhotos.entity";
import { SchedulingPhotos } from "@prisma/client";
import { Request, Response } from "express";
import { container } from "tsyringe";
import GetSchedulingPhotosUseCase from "@/app/useCases/schedulingPhotos/getSchedulingPhotosUseCase";

export class GetSchedulingPhotosController {
  async handle(req: Request<SchedulingPhotosEntity>, res: Response<SchedulingPhotos[]>) {
    const { propertiesId } = req.params;
    const useCase = container.resolve(GetSchedulingPhotosUseCase);

    const index = await useCase.execute({ propertiesId } as SchedulingPhotosEntity);

    return res.status(index.status).json(index.data);
  }
}
