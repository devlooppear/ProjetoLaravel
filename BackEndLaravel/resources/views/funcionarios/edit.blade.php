<!-- resources/views/funcionarios/edit.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Editar Funcionário</h1>

    <form action="{{ route('funcionarios.update', $funcionario->id) }}" method="POST">
        @csrf
        @method('PUT')
        <label for="name">Nome do Funcionário:</label>
        <input type="text" name="name" id="name" value="{{ $funcionario->name }}" required>
        
        <label for="departamento_id">Departamento:</label>
        <select name="departamento_id" id="departamento_id" required>
            @foreach ($departamentos as $departamento)
                <option value="{{ $departamento->id }}" @if ($departamento->id === $funcionario->departamento_id) selected @endif>{{ $departamento->name }}</option>
            @endforeach
        </select>
        
        <button type="submit">Atualizar Funcionário</button>
    </form>
@endsection
