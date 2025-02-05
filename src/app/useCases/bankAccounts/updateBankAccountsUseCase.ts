import { inject, injectable } from "tsyringe";
import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
  UseCase,
} from "@/shared";
import { ErrosMessages } from "../../../helpers/errors/errorsMessages.helper";
import IBankAccountsRepository from "@/app/repositories/bankAccounts.repository";
import BankAccountsEntity from "@/app/entities/bankAccounts.entity";

@injectable()
export default class UpdateBankAccountsUseCase implements UseCase {
  constructor(
    @inject("IBankAccountsRepositoriesPrismaImpl")
    private repository: IBankAccountsRepository
  ) { }

  async execute(request: BankAccountsEntity): Promise<HttpResponse<any>> {
    try {
      const findBank = await this.repository.findBySpecificId(request.id);

      if (!findBank) {
        return badRequestResponse({
          message: ErrosMessages.bankNotFounded,
        });
      }

      const bank = await this.repository.update(request.id, request);

      return successResponse(bank);
    } catch (error) {
      console.log({ error: error })
      return errorResponse(error);
    }
  }
}
