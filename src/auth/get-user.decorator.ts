import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity"; // Adjust the import path as necessary

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Assuming user is attached to the request object by a guard
});