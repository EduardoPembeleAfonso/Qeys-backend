import { Request, Response } from "express";
import { container } from "tsyringe";
import UsersEntity from "@/app/entities/users.entity";
import UpdateUserUseCase from "@/app/useCases/users/updateUserUseCase";

export class UpdateUserController {
  async handle(req: Request<UsersEntity>, res: Response) {
    const { email, name, type, image } = req.body;
    const { id } = req.params;

    const useCase = container.resolve(UpdateUserUseCase);

    const index = await useCase.execute({
      id,
      email,
      name,
      type,
      image
    } as unknown as UsersEntity);

    return res.status(index.status).json(index.data);
  }
}
