import { BankAccounts, PrismaClient } from "@prisma/client";
import IBankAccountsRepository from "@/app/repositories/bankAccounts.repository";
import BankAccountsEntity from "@/app/entities/bankAccounts.entity";

export class IBankAccountsRepositoriesPrismaImpl implements IBankAccountsRepository {
  constructor(private _prisma = new PrismaClient()) { }

  async findByField(
    field: keyof BankAccountsEntity,
    value: string
  ): Promise<BankAccounts[] | null> {
    return this._prisma.bankAccounts.findMany({
      where: {
        [field]: value,
      },
    });
  }

  index(): Promise<BankAccounts[]> {
    return this._prisma.bankAccounts.findMany({});
  }

  async findBySpecificId(id: string): Promise<BankAccounts> {
    return this._prisma.bankAccounts.findUnique({
      where: { id },
    });
  }

  async create(props: BankAccountsEntity): Promise<BankAccounts> {
    return this._prisma.bankAccounts.create({ data: props });
  }

  async delete(id: string): Promise<void> {
    await this._prisma.bankAccounts.delete({ where: { id } });
  }

  async update(
    id: string,
    props?: BankAccountsEntity
  ): Promise<BankAccounts | null> {
    return this._prisma.bankAccounts.update({ where: { id }, data: props });
  }

}
