import { Request, Response } from "express";
import { container } from "tsyringe";
import UsersEntity from "../../../../app/entities/users.entity";
import ResetPasswordUserUseCase from "@/app/useCases/users/resetPasswordUserUseCase";

export class ResetPasswordController {
  async handle(req: Request<UsersEntity>, res: Response) {
    const { email, password } = req.body;

    const useCase = container.resolve(ResetPasswordUserUseCase);

    const index = await useCase.execute({
      email,
      password,
    } as UsersEntity);

    return res.status(index.status).json(index.data);
  }
}
