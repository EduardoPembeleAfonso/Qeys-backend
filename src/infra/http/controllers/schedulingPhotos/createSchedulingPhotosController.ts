import { Request, Response } from "express";
import { container } from "tsyringe";
import SchedulingPhotosEntity from "@/app/entities/schedulingPhotos.entity";
import CreateSchedulingPhotosUseCase from "@/app/useCases/schedulingPhotos/createSchedulingPhotosUseCase";

export class CreateSchedulingPhotosController {
  async handle(req: Request<SchedulingPhotosEntity>, res: Response) {
    const { date, description, propertiesId, userId } = req.body;

    const useCase = container.resolve(CreateSchedulingPhotosUseCase);

    const index = await useCase.execute({
      date,
      description,
      propertiesId,
      userId
    } as SchedulingPhotosEntity);

    return res.status(index.status).json(index.data);
  }
}
