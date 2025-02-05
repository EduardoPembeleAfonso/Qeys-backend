import BankAccountsEntity from "@/app/entities/bankAccounts.entity";
import GetBankAccountsByIdUseCase from "@/app/useCases/bankAccounts/getBankAccountsByIdUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class GetBankAccountsByIdController {
  async handle(req: Request<BankAccountsEntity>, res: Response) {
    const { userId } = req.params;

    const useCase = container.resolve(GetBankAccountsByIdUseCase);

    const index = await useCase.execute({
      userId,
    } as BankAccountsEntity);

    return res.status(index.status).json(index.data);
  }
}
