<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class tarefasSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 30) as $index) {
            DB::table('tarefas')->insert([
                'title' => $faker->sentence,
                'description' => $faker->paragraph,
                'assignee_id' => rand(1, 20), // Assuming there are 20 employees
                'due_date' => $faker->dateTimeThisDecade,
            ]);
        }
    }
}
