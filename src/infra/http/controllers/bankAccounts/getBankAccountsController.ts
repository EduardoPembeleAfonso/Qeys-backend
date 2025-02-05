import GetBankAccountsUseCase from "@/app/useCases/bankAccounts/getBankAccountsUseCase";
import { BankAccounts } from "@prisma/client";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class GetBankAccountsController {
  async handle(_: Request, res: Response<BankAccounts[]>) {
    const useCase = container.resolve(GetBankAccountsUseCase);

    const index = await useCase.execute();

    return res.status(index.status).json(index.data);
  }
}
