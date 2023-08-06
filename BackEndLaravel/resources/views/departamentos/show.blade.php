<!-- resources/views/departamentos/show.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Detalhes do Departamento</h1>

    <p><strong>ID:</strong> {{ $departamento->id }}</p>
    <p><strong>Nome:</strong> {{ $departamento->name }}</p>

    <a href="{{ route('departamentos.edit', $departamento->id) }}">Editar</a>

    <form action="{{ route('departamentos.destroy', $departamento->id) }}" method="POST">
        @csrf
        @method('DELETE')
        <button type="submit">Excluir</button>
    </form>
@endsection
