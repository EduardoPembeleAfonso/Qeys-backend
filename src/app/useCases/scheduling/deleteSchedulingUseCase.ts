import { inject, injectable } from "tsyringe";
import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "@/shared";
import { ErrosMessages } from "../../../helpers/errors/errorsMessages.helper";
import ISchedulingRepository from "@/app/repositories/scheduling.repository";
import SchedulingEntity from "@/app/entities/scheduling.entity";

@injectable()
export default class DeleteSchedulingUseCase implements UseCase {
  constructor(
    @inject("ISchedulingRepositoryPrismaImpl")
    private repository: ISchedulingRepository
  ) {}

  async execute(request: SchedulingEntity): Promise<HttpResponse<any>> {
    try {
      const findScheduling = await this.repository.findBySpecificId(request.id);

      if (!findScheduling) {
        return badRequestResponse({
          message: ErrosMessages.schedulingNotFounded,
        });
      }

      const scheduling = await this.repository.delete(request.id);

      return successResponse(scheduling);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
