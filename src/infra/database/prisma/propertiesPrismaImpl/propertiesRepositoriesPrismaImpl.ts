import { Prisma, PrismaClient, Properties } from "@prisma/client";
import IPropertiesRepository from "@/app/repositories/properties.repository";
import PropertiesEntity from "@/app/entities/properties.entity";

export class IPropertiesRepositoryPrismaImpl implements IPropertiesRepository {
  constructor(private _prisma = new PrismaClient()) {}

  async findByField(
    field: keyof PropertiesEntity,
    value: string
  ): Promise<Properties[] | null> {
    return this._prisma.properties.findMany({
      where: {
        [field]: value,
      },
    });
  }

  index(): Promise<Properties[]> {
    return this._prisma.properties.findMany({ include: { user: true } });
  }

  async findBySpecificId(id: string): Promise<Properties> {
    return this._prisma.properties.findUnique({
      where: { id },
    });
  }

  async create(props: PropertiesEntity): Promise<Properties> {
    return this._prisma.properties.create({ data: props });
  }

  async delete(id: string): Promise<void> {
    await this._prisma.properties.delete({ where: { id } });
  }

  async update(
    id: string,
    props?: PropertiesEntity
  ): Promise<Properties | null> {
    return this._prisma.properties.update({ where: { id }, data: props });
  }

}
