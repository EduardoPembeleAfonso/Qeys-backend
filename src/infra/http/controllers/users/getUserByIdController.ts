import UsersEntity from "@/app/entities/users.entity";
import GetUserByIdUseCase from "@/app/useCases/users/getUserByIdUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class GetUserByIdController {
  async handle(req: Request<UsersEntity>, res: Response) {
    const { id } = req.params;

    const useCase = container.resolve(GetUserByIdUseCase);

    const index = await useCase.execute({
      id,
    } as UsersEntity);

    return res.status(index.status).json(index.data);
  }
}
