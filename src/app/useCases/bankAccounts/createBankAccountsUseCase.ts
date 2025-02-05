import BankAccountsEntity from "@/app/entities/bankAccounts.entity";
import IBankAccountsRepository from "@/app/repositories/bankAccounts.repository";
import {
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "@/shared";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateBankAccountsUseCase implements UseCase {
  constructor(
    @inject("IBankAccountsRepositoriesPrismaImpl")
    private repository: IBankAccountsRepository
  ) {}

  async execute(request: BankAccountsEntity): Promise<HttpResponse<any>> {
    try {
      console.log({request})
      const bank = await this.repository.create(request);

      return successResponse(bank);
    } catch (error) {
      console.log(error)
      return errorResponse(error);
    }
  }
}
