import { BankAccounts } from "@prisma/client";
import BankAccountsEntity from "../entities/bankAccounts.entity";

export default abstract class IBankAccountsRepository {
  abstract create(props: BankAccountsEntity): Promise<BankAccounts>;
  abstract index(): Promise<BankAccounts[]>;
  abstract findBySpecificId(id: string): Promise<BankAccounts>;
  abstract findByField(
    field: keyof BankAccountsEntity,
    value: string
  ): Promise<BankAccounts[] | null>;
  abstract delete(id: string): Promise<void>;
  abstract update(
    id: string,
    props?: BankAccountsEntity
  ): Promise<BankAccounts | null>;
}
