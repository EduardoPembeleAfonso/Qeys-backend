import { PrismaClient, SchedulingPhotos } from "@prisma/client";
import ISchedulingPhotosRepository from "@/app/repositories/schedulingPhotos.repository";
import SchedulingPhotosEntity from "@/app/entities/schedulingPhotos.entity";

export class ISchedulingPhotosRepositoryPrismaImpl
  implements ISchedulingPhotosRepository
{
  constructor(private _prisma = new PrismaClient()) {}

  async findByField(
    field: keyof SchedulingPhotosEntity,
    value: string
  ): Promise<SchedulingPhotos[] | null> {
    return this._prisma.schedulingPhotos.findMany({
      where: {
        [field]: value,
      },
    });
  }

  index(): Promise<SchedulingPhotos[]> {
    return this._prisma.schedulingPhotos.findMany({});
  }

  async findBySpecificId(id: string): Promise<SchedulingPhotos> {
    return this._prisma.schedulingPhotos.findUnique({
      where: { id },
    });
  }

  async create(props: SchedulingPhotosEntity): Promise<SchedulingPhotos> {
    return this._prisma.schedulingPhotos.create({ data: props });
  }

  async delete(id: string): Promise<void> {
    await this._prisma.schedulingPhotos.delete({ where: { id } });
  }

  async update(
    id: string,
    props?: SchedulingPhotos
  ): Promise<SchedulingPhotos | null> {
    return this._prisma.schedulingPhotos.update({ where: { id }, data: props });
  }
}
