import { Request, Response } from "express";
import { container } from "tsyringe";
import SchedulingEntity from "@/app/entities/scheduling.entity";
import CancellSchedulingUseCase from '../../../../app/useCases/scheduling/cancellSchedulingUseCase';

export class CancellSchedulingController {
  async handle(req: Request<SchedulingEntity>, res: Response) {
    const { isActive } = req.body;

    const { id } = req.params;

    const useCase = container.resolve(CancellSchedulingUseCase);

    const index = await useCase.execute({
      id,
      isActive
    } as SchedulingEntity);

    return res.status(index.status).json(index.data);
  }
}
