<!-- resources/views/departamentos/edit.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Editar Departamento</h1>

    <form action="{{ route('departamentos.update', $departamento->id) }}" method="POST">
        @csrf
        @method('PUT')
        <label for="name">Nome do Departamento:</label>
        <input type="text" name="name" id="name" value="{{ $departamento->name }}" required>
        <button type="submit">Atualizar Departamento</button>
    </form>
@endsection
