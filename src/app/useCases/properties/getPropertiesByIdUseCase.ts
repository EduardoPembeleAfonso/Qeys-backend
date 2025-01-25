import PropertiesEntity from "@/app/entities/properties.entity";
import UsersEntity from "@/app/entities/users.entity";
import IPropertiesRepository from "@/app/repositories/properties.repository";
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
export default class GetPropertiesByIdUseCase implements UseCase {
  constructor(
    @inject("IPropertiesRepositoryPrismaImpl")
    private repository: IPropertiesRepository
  ) {}

  async execute(request: PropertiesEntity): Promise<HttpResponse<any>> {
    try {
      const properties = await this.repository.findByField("userId", request.userId);

      if (!properties) {
        return badRequestResponse({ message: ErrosMessages.propertiesNotFounded });
      }

      return successResponse(properties);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
