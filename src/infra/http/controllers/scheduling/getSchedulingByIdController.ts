import SchedulingEntity from "@/app/entities/scheduling.entity";
import GetSchedulingByIdUseCase from "@/app/useCases/scheduling/getSchedulingByIdUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class GetSchedulingByIdController {
  async handle(req: Request<SchedulingEntity>, res: Response) {
    const { id } = req.params;

    const useCase = container.resolve(GetSchedulingByIdUseCase);

    const index = await useCase.execute({
      id,
    } as SchedulingEntity);

    return res.status(index.status).json(index.data);
  }
}
