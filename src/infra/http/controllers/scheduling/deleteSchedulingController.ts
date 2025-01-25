import { Request, Response } from "express";
import { container } from "tsyringe";
import DeleteSchedulingUseCase from "@/app/useCases/scheduling/deleteSchedulingUseCase";
import SchedulingEntity from "@/app/entities/scheduling.entity";

export class DeleteSchedulingController {
  async handle(req: Request<SchedulingEntity>, res: Response) {
    const useCase = container.resolve(DeleteSchedulingUseCase);

    const index = await useCase.execute({
        id: req.params.id
    } as SchedulingEntity);

    return res.status(index.status).json(index.data);
}
}
