import { Scheduling } from "@prisma/client";
import { Request, Response } from "express";
import { container } from "tsyringe";
import SchedulingEntity from "@/app/entities/scheduling.entity";
import GetSchedulingByPropertieIdUseCase from "@/app/useCases/scheduling/getSchedulingByPropertieIdUseCase";

export class GetSchedulingByPropertieIdController {
  async handle(req: Request<SchedulingEntity>, res: Response<Scheduling[]>) {
    const { propertiesId } = req.params;
    const useCase = container.resolve(GetSchedulingByPropertieIdUseCase);

    const index = await useCase.execute({ propertiesId } as SchedulingEntity);

    return res.status(index.status).json(index.data);
  }
}
