import IPropertiesRepository from "@/app/repositories/properties.repository";
import ISchedulingRepository from "@/app/repositories/scheduling.repository";
import ISchedulingPhotosRepository from "@/app/repositories/schedulingPhotos.repository";
import IUserRepository from "@/app/repositories/users.repository";
import {
  IPropertiesRepositoryPrismaImpl,
  ISchedulingPhotosRepositoryPrismaImpl,
  ISchedulingRepositoryPrismaImpl,
  IUserRepositoryPrismaImpl,
} from "@/infra";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>(
  "IUserRepositoryPrismaImpl",
  IUserRepositoryPrismaImpl
);

container.registerSingleton<IPropertiesRepository>(
  "IPropertiesRepositoryPrismaImpl",
  IPropertiesRepositoryPrismaImpl
);

container.registerSingleton<ISchedulingPhotosRepository>(
  "ISchedulingPhotosRepositoryPrismaImpl",
  ISchedulingPhotosRepositoryPrismaImpl
);

container.registerSingleton<ISchedulingRepository>(
  "ISchedulingRepositoryPrismaImpl",
  ISchedulingRepositoryPrismaImpl
);
