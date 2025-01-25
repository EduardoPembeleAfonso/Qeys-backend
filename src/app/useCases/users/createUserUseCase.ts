import UsersEntity from "@/app/entities/users.entity";
import IUserRepository from "@/app/repositories/users.repository";
import { ErrosMessages, IsvalidEmail, PasswordsHelpers } from "@/helpers";
import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "@/shared";
import * as jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateUserUseCase implements UseCase {
  constructor(
    @inject("IUserRepositoryPrismaImpl")
    private repository: IUserRepository
  ) {}

  async execute(request: UsersEntity): Promise<HttpResponse<any>> {
    try {
      if (!IsvalidEmail(request.email)) {
        return badRequestResponse({ message: ErrosMessages.InvalidEmail });
      }

      const existsUserByEmail = await this.repository.findByField(
        "email",
        request.email
      );

      if (existsUserByEmail) {
        return badRequestResponse({ message: ErrosMessages.UserAlreadyExists });
      }

      request.password = await PasswordsHelpers.hashPassword(request.password);

      const user = await this.repository.create(request);

      const token = jwt.sign(
        { email: user.email, id: user.id },
        "qeys-jwt",
        // process.env.JWT_SECRET ?? "",
        { expiresIn: "60d" }
      );

      const userLogged = {
        auth: {
          type: "jwt",
          token,
        },
        user: user,
      };

      return successResponse(userLogged);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
