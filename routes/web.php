<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PostController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;

Route::middleware(['guest'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Auth/Login');
    })->name('login');
});

Route::get('/posts/add', [PostController::class, 'create'])->name('posts.add');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/products/add', [ProfileController::class, 'add'])->name('post.add');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/customers/add', [CustomerController::class, 'add'])->name('index');
    Route::post('/customer/submit', [CustomerController::class, 'create'])->name('create');
    Route::get('/customers/show', [CustomerController::class, 'index']) -> name('customer.show');
    Route::get('/customer/edit/{id}', [CustomerController::class, 'edit']);
    // Route::post('/customer/update', [CustomerController::class, 'update']);
    Route::get('/delete/{id}', [CustomerController::class, 'destroy']);

Route::get('/customers/{customer}/edit', [CustomerController::class, 'edit'])->name('customers.edit');
Route::put('/customers/{id}', [CustomerController::class, 'update'])->name('customers.update');
Route::delete('/customers/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');

});



Route::middleware(['auth'])->group(function () {
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/categories/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/brands/add', [BrandController::class, 'index'])->name('index');
    Route::post('/brands/submit', [BrandController::class, 'create'])->name('create');
    Route::get('/brands/show', [BrandController::class, 'show']) -> name('brands.show');
    Route::get('/brands/edit/{id}', [BrandController::class, 'edit']);
    Route::post('/brands/update', [BrandController::class, 'update'])->name('brands.update');
    Route::get('/delete/{id}', [BrandController::class, 'destroy']);
});

require __DIR__.'/auth.php';
