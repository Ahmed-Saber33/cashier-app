<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Soups', 'image' => 'electronics.jpg', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Pasta', 'image' => 'clothing.jpg', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Burgers', 'image' => 'books.jpg', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
