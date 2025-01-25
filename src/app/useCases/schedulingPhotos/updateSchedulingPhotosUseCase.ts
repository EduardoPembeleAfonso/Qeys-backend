import { inject, injectable } from "tsyringe";
import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "@/shared";
import { ErrosMessages } from "../../../helpers/errors/errorsMessages.helper";
import ISchedulingPhotosRepository from "@/app/repositories/schedulingPhotos.repository";
import SchedulingPhotosEntity from "@/app/entities/schedulingPhotos.entity";

@injectable()
export default class UpdateSchedulingPhotosUseCase implements UseCase {
  constructor(
    @inject("ISchedulingPhotosRepositoryPrismaImpl")
    private repository: ISchedulingPhotosRepository
  ) {}

  async execute(request: SchedulingPhotosEntity): Promise<HttpResponse<any>> {
    try {
      const findScheduling = await this.repository.findBySpecificId(request.id);

      if (!findScheduling) {
        return badRequestResponse({
          message: ErrosMessages.schedulingNotFounded,
        });
      }

      const properties = await this.repository.update(request.id, request);

      return successResponse(properties);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
