import SchedulingPhotosEntity from '@/app/entities/schedulingPhotos.entity';
import ISchedulingPhotosRepository from '@/app/repositories/schedulingPhotos.repository';
import { ErrosMessages } from '@/helpers';
import { badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from '@/shared';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class GetSchedulingPhotosUseCase implements UseCase {
  constructor(
    @inject("ISchedulingPhotosRepositoryPrismaImpl")
    private repository: ISchedulingPhotosRepository
  ){}
  async execute(request: SchedulingPhotosEntity): Promise<HttpResponse<any>> {
    try {
      const properties = await this.repository.findByField("propertiesId", request.propertiesId);
      if(!properties) {
        return badRequestResponse({ message: ErrosMessages.usersNotFounded });
      }

      return successResponse(properties);
    }catch(err) {
      return errorResponse(err);
    }
  }
}