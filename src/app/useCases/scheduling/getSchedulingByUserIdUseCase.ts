import SchedulingEntity from '@/app/entities/scheduling.entity';
import ISchedulingRepository from '@/app/repositories/scheduling.repository';
import { ErrosMessages } from '@/helpers';
import { badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from '@/shared';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class GetSchedulingByUserIdUseCase implements UseCase {
  constructor(
    @inject("ISchedulingRepositoryPrismaImpl")
    private repository: ISchedulingRepository
  ){}
  async execute(request: SchedulingEntity): Promise<HttpResponse<any>> {
    try {
      const properties = await this.repository.findByField("userId", request.userId);
      if(!properties) {
        return badRequestResponse({ message: ErrosMessages.usersNotFounded });
      }

      return successResponse(properties);
    }catch(err) {
      return errorResponse(err);
    }
  }
}