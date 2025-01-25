import { Properties } from "@prisma/client";
import PropertiesEntity from "../entities/properties.entity";

export default abstract class IPropertiesRepository {
  abstract create(props: PropertiesEntity): Promise<Properties>;
  abstract index(): Promise<Properties[]>;
  abstract findBySpecificId(id: string): Promise<Properties>;
  abstract findByField(
    field: keyof PropertiesEntity,
    value: string
  ): Promise<Properties[] | null>;
  abstract delete(id: string): Promise<void>;
  abstract update(
    id: string,
    props?: PropertiesEntity
  ): Promise<Properties | null>;
}
