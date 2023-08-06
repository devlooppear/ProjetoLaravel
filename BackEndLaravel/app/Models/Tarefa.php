<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarefa extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'assignee_id']; // Adicione os campos que podem ser preenchidos em massa

    public function assignee()
    {
        return $this->belongsTo(Funcionario::class, 'assignee_id'); // Estabelece o relacionamento: Uma tarefa pertence a um funcionário (assignee_id é a chave estrangeira)
    }
}
