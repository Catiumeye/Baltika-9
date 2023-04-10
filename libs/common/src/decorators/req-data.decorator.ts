import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request } from "express";
import UAParser from 'ua-parser-js'

export interface IReqInfo {
    ip?: string;
    os: {
        name?: string;
        version?: string;
    },
    browser: {
        name?: string,
        major?: string
    },
    device: {
        vendor?: string;
        model?: string;
        type?: string;
    },
    cpu: {
        architecture?: string;
    }
}

export const ReqInfo = createParamDecorator(
    async (params: unknown, ctx: ExecutionContext) => {
        const req: Request = GqlExecutionContext.create(ctx).getContext().req;
        const parser = new UAParser(req.headers["user-agent"])

        const os = parser.getOS();
        const browser = parser.getBrowser();
        const device = parser.getDevice();

        const data: IReqInfo = {
            ip: req.socket.remoteAddress,
            os: os,
            browser: {
                name: browser.name,
                major: browser.version?.split('.')[0]
            },
            device: device,
            cpu: parser.getCPU()
        }
        
        return data;
    }
)