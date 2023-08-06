# Instruções para Configuração e Execução do Projeto

Requisitos:
- PHP 7.4 ou superior
- Composer
- MySQL ou outro banco de dados compatível

## Configuração do Ambiente

- Clone o repositório do projeto

- Navegue até o diretório do projeto

- Instale as dependências do projeto com o Composer

```
composer install
```
Crie um arquivo .env baseado no arquivo .env.example:

Configure o arquivo .env com as informações do seu banco de dados (Lembre de ter acionado o Apache e MySQL dentro do XAMPP, WAMPP ou LAMPP):

DB_CONNECTION=mysql
DB_HOST=seu-host
DB_PORT=sua-porta
DB_DATABASE=seu-banco-de-dados
DB_USERNAME=seu-usuario
DB_PASSWORD=sua-senha
Gere uma nova chave de aplicação:

```
php artisan key:generate
```

Crie o banco de dados especificado no arquivo .env (Pode ser "DBLaravel", por exemplo).

## Migrações do Banco de Dados
Para criar as tabelas do banco de dados, execute as migrações na seguinte ordem (!É necessário realizar nessa ordem, pois há Bancos de Dados com Chaves Estrangeiras que depende da criação um do outro!!):

1º Departamentos:

```
php artisan migrate --path=database/migrations/2023_07_31_205557_create_departamentos_table.php
```

2º Funcionários:

```
php artisan migrate --path=database/migrations/2023_07_31_205537_create_funcionarios_table.php
```

3º Tarefas:

```
php artisan migrate --path=database/migrations/2023_07_31_205603_create_tarefas_table.php
```

Depois:

```
php artisan migrate
```

# BackendLaravel

Este documento fornece um guia passo a passo sobre como configurar e executar o projeto Laravel em seu ambiente local. Siga as instruções abaixo para garantir uma implementação bem-sucedida.

## Executar o Servidor
Para executar o servidor localmente, use o seguinte comando:

```
php artisan serve
```

O servidor será iniciado e estará disponível em http://localhost:8000.

## Rotas da API

- Departamentos:
    
    - GET /api/departamentos: Retorna todos os departamentos cadastrados.

    - GET /api/departamentos/{id}: Retorna um departamento específico com base no ID fornecido.

    - POST /api/departamentos: Cria um novo departamento. Deve enviar um JSON contendo o nome do departamento.

    - PUT /api/departamentos/{id}: Atualiza as informações de um departamento existente com base no ID fornecido. Deve enviar um JSON contendo o novo nome do departamento.

    - DELETE /api/departamentos/{id}: Exclui um departamento específico com base no ID fornecido.

- Funcionários:

    - GET /api/funcionarios: Retorna todos os funcionários cadastrados.

    - GET /api/funcionarios/{id}: Retorna um funcionário específico com base no ID fornecido.

    - POST /api/funcionarios: Cria um novo funcionário. Deve enviar um JSON contendo o nome, e-mail e o ID do departamento a que pertence.

    - PUT /api/funcionarios/{id}: Atualiza as informações de um funcionário existente com base no ID fornecido. Deve enviar um JSON contendo o novo nome, novo e-mail e/ou novo ID do departamento.

    - DELETE /api/funcionarios/{id}: Exclui um funcionário específico com base no ID fornecido.

- Tarefas:

    - GET /api/tarefas: Retorna todas as tarefas cadastradas.

    - GET /api/tarefas/{id}: Retorna uma tarefa específica com base no ID fornecido.

    - POST /api/tarefas: Cria uma nova tarefa. Deve enviar um JSON contendo a descrição da tarefa e o ID do funcionário a quem ela está atribuída.

    - PUT /api/tarefas/{id}: Atualiza as informações de uma tarefa existente com base no ID fornecido. Deve enviar um JSON contendo a nova descrição e/ou novo ID do funcionário a quem ela está atribuída.

    - DELETE /api/tarefas/{id}: Exclui uma tarefa específica com base no ID fornecido.

## Observações

Este projeto foi criado usando o framework Laravel e contém rotas e migrações para gerenciar Departamentos, Funcionários e Tarefas.

Lembre-se de sempre atualizar o arquivo .env com as configurações corretas do seu ambiente local. Caso encontre algum problema, verifique se os requisitos estão devidamente instalados e se as migrações foram executadas corretamente.
