import { Scheduling } from "@prisma/client";
import { Request, Response } from "express";
import { container } from "tsyringe";
import SchedulingEntity from "@/app/entities/scheduling.entity";
import GetSchedulingByUserIdUseCase from "@/app/useCases/scheduling/getSchedulingByUserIdUseCase";

export class GetSchedulingByUserIdController {
  async handle(req: Request<SchedulingEntity>, res: Response<Scheduling[]>) {
    const { userId } = req.params;
    const useCase = container.resolve(GetSchedulingByUserIdUseCase);

    const index = await useCase.execute({ userId } as SchedulingEntity);

    return res.status(index.status).json(index.data);
  }
}
