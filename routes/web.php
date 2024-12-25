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
    return Inertia::render('Home', [
        'message' => 'Welcome to Inertia.js!',
    ]);
});

Route::get('/', [ProductController::class, 'index'])->name('Home');
Route::resource('products', ProductController::class);

Route::resource('categories', CategoryController::class);

Route::resource('orders', OrderController::class);

