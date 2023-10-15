<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class funcionariosSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 20) as $index) {
            DB::table('funcionarios')->insert([
                'firstName' => $faker->firstName,
                'lastName' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'phone' => $faker->phoneNumber,
                'department_id' => rand(1, 10), // Assuming there are 10 departments
            ]);
        }
    }
}
