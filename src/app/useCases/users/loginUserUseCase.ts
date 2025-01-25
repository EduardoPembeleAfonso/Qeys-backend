import IUserRepository from "@/app/repositories/users.repository";
import { inject, injectable } from "tsyringe";
import * as jwt from "jsonwebtoken";
import UsersEntity from "@/app/entities/users.entity";
import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "@/shared";
import { IsvalidEmail, PasswordsHelpers } from "@/helpers";
import { ErrosMessages } from "../../../helpers/errors/errorsMessages.helper";

@injectable()
export default class LoginUserUseCase implements UseCase {
  constructor(
    @inject("IUserRepositoryPrismaImpl")
    private repository: IUserRepository
  ) {}

  async execute(request: UsersEntity): Promise<HttpResponse<any>> {
    try {
      if (!IsvalidEmail(request.email)) {
        return badRequestResponse({ message: ErrosMessages.InvalidEmail });
      }

      const user = await this.repository.findByField("email", request.email);
      if (!user) {
        return badRequestResponse({
          message: ErrosMessages.InvalidEmailOurPassword,
        });
      }

      if (
        !(await PasswordsHelpers.comparePassword(
          request.password,
          user.password
        ))
      ) {
        return badRequestResponse({
          message: ErrosMessages.InvalidEmailOurPassword,
        });
      }

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
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          type: user.type,
        },
      };

      return successResponse(userLogged);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
