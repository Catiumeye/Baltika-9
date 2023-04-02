import { MiddlewareContext, NextFn } from "@nestjs/graphql";



export const AuthMiddleware = (ctx: MiddlewareContext, next: NextFn) => {
    return next()
}