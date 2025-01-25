import { Request, Response } from "express";
import { container } from "tsyringe";
import SchedulingPhotosEntity from "@/app/entities/schedulingPhotos.entity";
import DeleteSchedulingPhotosUseCase from "@/app/useCases/schedulingPhotos/deleteSchedulingPhotosUserUseCase";

export class DeleteSchedulingPhotosController {
  async handle(req: Request<SchedulingPhotosEntity>, res: Response) {
    const useCase = container.resolve(DeleteSchedulingPhotosUseCase);

    const index = await useCase.execute({
        id: req.params.id
    } as SchedulingPhotosEntity);

    return res.status(index.status).json(index.data);
}
}
