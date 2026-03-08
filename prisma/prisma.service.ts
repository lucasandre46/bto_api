import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    constructor() {
        super({});
    }

    async onModuleInit() {
        // Agora o TypeScript reconhecerá o $connect
        await this.$connect();
    }
}