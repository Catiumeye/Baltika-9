import { UserService } from '../services/user.service';
import { Args, ID, ResolveField, Resolver } from '@nestjs/graphql';
import { UserMutationType, UserRootResolver } from './user-root.resolver';
import { BanUserInput } from '../models/input/ban-user-input.type';
import { BanUserResult } from '../models/results/ban-user-result.type';
import { RolePermission } from '@app/common/decorators/roles.decorator';
import { UserData } from '@app/common/decorators/user-data.decorator';
import { JwtPayload } from '../../auth/services/token.service';
import { UnbanUserResult } from '../models/results/unban-user-result.type';
import { UnbanUserInput } from '../models/input/unban-user-input.type';
import { DeleteUserResult } from '../models/results/delete-user-result.type';
import { DeleteUserInput } from '../models/input/delete-user-input.type';

@Resolver(UserMutationType)
export class UserMutationResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    @RolePermission(null)
    @ResolveField(() => DeleteUserResult)
    async deleteUser(
        @Args() input: DeleteUserInput,
        @UserData() user: JwtPayload
    ): Promise<DeleteUserResult> {
        return await this.userService.deleteUser(input, user);
    }

    @RolePermission(['MODER', 'ADMIN'])
    @ResolveField(() => BanUserResult)
    async banUser(
        @Args() input: BanUserInput,
        @UserData() user: JwtPayload
    ): Promise<BanUserResult> {
        return await this.userService.banUser(input, user);
    }

    @RolePermission(['MODER', 'ADMIN'])
    @ResolveField(() => UnbanUserResult)
    async unbanUser(
        @Args() input: UnbanUserInput,
        @UserData() user: JwtPayload
    ): Promise<UnbanUserResult> {
        return await this.userService.unbanUser(input, user);
    }
}
