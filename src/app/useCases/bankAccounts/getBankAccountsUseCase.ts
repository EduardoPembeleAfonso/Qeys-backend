import IBankAccountsRepository from '@/app/repositories/bankAccounts.repository';
import { errorResponse, HttpResponse, successResponse, UseCase } from '@/shared';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class GetBankAccountsUseCase implements UseCase {
  constructor(
    @inject("IBankAccountsRepositoriesPrismaImpl")
    private repository: IBankAccountsRepository
  ) { }
  async execute(): Promise<HttpResponse<any>> {
    try {
      const bank = await this.repository.index();

      return successResponse(bank);
    } catch (err) {
      console.log('Error : ', err)
      return errorResponse(err);
    }
  }
}