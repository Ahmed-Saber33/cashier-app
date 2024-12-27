<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'Smartphone',
                'image' => 'smartphone.jpg',
                'price' => 699.99,
                'quantity' => 50,
                'category_id' => 1, // Electronics
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'T-shirt',
                'image' => 'tshirt.jpg',
                'price' => 19.99,
                'quantity' => 200,
                'category_id' => 2, // Clothing
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Novel',
                'image' => 'novel.jpg',
                'price' => 14.99,
                'quantity' => 100,
                'category_id' => 3, // Books
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
