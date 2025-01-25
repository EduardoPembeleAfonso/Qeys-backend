import { Request, Response } from "express";
import { CreateUserDto } from "../../dtos";
import { container } from "tsyringe";
import CreateUserUseCase from "@/app/useCases/users/createUserUseCase";
import UsersEntity from "@/app/entities/users.entity";

export class CreateUserController {
  async handle(req: Request<CreateUserDto>, res: Response) {
    const { email, name, password, type } = req.body;

    const useCase = container.resolve(CreateUserUseCase);

    const index = await useCase.execute({
      email,
      name,
      type,
      password,
    } as UsersEntity);

    return res.status(index.status).json(index.data);
  }
}
