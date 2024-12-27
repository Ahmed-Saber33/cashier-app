<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/', [ProductController::class, 'index'])->name('Home');
Route::post('product/store', [ProductController::class, 'store'])->name('products.store');
Route::post('product/update', [ProductController::class, 'update'])->name('products.update');
Route::post('product/destroy', [ProductController::class, 'destroy'])->name('products.destroy');
Route::get('product/{product}', [ProductController::class, 'show'])->name('products.show'); // Display the specified category


// Routes for CategoryController
Route::get('categories', [CategoryController::class, 'index'])->name('categories.index'); // Display a listing of categories
Route::post('categories', [CategoryController::class, 'store'])->name('categories.store'); // Store a newly created category
Route::get('categories/{category}', [CategoryController::class, 'show'])->name('categories.show'); // Display the specified category
Route::put('categories/{category}', [CategoryController::class, 'update'])->name('categories.update'); // Update the specified category
Route::delete('categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy'); // Remove the specified category

// Routes for OrderController
Route::get('orders', [OrderController::class, 'index'])->name('orders.index'); // Display a listing of orders
Route::get('orders/create', [OrderController::class, 'create'])->name('orders.create'); // Show the form for creating a new order
Route::post('orders', [OrderController::class, 'store'])->name('orders.store'); // Store a newly created order
Route::get('orders/{order}', [OrderController::class, 'show'])->name('orders.show'); // Display the specified order
Route::get('orders/{order}/edit', [OrderController::class, 'edit'])->name('orders.edit'); // Show the form for editing the specified order
Route::delete('orders/{order}', [OrderController::class, 'destroy'])->name('orders.destroy'); // Remove the specified order

