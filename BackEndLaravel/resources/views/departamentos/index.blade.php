<!-- resources/views/departamentos/index.blade.php -->

@extends('layouts.app')

@section('content')
    <h1>Lista de Departamentos</h1>

    <ul>
        @foreach ($departamentos as $departamento)
            <li>{{ $departamento->name }}</li>
        @endforeach
    </ul>
@endsection
