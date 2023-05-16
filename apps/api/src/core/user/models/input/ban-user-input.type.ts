import { BaseUserInput } from "@app/common/models/input/base-user-input.type";
import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsUUID, ValidateIf } from "class-validator";



@ArgsType()
export class BanUserInput extends BaseUserInput {

}