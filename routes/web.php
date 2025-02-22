<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\BackupController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;

Route::middleware(['guest'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Auth/Login');
    })->name('login');
});

Route::get('/posts/add', [PostController::class, 'create'])->name('posts.add');


Route::get('/dashboard', [AdminController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/products/add', [ProfileController::class, 'add'])->name('post.add');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::middleware('auth')->group(function () {
    Route::get('/customers/add', [CustomerController::class, 'index'])->name('index');
    Route::post('/customer/submit', [CustomerController::class, 'create'])->name('create');
    Route::get('/customers/show', [CustomerController::class, 'show']) -> name('customer.show');
    Route::get('/customer/edit/{id}', [CustomerController::class, 'edit']);
    Route::post('/customer/update', [CustomerController::class, 'update']);
    Route::get('/delete/{id}', [CustomerController::class, 'destroy']);

    Route::get('/customerlist', [CustomerController::class, 'customerList']);

});



Route::middleware('auth')->group(function () {
    Route::get('/categories/add', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/category/store', [CategoryController::class, 'store'])->name('category.store');
    Route::get('/categories/show', [CategoryController::class, 'show']);
    Route::get('/category/edit/{id}', [CategoryController::class, 'edit'])->name('category.edit');
    Route::post('/category/update', [CategoryController::class, 'update'])->name('category.update');
    Route::get('/delete/category/{id}', [CategoryController::class, 'destroy']);

});

Route::middleware('auth')->group(function () {
    Route::get('/brands/add', [BrandController::class, 'index'])->name('index');
    Route::post('/brands/submit', [BrandController::class, 'create'])->name('create');
    Route::get('/brands/show', [BrandController::class, 'show']) ->name('brands.show');
    Route::get('/brands/edit/{id}', [BrandController::class, 'edit']);
    Route::post('/brands/update', [BrandController::class, 'update'])->name('brands.update');
    Route::delete('/delete/{id}', [BrandController::class, 'destroy']);
});


Route::middleware('auth')->group(function () {
    Route::get('/products/show', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products/store', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/edit/{id}', [ProductController::class, 'edit']);
    // Route::post('/products/update/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::post('/products/{id}', [ProductController::class, 'update'])->name('products.update');

    Route::delete('/products/delete/{id}', [ProductController::class, 'destroy']);

    //for product list in use invoice
Route::get('/productlist', [ProductController::class, 'ProductList']);


Route::get('/sales/add', [InvoiceController::class, 'saleIndex']);
Route::get('/sales/show', [InvoiceController::class, 'index'])->name('sales.index');
Route::post('/invoices', [InvoiceController::class, 'submitInvoice'])->name('submitInvoice');

// Route::get('/backup', [BackupController::class, 'createBackup'])->name('backup.create');
Route::get('/backup/download', [BackupController::class, 'createBackup'])->name('backup.download');


    });

    Route::group(['middleware' => ['auth']], function() {
        Route::get('/user', [UserController::class, 'create'])->name('users.create');
        Route::get('/show', [UserController::class, 'index'])->name('users.index');
        Route::resource('users', UserController::class)->except(['create', 'index']);
        Route::get('users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('users/{id}', [UserController::class, 'update'])->name('users.update');
        Route::delete('users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

          });

require __DIR__.'/auth.php';
