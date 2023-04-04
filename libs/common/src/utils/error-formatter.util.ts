import { GraphQLError } from "graphql"
import { ValidationError } from 'class-validator';


export const exceptionFactory = (errors: ValidationError[]) => {    
    return new GraphQLError(
        'Validation error',
        {
            extensions: {
                code: 2,
                details: errors.map(err => {
                    return {field: err.property, errors: err.children?.map(e => {
                        return Object.values(e.constraints || {});
                    })}
                })
            },
        }
    )
}