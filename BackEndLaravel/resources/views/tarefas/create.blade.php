<!-- resources/views/tarefas/create.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Criar Nova Tarefa</h1>

    <form action="{{ route('tarefas.store') }}" method="POST">
        @csrf
        <label for="titulo">Título da Tarefa:</label>
        <input type="text" name="titulo" id="titulo" required>
        
        <label for="descricao">Descrição:</label>
        <textarea name="descricao" id="descricao" required></textarea>
        
        <label for="funcionario_id">Funcionário:</label>
        <select name="funcionario_id" id="funcionario_id" required>
            @foreach ($funcionarios as $funcionario)
                <option value="{{ $funcionario->id }}">{{ $funcionario->name }}</option>
            @endforeach
        </select>
        
        <button type="submit">Criar Tarefa</button>
    </form>
@endsection
