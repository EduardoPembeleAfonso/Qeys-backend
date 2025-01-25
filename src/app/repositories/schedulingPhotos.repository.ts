import { SchedulingPhotos } from "@prisma/client";
import SchedulingPhotosEntity from "../entities/schedulingPhotos.entity";

export default abstract class ISchedulingPhotosRepository {
  abstract create(props: SchedulingPhotosEntity): Promise<SchedulingPhotos>;
  abstract index(): Promise<SchedulingPhotos[]>;
  abstract findBySpecificId(id: string): Promise<SchedulingPhotos>;
  abstract findByField(
    field: keyof SchedulingPhotosEntity,
    value: string
  ): Promise<SchedulingPhotos[] | null>;
  abstract delete(id: string): Promise<void>;
  abstract update(
    id: string,
    props?: SchedulingPhotosEntity
  ): Promise<SchedulingPhotos | null>;
}
