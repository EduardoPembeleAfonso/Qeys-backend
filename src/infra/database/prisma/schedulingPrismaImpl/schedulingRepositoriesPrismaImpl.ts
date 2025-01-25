import { PrismaClient, Scheduling } from "@prisma/client";
import ISchedulingRepository from "@/app/repositories/scheduling.repository";
import SchedulingEntity from "@/app/entities/scheduling.entity";

export class ISchedulingRepositoryPrismaImpl
  implements ISchedulingRepository {
  constructor(private _prisma = new PrismaClient()) { }

  async findByField(
    field: keyof SchedulingEntity,
    value: string
  ): Promise<Scheduling[] | null> {
    return this._prisma.scheduling.findMany({
      where: {
        [field]: value,
      },
      include: { properties: true }
    });
  }

  index(): Promise<Scheduling[]> {
    return this._prisma.scheduling.findMany({ include: { properties: true } });
  }

  async findBySpecificId(id: string): Promise<Scheduling> {
    return this._prisma.scheduling.findUnique({
      where: { id },
    });
  }

  async create(props: SchedulingEntity): Promise<Scheduling> {
    return this._prisma.scheduling.create({ data: props });
  }

  async delete(id: string): Promise<void> {
    await this._prisma.schedulingPhotos.delete({ where: { id } });
  }

  async update(
    id: string,
    props?: SchedulingEntity
  ): Promise<Scheduling | null> {
    return this._prisma.scheduling.update({ where: { id }, data: props });
  }
}
