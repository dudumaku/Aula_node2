const http = require('http');
const request = require('request');

const PORT = 8080;

const server = http.createServer((req, res) => {
    // Verifica se a solicitação é do tipo GET
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Método não permitido' }));
    }

    // Configuração de cabeçalhos CORS para permitir acesso de qualquer origem
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Fazendo requisição para a API da SWAPI
    request('https://swapi.dev/api/people/1/', (error, response, body) => {
        if (error) {
            console.error('Erro ao acessar a API:', error.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Erro interno do servidor' }));
        }

        // Verifica se a resposta da API foi bem-sucedida
        if (response.statusCode !== 200) {
            res.writeHead(response.statusCode, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: `Erro na API: ${response.statusCode}` }));
        }

        // Se tudo estiver ok, envia os dados da API de volta para o cliente
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(body);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});