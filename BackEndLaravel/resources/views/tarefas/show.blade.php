<!-- resources/views/tarefas/show.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Detalhes da Tarefa</h1>

    <p><strong>ID:</strong> {{ $tarefa->id }}</p>
    <p><strong>Título:</strong> {{ $tarefa->titulo }}</p>
    <p><strong>Descrição:</strong> {{ $tarefa->descricao }}</p>
    <p><strong>Funcionário:</strong> {{ $tarefa->funcionario->name }}</p>
    <p><strong>Departamento:</strong> {{ $tarefa->funcionario->departamento->name }}</p>

    <a href="{{ route('tarefas.edit', $tarefa->id) }}">Editar</a>

    <form action="{{ route('tarefas.destroy', $tarefa->id) }}" method="POST">
        @csrf
        @method('DELETE')
        <button type="submit">Excluir</button>
    </form>
@endsection
