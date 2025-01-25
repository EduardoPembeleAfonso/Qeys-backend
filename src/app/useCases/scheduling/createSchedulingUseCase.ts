import SchedulingEntity from "@/app/entities/scheduling.entity";
import ISchedulingRepository from "@/app/repositories/scheduling.repository";
import {
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "@/shared";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateSchedulingUseCase implements UseCase {
  constructor(
    @inject("ISchedulingRepositoryPrismaImpl")
    private repository: ISchedulingRepository
  ) {}

  async execute(request: SchedulingEntity): Promise<HttpResponse<any>> {
    try {
      const scheduling = await this.repository.create(request);

      return successResponse(scheduling);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
