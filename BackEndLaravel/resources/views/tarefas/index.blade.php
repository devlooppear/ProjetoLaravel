<!-- resources/views/tarefas/index.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Lista de Tarefas</h1>

    <ul>
        @foreach ($tarefas as $tarefa)
            <li>
                Título: {{ $tarefa->titulo }} <br>
                Descrição: {{ $tarefa->descricao }} <br>
                Funcionário: {{ $tarefa->funcionario->name }} (Departamento: {{ $tarefa->funcionario->departamento->name }})
            </li>
        @endforeach
    </ul>
@endsection
