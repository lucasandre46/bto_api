require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function main() {
    console.log('--- TESTANDO CONEXÃO COM O BANCO ---');
    for (const type of ['DATABASE_URL', 'DIRECT_URL']) {
        console.log(`\nTestando ${type}...`);
        const url = process.env[type];
        if (!url) {
            console.error(`❌ ERRO: A variável ${type} não está definida no .env!`);
            continue;
        }
        const prisma = new PrismaClient({ datasources: { db: { url } } });
        try {
            await prisma.$connect();
            console.log(`✅ SUCESSO! A aplicação conseguiu se conectar ao Supabase usando a string de ${type}.`);
        } catch (e) {
            console.error(`❌ FALHA AO CONECTAR (${type}):`, e.message);
        } finally {
            await prisma.$disconnect();
        }
    }
}
main();
