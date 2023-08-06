<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FuncionariosController;
use App\Http\Controllers\DepartamentosController;
use App\Http\Controllers\TarefasController;

// Rotas para funcionários
Route::resource('funcionarios', FuncionariosController::class);

// Rotas para departamentos
Route::resource('departamentos', DepartamentosController::class);

// Rotas para tarefas
Route::resource('tarefas', TarefasController::class);
