<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tarefa;
use App\Models\Funcionario;

class TarefasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tarefas = Tarefa::all();
        return response()->json($tarefas);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Retrieve all the funcionarios to populate a dropdown for selecting an assignee
        $funcionarios = Funcionario::all();

        // Return the view with the funcionarios data
        return view('tarefas.create', compact('funcionarios'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'assignee_id' => 'required|exists:funcionarios,id',
        ]);

        $tarefa = new Tarefa([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'assignee_id' => $request->input('assignee_id'),
        ]);

        $tarefa->save();

        return response()->json([
            'message' => 'Tarefa criada com sucesso!',
            'data' => $tarefa,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tarefa = Tarefa::find($id);
        if (!$tarefa) {
            return response()->json([
                'message' => 'Tarefa não encontrada',
            ], 404);
        }

        return response()->json($tarefa);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Retrieve the tarefa by ID
        $tarefa = Tarefa::find($id);
        if (!$tarefa) {
            return response()->json([
                'message' => 'Tarefa não encontrada',
            ], 404);
        }

        // Retrieve all the funcionarios to populate a dropdown for selecting an assignee
        $funcionarios = Funcionario::all();

        // Return the view with the tarefa and funcionarios data
        return view('tarefas.edit', compact('tarefa', 'funcionarios'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'assignee_id' => 'required|exists:funcionarios,id',
        ]);

        $tarefa = Tarefa::find($id);
        if (!$tarefa) {
            return response()->json([
                'message' => 'Tarefa não encontrada',
            ], 404);
        }

        $tarefa->title = $request->input('title');
        $tarefa->description = $request->input('description');
        $tarefa->assignee_id = $request->input('assignee_id');
        $tarefa->save();

        return response()->json([
            'message' => 'Tarefa atualizada com sucesso!',
            'data' => $tarefa,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tarefa = Tarefa::find($id);
        if (!$tarefa) {
            return response()->json([
                'message' => 'Tarefa não encontrada',
            ], 404);
        }

        $tarefa->delete();

        return response()->json([
            'message' => 'Tarefa removida com sucesso!',
        ]);
    }
}
