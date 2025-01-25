import PropertiesEntity from "@/app/entities/properties.entity";
import IPropertiesRepository from "@/app/repositories/properties.repository";
import {
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "@/shared";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreatePropertiesUseCase implements UseCase {
  constructor(
    @inject("IPropertiesRepositoryPrismaImpl")
    private repository: IPropertiesRepository
  ) {}

  async execute(request: PropertiesEntity): Promise<HttpResponse<any>> {
    try {
      console.log({request})
      const properties = await this.repository.create(request);

      return successResponse(properties);
    } catch (error) {
      console.log(error)
      return errorResponse(error);
    }
  }
}
