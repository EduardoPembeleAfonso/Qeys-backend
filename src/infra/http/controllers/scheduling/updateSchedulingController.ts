import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateSchedulingUseCase from "@/app/useCases/scheduling/updateSchedulingUseCase";
import SchedulingEntity from "@/app/entities/scheduling.entity";

export class UpdateSchedulingController {
  async handle(req: Request<SchedulingEntity>, res: Response) {
    const { date, description, propertiesId, contact, userId, time } = req.body;

    const { id } = req.params;

    const useCase = container.resolve(UpdateSchedulingUseCase);

    const index = await useCase.execute({
      id,
      date,
      description,
      propertiesId,
      contact,
      userId,
      time
    } as SchedulingEntity);

    return res.status(index.status).json(index.data);
  }
}
