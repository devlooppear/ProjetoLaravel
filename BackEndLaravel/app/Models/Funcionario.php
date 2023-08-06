<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    use HasFactory;

    protected $fillable = ['firstName', 'lastName', 'email', 'phone', 'department_id']; // Adicione os campos que podem ser preenchidos em massa

    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'department_id'); // Estabelece o relacionamento: Um funcionário pertence a um departamento
    }
}
