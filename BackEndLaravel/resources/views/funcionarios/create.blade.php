<!-- resources/views/funcionarios/create.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Criar Novo Funcionário</h1>

    <form action="{{ route('funcionarios.store') }}" method="POST">
        @csrf
        <label for="name">Nome do Funcionário:</label>
        <input type="text" name="name" id="name" required>
        
        <label for="departamento_id">Departamento:</label>
        <select name="departamento_id" id="departamento_id" required>
            @foreach ($departamentos as $departamento)
                <option value="{{ $departamento->id }}">{{ $departamento->name }}</option>
            @endforeach
        </select>
        
        <button type="submit">Criar Funcionário</button>
    </form>
@endsection
