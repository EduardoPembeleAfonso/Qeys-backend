import { Prisma, PrismaClient, User } from "@prisma/client";
import IUserRepository from "../../../../app/repositories/users.repository";
import UsersEntity from "@/app/entities/users.entity";

export class IUserRepositoryPrismaImpl implements IUserRepository {
  constructor(private _prisma = new PrismaClient()) { }

  async findByField(
    field: keyof UsersEntity,
    value: string
  ): Promise<User | null> {
    const filter: Prisma.UserWhereInput = {
      [field]: value,
    };
    const data = await this._prisma.user.findUnique({
      where: filter as Prisma.UserWhereUniqueInput,
    });
    if (!data) {
      return null;
    }
    return data;
  }

  index(id: string): Promise<User[]> {
    return this._prisma.user.findMany({
      where: {
        NOT: {
          id: id,
        },
      },
    });
  }

  async findBySpecificId(id: string): Promise<User> {
    return this._prisma.user.findUnique({
      where: { id },
    });
  }

  async create(props: UsersEntity): Promise<User> {
    return this._prisma.user.create({ data: props });
  }

  async delete(id: string): Promise<void> {
    await this._prisma.user.delete({ where: { id } });
  }
  async update(id: string, props?: UsersEntity): Promise<User | null> {
    return this._prisma.user.update({ where: { id }, data: props });
  }
}
