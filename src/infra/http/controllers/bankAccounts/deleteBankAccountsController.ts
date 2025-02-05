import { Request, Response } from "express";
import { container } from "tsyringe";
import DeleteBankAccountsUseCase from "@/app/useCases/bankAccounts/deleteBankAccountsUseCase";
import BankAccountsEntity from "@/app/entities/bankAccounts.entity";

export class DeleteBankAccountsController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(DeleteBankAccountsUseCase);

    const index = await useCase.execute({
      id: req.params.id
    } as BankAccountsEntity);

    return res.status(index.status).json(index.data);
  }
}
