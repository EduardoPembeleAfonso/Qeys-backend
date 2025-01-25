import IPropertiesRepository from '@/app/repositories/properties.repository';
import { errorResponse, HttpResponse, successResponse, UseCase } from '@/shared';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class GetPropertiesUseCase implements UseCase {
  constructor(
    @inject("IPropertiesRepositoryPrismaImpl")
    private repository: IPropertiesRepository
  ){}
  async execute(): Promise<HttpResponse<any>> {
    try {
      const properties = await this.repository.index();

      return successResponse(properties);
    }catch(err) {
      console.log('Error : ', err)
      return errorResponse(err);
    }
  }
}