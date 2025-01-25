import ISchedulingRepository from '@/app/repositories/scheduling.repository';
import { errorResponse, HttpResponse, successResponse, UseCase } from '@/shared';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class GetSchedulingUseCase implements UseCase {
  constructor(
    @inject("ISchedulingRepositoryPrismaImpl")
    private repository: ISchedulingRepository
  ){}
  async execute(): Promise<HttpResponse<any>> {
    try {
      const properties = await this.repository.index();

      return successResponse(properties);
    }catch(err) {
      return errorResponse(err);
    }
  }
}