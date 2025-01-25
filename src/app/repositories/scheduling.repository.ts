import { Scheduling } from "@prisma/client";
import SchedulingEntity from "../entities/scheduling.entity";

export default abstract class ISchedulingRepository {
  abstract create(props: SchedulingEntity): Promise<Scheduling>;
  abstract index(): Promise<Scheduling[]>;
  abstract findBySpecificId(id: string): Promise<Scheduling>;
  abstract findByField(
    field: keyof SchedulingEntity,
    value: string
  ): Promise<Scheduling[] | null>;
  abstract delete(id: string): Promise<void>;
  abstract update(
    id: string,
    props?: SchedulingEntity
  ): Promise<Scheduling | null>;
}
