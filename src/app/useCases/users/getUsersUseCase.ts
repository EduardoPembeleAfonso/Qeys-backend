import UsersEntity from '@/app/entities/users.entity';
import IUserRepository from '@/app/repositories/users.repository';
import { ErrosMessages } from '@/helpers';
import { badRequestResponse, errorResponse, HttpResponse, successResponse, UseCase } from '@/shared';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class GetUsersUseCase implements UseCase {
  constructor(
    @inject('IUserRepositoryPrismaImpl')
    private repository: IUserRepository,
  ){}
  async execute(request: UsersEntity): Promise<HttpResponse<any>> {
    try {
      const users = await this.repository.index(request.id);
      if(!users) {
        return badRequestResponse({ message: ErrosMessages.usersNotFounded });
      }

      return successResponse(users);
    }catch(err) {
      return errorResponse(err);
    }
  }
}