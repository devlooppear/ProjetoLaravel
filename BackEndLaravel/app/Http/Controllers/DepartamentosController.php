<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Departamento;

class DepartamentosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departamentos = Departamento::all();
        return response()->json($departamentos);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // This method is optional and can be left empty.
        // You can create a view to display a form for creating a new departamento.
        // For example, you can have a Blade view named "create.blade.php" with the form.
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:departamentos',
        ]);

        $departamento = new Departamento([
            'name' => $request->input('name'),
        ]);

        $departamento->save();

        return response()->json([
            'message' => 'Departamento criado com sucesso!',
            'data' => $departamento,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $departamento = Departamento::find($id);
        if (!$departamento) {
            return response()->json([
                'message' => 'Departamento não encontrado',
            ], 404);
        }

        return response()->json($departamento);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // This method is optional and can be left empty.
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                Rule::unique('departamentos')->ignore($id),
            ],
        ]);

        $departamento = Departamento::find($id);
        if (!$departamento) {
            return response()->json([
                'message' => 'Departamento não encontrado',
            ], 404);
        }

        $departamento->name = $request->input('name');
        $departamento->save();

        return response()->json([
            'message' => 'Departamento atualizado com sucesso!',
            'data' => $departamento,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $departamento = Departamento::find($id);
        if (!$departamento) {
            return response()->json([
                'message' => 'Departamento não encontrado',
            ], 404);
        }

        $departamento->delete();

        return response()->json([
            'message' => 'Departamento removido com sucesso!',
        ]);
    }
}
