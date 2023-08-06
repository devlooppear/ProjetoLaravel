<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Funcionario;

class FuncionariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $funcionarios = Funcionario::all();
        return response()->json($funcionarios);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // This method shows the form for creating a new funcionario (optional).
        // You can include a view or return any necessary data.
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string', // Adicionando a validação para o lastName
            'email' => 'required|string|email',
            'phone' => 'nullable|string', // Adicionando a validação para o campo phone (pode ser uma string ou null)
            'department_id' => 'required|exists:departamentos,id',
        ]);

        $funcionario = new Funcionario([
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'), // Adicionando o lastName
            'email' => $request->input('email'),
            'phone' => $request->input('phone'), // Adicionando o campo phone
            'department_id' => $request->input('department_id'),
        ]);

        $funcionario->save();

        return response()->json([
            'message' => 'Funcionário criado com sucesso!',
            'data' => $funcionario,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $funcionario = Funcionario::find($id);
        if (!$funcionario) {
            return response()->json([
                'message' => 'Funcionário não encontrado',
            ], 404);
        }

        return response()->json($funcionario);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // This method shows the form for editing the specified funcionario (optional).
        // You can include a view or return any necessary data.
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string', // Adicionando a validação para o lastName
            'email' => 'required|string|email',
            'phone' => 'nullable|string', // Adicionando a validação para o campo phone (pode ser uma string ou null)
            'department_id' => 'required|exists:departamentos,id',
        ]);

        $funcionario = Funcionario::find($id);
        if (!$funcionario) {
            return response()->json([
                'message' => 'Funcionário não encontrado',
            ], 404);
        }

        $funcionario->firstName = $request->input('firstName');
        $funcionario->lastName = $request->input('lastName'); // Adicionando o lastName
        $funcionario->email = $request->input('email');
        $funcionario->phone = $request->input('phone'); // Adicionando o campo phone
        $funcionario->department_id = $request->input('department_id');
        $funcionario->save();

        return response()->json([
            'message' => 'Funcionário atualizado com sucesso!',
            'data' => $funcionario,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $funcionario = Funcionario::find($id);
        if (!$funcionario) {
            return response()->json([
                'message' => 'Funcionário não encontrado',
            ], 404);
        }

        $funcionario->delete();

        return response()->json([
            'message' => 'Funcionário removido com sucesso!',
        ]);
    }
}
