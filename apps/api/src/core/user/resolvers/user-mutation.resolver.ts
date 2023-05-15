import { UserService } from '../services/user.service';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { UserMutationType, UserRootResolver } from './user-root.resolver';
import { BanUserInput } from '../models/input/ban-user-input.type';
import { BanUserResult } from '../models/results/ban-user-result.type';
import { RolePermission } from '@app/common/decorators/roles.decorator';

@Resolver(UserMutationType)
export class UserMutationResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    // @ResolveField(() => User)
    // async deleteUser(
    //     @Args('id') id: string
    // ): Promise<number> {
    //     console.log(id);
        
    //     return 0;
    // }

    @RolePermission(['MODER', 'ADMIN'], { blocked: false })
    @ResolveField(() => BanUserResult)
    async banUser(
        @Args() input: BanUserInput
    ): Promise<BanUserResult> {
        return await this.userService.banUser(input);
    }
}
