import UsersEntity from "@/app/entities/users.entity";
import GetUsersUseCase from "@/app/useCases/users/getUsersUseCase";
import { User } from "@prisma/client";
import { Request, Response } from "express";
import { container } from "tsyringe";


export class GetUsersController {
    async handle(req: Request<UsersEntity>, res: Response<User[]>) {
      const { id } = req.params
      const useCase = container.resolve(GetUsersUseCase);
  
      const index = await useCase.execute({ id } as UsersEntity);
  
      return res.status(index.status).json(index.data);
    }
  }