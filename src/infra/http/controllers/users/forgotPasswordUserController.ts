import { Request, Response } from "express";
import { container } from "tsyringe";
import UsersEntity from "../../../../app/entities/users.entity";
import ForgotPasswordUserUseCase from "@/app/useCases/users/forgotPasswordUserUseCase";

export class ForgotPasswordController {
  async handle(req: Request<UsersEntity>, res: Response) {
    const { email } = req.body;

    const useCase = container.resolve(ForgotPasswordUserUseCase);

    const index = await useCase.execute({
      email,
    } as UsersEntity);

    return res.status(index.status).json(index.data);
  }
}
