<!-- resources/views/funcionarios/index.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Lista de Funcionários</h1>

    <ul>
        @foreach ($funcionarios as $funcionario)
            <li>{{ $funcionario->name }} - Departamento: {{ $funcionario->departamento->name }}</li>
        @endforeach
    </ul>
@endsection
