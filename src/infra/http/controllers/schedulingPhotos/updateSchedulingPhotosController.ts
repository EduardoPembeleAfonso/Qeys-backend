import { Request, Response } from "express";
import { container } from "tsyringe";
import SchedulingPhotosEntity from "@/app/entities/schedulingPhotos.entity";
import UpdateSchedulingPhotosUseCase from "@/app/useCases/schedulingPhotos/updateSchedulingPhotosUseCase";

export class UpdateSchedulingPhotosController {
  async handle(req: Request<SchedulingPhotosEntity>, res: Response) {
    const { date, description, propertiesId } = req.body;

    const { id } = req.params;

    const useCase = container.resolve(UpdateSchedulingPhotosUseCase);

    const index = await useCase.execute({
      id,
      date,
      description,
      propertiesId,
    } as SchedulingPhotosEntity);

    return res.status(index.status).json(index.data);
  }
}
