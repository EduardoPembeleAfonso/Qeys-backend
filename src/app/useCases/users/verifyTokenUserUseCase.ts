import {
    HttpResponse,
    UseCase,
    badRequestResponse,
    errorResponse,
    successResponse,
} from "../../../shared";
import { injectable, inject } from "tsyringe";
import UsersEntity from "../../entities/users.entity";
import IUserRepository from "@/app/repositories/users.repository";
import { ErrosMessages } from "@/helpers";

@injectable()
export default class VerifyTokenUserUseCase implements UseCase {
    constructor(
        @inject("IUserRepositoryPrismaImpl")
        private repository: IUserRepository
    ) { }

    async execute(request: UsersEntity): Promise<HttpResponse<any>> {
        try {
            const findUser = await this.repository.findByField(
                "email",
                request.email
            );
            if (!findUser) {
                return badRequestResponse({ message: ErrosMessages.UserNotExists });
            }

            if (
                findUser.verificationByEmailToken !== request.verificationByEmailToken
            ) {
                return badRequestResponse({ message: ErrosMessages.tokenInvalid });
            }

            const now = new Date();
            if (now > findUser.verificationByEmailExpires) {
                return badRequestResponse({ message: ErrosMessages.tokenExpired });
            }

            request.verificationByEmailToken = null;

            const user = await this.repository.update(findUser.id, request);

            return successResponse(user);
        } catch (error) {
            return errorResponse(error);
        }
    }
}
