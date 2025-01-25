import { inject, injectable } from "tsyringe";
import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "@/shared";
import { ErrosMessages } from "../../../helpers/errors/errorsMessages.helper";
import IPropertiesRepository from "@/app/repositories/properties.repository";
import PropertiesEntity from "@/app/entities/properties.entity";

@injectable()
export default class UpdatePropertiesUseCase implements UseCase {
  constructor(
    @inject("IPropertiesRepositoryPrismaImpl")
    private repository: IPropertiesRepository
  ) {}

  async execute(request: PropertiesEntity): Promise<HttpResponse<any>> {
    try {
      const findProperties = await this.repository.findBySpecificId(request.id);

      if (!findProperties) {
        return badRequestResponse({
          message: ErrosMessages.propertiesNotFounded,
        });
      }

      const properties = await this.repository.update(request.id, request);

      return successResponse(properties);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
