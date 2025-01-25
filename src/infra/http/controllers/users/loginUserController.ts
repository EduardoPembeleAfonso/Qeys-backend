import { Request, Response } from "express";
import { CredentialsLoginDto } from "../../dtos";
import { container } from "tsyringe";
import LoginUserUseCase from "@/app/useCases/users/loginUserUseCase";
import UsersEntity from "@/app/entities/users.entity";

export class LoginUserController {
  async handle(req: Request<CredentialsLoginDto>, res: Response) {
    const { email, password } = req.body;

    const useCase = container.resolve(LoginUserUseCase);

    const index = await useCase.execute({ email, password } as UsersEntity);

    return res.status(index.status).json(index.data);
  }
}
