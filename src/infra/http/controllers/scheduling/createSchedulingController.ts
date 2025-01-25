import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateSchedulingUseCase from "@/app/useCases/scheduling/createSchedulingUseCase";
import SchedulingEntity from "@/app/entities/scheduling.entity";

export class CreateSchedulingController {
  async handle(req: Request<SchedulingEntity>, res: Response) {
    const { date, description, propertiesId, contact, userId, time } = req.body;

    const useCase = container.resolve(CreateSchedulingUseCase);

    const index = await useCase.execute({
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
