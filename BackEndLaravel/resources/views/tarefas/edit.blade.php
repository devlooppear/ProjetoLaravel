<!-- resources/views/tarefas/edit.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Editar Tarefa</h1>

    <form action="{{ route('tarefas.update', $tarefa->id) }}" method="POST">
        @csrf
        @method('PUT')
        <label for="titulo">Título da Tarefa:</label>
        <input type="text" name="titulo" id="titulo" value="{{ $tarefa->titulo }}" required>
        
        <label for="descricao">Descrição:</label>
        <textarea name="descricao" id="descricao" required>{{ $tarefa->descricao }}</textarea>
        
        <label for="funcionario_id">Funcionário:</label>
        <select name="funcionario_id" id="funcionario_id" required>
            @foreach ($funcionarios as $funcionario)
                <option value="{{ $funcionario->id }}" @if ($funcionario->id === $tarefa->funcionario_id) selected @endif>{{ $funcionario->name }}</option>
            @endforeach
        </select>
        
        <button type="submit">Atualizar Tarefa</button>
    </form>
@endsection
