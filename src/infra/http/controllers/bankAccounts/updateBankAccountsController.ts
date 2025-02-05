import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateBankAccountsUseCase from "@/app/useCases/bankAccounts/updateBankAccountsUseCase";
import BankAccountsEntity from "@/app/entities/bankAccounts.entity";

export class UpdateBankAccountsController {
  async handle(req: Request<BankAccountsEntity>, res: Response) {
    const {
      name,
      iban,
      nameBank,
      numberAccount
    } = req.body;
    const { id } = req.params;

    const useCase = container.resolve(UpdateBankAccountsUseCase);

    const index = await useCase.execute({
      id,
      name,
      iban,
      nameBank,
      numberAccount
    } as unknown as BankAccountsEntity);

    return res.status(index.status).json(index.data);
  }
}
