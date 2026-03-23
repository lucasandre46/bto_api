require('dotenv').config();
const axios = require('axios');

async function testBrapi() {
    const token = process.env.BRAPI_TOKEN;
    if (!token) {
        console.error("❌ ERRO: BRAPI_TOKEN não está definido no arquivo .env");
        return;
    }
    
    const symbol = 'PETR4'; // Testando com Petrobras (a API normalmente não precisa de .SA)
    const url = `https://brapi.dev/api/quote/${symbol}?range=5d&interval=1d&token=${token}`;
    
    console.log(`Testando conexão da BRAPI para o ticker: ${symbol}...`);
    console.log(`Token encontrado no .env: ${token.substring(0, 5)}...`);
    
    try {
        const response = await axios.get(url);
        if (response.data && response.data.results) {
            const asset = response.data.results[0];
            console.log("✅ SUCESSO! A API retornou dados corretamente.");
            console.log(`-----------------------------------`);
            console.log(`Empresa: ${asset.longName}`);
            console.log(`Símbolo: ${asset.symbol}`);
            console.log(`Moeda: ${asset.currency}`);
            console.log(`Preço atual: R$ ${asset.regularMarketPrice}`);
            console.log(`Variação: ${asset.regularMarketChangePercent?.toFixed(2)}%`);
            console.log(`-----------------------------------`);
        } else {
            console.warn("⚠️ API respondeu, mas os dados vieram vazios.");
        }
    } catch (e) {
        if (e.response && e.response.data && e.response.data.message) {
             console.error("❌ ERRO DA BRAPI (REJEITADO):", e.response.data.message);
        } else {
             console.error("❌ ERRO AO CONECTAR COM A BRAPI:", e.message);
        }
    }
}

testBrapi();
