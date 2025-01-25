import UsersEntity from "@/app/entities/users.entity";
import IUserRepository from "@/app/repositories/users.repository";
import { ErrosMessages } from "@/helpers";
import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "@/shared";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetUserByIdUseCase implements UseCase {
  constructor(
    @inject("IUserRepositoryPrismaImpl")
    private repository: IUserRepository
  ) {}

  async execute(request: UsersEntity): Promise<HttpResponse<any>> {
    try {
      const user = await this.repository.findBySpecificId(request.id);

      if (!user) {
        return badRequestResponse({ message: ErrosMessages.usersNotFounded });
      }

      return successResponse(user);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
