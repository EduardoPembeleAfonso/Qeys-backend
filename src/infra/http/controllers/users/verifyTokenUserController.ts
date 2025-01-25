import { Request, Response } from "express";
import { container } from "tsyringe";
import UsersEntity from "../../../../app/entities/users.entity";
import VerifyTokenUserUseCase from "@/app/useCases/users/verifyTokenUserUseCase";

export class VerifyTokenController {
  async handle(req: Request<UsersEntity>, res: Response) {
    const { email, token } = req.body;

    const useCase = container.resolve(VerifyTokenUserUseCase);

    const index = await useCase.execute({
      email,
      verificationByEmailToken: token,
    } as UsersEntity);

    return res.status(index.status).json(index.data);
  }
}
