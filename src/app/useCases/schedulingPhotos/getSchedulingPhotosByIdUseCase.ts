import SchedulingPhotosEntity from "@/app/entities/schedulingPhotos.entity";
import ISchedulingPhotosRepository from "@/app/repositories/schedulingPhotos.repository";
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
export default class GetSchedulingPhotosByIdUseCase implements UseCase {
  constructor(
    @inject("ISchedulingPhotosRepositoryPrismaImpl")
    private repository: ISchedulingPhotosRepository
  ) {}

  async execute(request: SchedulingPhotosEntity): Promise<HttpResponse<any>> {
    try {
      const scheduling = await this.repository.findBySpecificId(request.id);

      if (!scheduling) {
        return badRequestResponse({
          message: ErrosMessages.schedulingNotFounded,
        });
      }

      return successResponse(scheduling);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
