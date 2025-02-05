import {
    HttpResponse,
    UseCase,
    badRequestResponse,
    errorResponse,
    successResponse,
} from "../../../shared";
import { injectable, inject } from "tsyringe";
import UsersEntity from "../../entities/users.entity";
import { ErrosMessages } from "@/helpers";
import IUserRepository from "../../repositories/users.repository";

@injectable()
export default class UpdateUserUseCase implements UseCase {
    constructor(
        @inject("IUserRepositoryPrismaImpl")
        private repository: IUserRepository
    ) { }

    async execute(request: UsersEntity): Promise<HttpResponse<any>> {
        try {
            const findUser = await this.repository.findBySpecificId(request.id);
            if (!findUser) {
                return badRequestResponse({ message: ErrosMessages.UserNotExists });
            }

            const user = await this.repository.update(findUser.id, request);

            return successResponse(user);
        } catch (error) {
            return errorResponse(error);
        }
    }
}
