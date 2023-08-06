<!-- resources/views/funcionarios/show.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Detalhes do Funcionário</h1>

    <p><strong>ID:</strong> {{ $funcionario->id }}</p>
    <p><strong>Nome:</strong> {{ $funcionario->name }}</p>
    <p><strong>Departamento:</strong> {{ $funcionario->departamento->name }}</p>

    <a href="{{ route('funcionarios.edit', $funcionario->id) }}">Editar</a>

    <form action="{{ route('funcionarios.destroy', $funcionario->id) }}" method="POST">
        @csrf
        @method('DELETE')
        <button type="submit">Excluir</button>
    </form>
@endsection
