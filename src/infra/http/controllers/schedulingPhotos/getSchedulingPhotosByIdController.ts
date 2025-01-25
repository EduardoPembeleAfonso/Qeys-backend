import SchedulingPhotosEntity from "@/app/entities/schedulingPhotos.entity";
import GetSchedulingPhotosByIdUseCase from "@/app/useCases/schedulingPhotos/getSchedulingPhotosByIdUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class GetSchedulingPhotosByIdController {
  async handle(req: Request<SchedulingPhotosEntity>, res: Response) {
    const { id } = req.params;

    const useCase = container.resolve(GetSchedulingPhotosByIdUseCase);

    const index = await useCase.execute({
      id,
    } as SchedulingPhotosEntity);

    return res.status(index.status).json(index.data);
  }
}
