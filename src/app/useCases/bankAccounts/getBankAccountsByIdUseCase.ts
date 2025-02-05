import BankAccountsEntity from "@/app/entities/bankAccounts.entity";
import IBankAccountsRepository from "@/app/repositories/bankAccounts.repository";
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
export default class GetBankAccountsByIdUseCase implements UseCase {
  constructor(
    @inject("IBankAccountsRepositoriesPrismaImpl")
    private repository: IBankAccountsRepository
  ) {}

  async execute(request: BankAccountsEntity): Promise<HttpResponse<any>> {
    try {
      const bank = await this.repository.findByField("userId", request.userId);

      if (!bank) {
        return badRequestResponse({ message: ErrosMessages.bankNotFounded });
      }

      return successResponse(bank);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
