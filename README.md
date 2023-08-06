# ProjetoLaravel

O ProjetoLaravel é uma solução completa de gerenciamento de tarefas, departamentos e funcionários, composta por um backend desenvolvido em Laravel e um frontend desenvolvido em React.

## Introdução

Os READMES.md dos outros arquivos já tem um passo a passo que o permitirá saber:
- Configuração do Backend
- Configuração do Frontend
- Execução
- Rotas da API
- Estrutura do Frontend
- Requisitos

### Backend

- PHP 7.4 ou superior
- Composer
- MySQL ou outro banco de dados compatível

### Frontend

- Node.js (versão 12 ou superior)
- npm (Node Package Manager)

## Configuração do Backend

- Clone o repositório do projeto.
- Navegue até o diretório do backend.
- Instale as dependências do projeto usando:

```
composer install
```

Use o arquivo .env baseado no .env.example e configure com as informações do seu banco de dados.
Gere uma chave de aplicação:
```
php artisan key:generate
```

Crie o banco de dados especificado no arquivo .env e execute as migrações na ordem especificada na documentação original.
Após configurar todas as tabelas, execute:

```
php artisan migrate
```

## Configuração do Frontend

- Navegue até o diretório do frontend.
- Instale as dependências do projeto usando:

```
npm install
```
## Execução

Backend:

    - Para iniciar o servidor do backend:

    ```
    php artisan serve
    ```

O servidor estará disponível em http://localhost:8000.

Frontend:

    - Para iniciar a aplicação frontend:

    ```
    npm start
    ```

A aplicação será acessível via http://localhost:3000.

### Rotas da API

Consulte a documentação original do backend para obter uma lista detalhada das rotas da API.

### Estrutura do Frontend

A aplicação React está estruturada em várias pastas principais, incluindo src, components, Common, Departamentos, Funcionarios e Tarefas. O ponto de entrada principal é index.js.

## Contribuição

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de submeter qualquer alteração.