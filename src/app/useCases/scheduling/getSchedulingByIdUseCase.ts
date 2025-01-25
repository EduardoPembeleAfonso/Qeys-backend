import SchedulingEntity from "@/app/entities/scheduling.entity";
import ISchedulingRepository from "@/app/repositories/scheduling.repository";
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
export default class GetSchedulingByIdUseCase implements UseCase {
  constructor(
    @inject("ISchedulingRepositoryPrismaImpl")
    private repository: ISchedulingRepository
  ) {}

  async execute(request: SchedulingEntity): Promise<HttpResponse<any>> {
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
