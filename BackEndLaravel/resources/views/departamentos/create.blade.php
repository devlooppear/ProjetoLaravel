<!-- resources/views/departamentos/create.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Criar Novo Departamento</h1>

    <form action="{{ route('departamentos.store') }}" method="POST">
        @csrf
        <label for="name">Nome do Departamento:</label>
        <input type="text" name="name" id="name" required>
        <button type="submit">Criar Departamento</button>
    </form>
@endsection
