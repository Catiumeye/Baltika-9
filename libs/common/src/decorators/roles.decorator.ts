import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { AuthGuard } from "../guards/auth.guard";
import { RoleGuard } from "../guards/roles.guard";

export type TRoles = (keyof typeof UserRole)[] | null;
export const PermissionConfig = {
    blocked: false,
}

export const RolePermission = (roles: TRoles, config: typeof PermissionConfig = PermissionConfig) => applyDecorators(
    SetMetadata('roles', roles),
    SetMetadata('config', config),
    UseGuards(AuthGuard, RoleGuard)
)
export const Roles = (roles: TRoles) => SetMetadata('roles', roles);