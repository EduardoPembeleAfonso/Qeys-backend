import { Request, Response } from "express";
import { container } from "tsyringe";
import BankAccountsEntity from "@/app/entities/bankAccounts.entity";
import CreateBankAccountsUseCase from "@/app/useCases/bankAccounts/createBankAccountsUseCase";

export class CreateBankAccountsController {
  async handle(req: Request<BankAccountsEntity>, res: Response) {
    const {
      name,
      iban,
      nameBank,
      numberAccount
    } = req.body;
    const { userId } = req.params;


    const useCase = container.resolve(CreateBankAccountsUseCase);

    const index = await useCase.execute({
      name,
      iban,
      nameBank,
      numberAccount,
      userId,
    } as unknown as BankAccountsEntity);



    return res.status(index.status).json(index.data);
  }
}
