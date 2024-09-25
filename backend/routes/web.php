<?php

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
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProductController;


Route::get('/', function () {
    return view('welcome');
});
Route::get('/admin/login', [AuthController::class, 'login'])->name('admin.login');
Route::get('/config/index', [ConfigController::class, 'index']);
// category
Route::get('/category/index', [CategoryController::class, 'index']);
Route::post('/category/store', [CategoryController::class, 'store']);
Route::get('/category/trash', [CategoryController::class, 'trash']);
Route::get('/category/show/{id}', [CategoryController::class, 'show']);
Route::post('/category/update/{id}', [CategoryController::class, 'update']);
Route::delete('/category/destroy/{id}', [CategoryController::class, 'destroy']);
// brand
Route::get('/brand/index', [BrandController::class, 'index']);
Route::post('brand/store', [BrandController::class, 'store']);
Route::get('/brand/show/{id}', [BrandController::class, 'show']);
Route::delete('/brand/destroy/{id}', [BrandController::class, 'destroy']);
Route::post('brand/update/{id}', [BrandController::class, 'update']);
//product
Route::get('product/index', [ProductController::class, 'index']);
Route::post('product/store', [ProductController::class, 'store']);
Route::get('product/show/{id}', [ProductController::class, 'show']);
Route::delete('product/destroy/{id}', [ProductController::class, 'destroy']);
Route::post('product/update/{id}', [ProductController::class, 'update']);
