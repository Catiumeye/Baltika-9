import { BaseUserInput } from "@app/common/models/input/base-user-input.type";
import { ArgsType } from "@nestjs/graphql";


@ArgsType()
export class UnbanUserInput extends BaseUserInput {
}