import SchedulingPhotosEntity from "@/app/entities/schedulingPhotos.entity";
import ISchedulingPhotosRepository from "@/app/repositories/schedulingPhotos.repository";
import {
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "@/shared";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateSchedulingPhotosUseCase implements UseCase {
  constructor(
    @inject("ISchedulingPhotosRepositoryPrismaImpl")
    private repository: ISchedulingPhotosRepository
  ) {}

  async execute(request: SchedulingPhotosEntity): Promise<HttpResponse<any>> {
    try {
      const scheduling = await this.repository.create(request);

      return successResponse(scheduling);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
