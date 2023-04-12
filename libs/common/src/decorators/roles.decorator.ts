import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@prisma/client";

export type TRoles = (keyof typeof UserRole)[] | ["ALL"];

export const Roles = (...roles: TRoles) => SetMetadata('roles', roles);