import GetSchedulingUseCase from "@/app/useCases/scheduling/getSchedulingUseCase";
import { Scheduling } from "@prisma/client";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class GetSchedulingController {
  async handle(_: Request, res: Response<Scheduling[]>) {
    const useCase = container.resolve(GetSchedulingUseCase);

    const index = await useCase.execute();

    return res.status(index.status).json(index.data);
  }
}
