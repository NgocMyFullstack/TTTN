<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderdetailController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\CustomerController;





/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::prefix('banner')->group(function () {
    Route::get('index', [BannerController::class, 'index']);
    Route::get('show/{id}', [BannerController::class, 'show']);
    Route::post('store', [BannerController::class, 'store']);
    Route::post('update/{id}', [BannerController::class, 'update']);
    Route::delete('destroy/{id}', [BannerController::class, 'destroy']);
    Route::get('status/{id}', [BrandController::class, 'status']);
});
Route::prefix('brand')->group(function () {
    Route::get('index', [BrandController::class, 'index']);
    Route::get('show/{id}', [BrandController::class, 'show']);
    Route::get('status/{id}', [BrandController::class, 'status']);
    Route::post('store', [BrandController::class, 'store']);
    Route::post('update/{id}', [BrandController::class, 'update']);
    Route::delete('destroy/{id}', [BrandController::class, 'destroy']);
});
Route::prefix('category')->group(function () {
    Route::get('index', [CategoryController::class, 'index']);
    Route::get('show/{id}', [CategoryController::class, 'show']);
    Route::post('store', [CategoryController::class, 'store']);
    Route::post('update/{id}', [CategoryController::class, 'update']);
    Route::delete('destroy/{id}', [CategoryController::class, 'destroy']);
});
Route::prefix('contact')->group(function () {
    Route::get('index', [ContactController::class, 'index']);
    Route::get('show/{id}', [ContactController::class, 'show']);
    Route::post('store', [ContactController::class, 'store']);
    Route::post('postreply/{id}', [ContactController::class, 'postreply']);
    Route::delete('destroy/{id}', [ContactController::class, 'destroy']);
    Route::get('status/{id}', [ContactController::class, 'status']);
});

Route::prefix('customer')->group(function () {
    Route::get('index', [CustomerController::class, 'index']);
    Route::get('show/{id}', [CustomerController::class, 'show']);
    Route::post('store', [CustomerController::class, 'store']);
    Route::post('update/{id}', [CustomerController::class, 'update']);
    Route::delete('destroy/{id}', [CustomerController::class, 'destroy']);
    Route::get('status/{id}', [CustomerController::class, 'status']);
    Route::put('delete/{id}', [CustomerController::class, 'delete']);
    Route::get('thungrac', [CustomerController::class, 'thungrac']);
});

Route::prefix('menu')->group(function () {

    Route::get('index', [MenuController::class, 'index']);
    Route::get('getAllMenus', [MenuController::class, 'getAllMenus']);
    Route::get('show/{id}', [MenuController::class, 'show']);
    Route::get('thungrac', [MenuController::class, 'thungrac']);
    Route::post('store', [MenuController::class, 'store']);
    Route::post('update/{id}', [MenuController::class, 'update']);
    Route::delete('destroy/{id}', [MenuController::class, 'destroy']);
    Route::get('status/{id}', [MenuController::class, 'status']);
    Route::put('delete/{id}', [MenuController::class, 'delete']);
    Route::get('thungrac', [MenuController::class, 'thungrac']);
});
Route::prefix('order')->group(function () {
    Route::get('index/{status}', [OrderController::class, 'index']);
    Route::get('thungrac', [OrderController::class, 'thungrac']);
    Route::get('show/{id}', [OrderController::class, 'show']);
    Route::post('store', [OrderController::class, 'store']);
    Route::post('update/{id}', [OrderController::class, 'update']);
    Route::put('delete/{id}', [OrderController::class, 'delete']);
    Route::delete('destroy/{id}', [OrderController::class, 'destroy']);
    Route::get('status/{id}', [OrderController::class, 'status']);
});
Route::prefix('orderdetail')->group(function () {
    Route::get('index', [OrderdetailController::class, 'index']);
    Route::get('show/{id}', [OrderdetailController::class, 'show']);
    Route::post('store', [OrderdetailController::class, 'store']);
    Route::post('update/{id}', [OrderdetailController::class, 'update']);
    Route::delete('destroy/{id}', [OrderdetailController::class, 'destroy']);
    Route::get('status/{id}', [OrderdetailController::class, 'status']);
});
Route::prefix('post')->group(function () {
    Route::get('index', [PostController::class, 'index']);
    Route::get('postnew', [PostController::class, 'post_new']);
    Route::get('show/{id}', [PostController::class, 'show']);
    Route::post('store', [PostController::class, 'store']);
    Route::post('update/{id}', [PostController::class, 'update']);
    Route::delete('destroy/{id}', [PostController::class, 'destroy']);

    Route::get('status/{id}', [PostController::class, 'status']);

    Route::get('post_topic/{slug}', [PostController::class, 'post_topic']);
    // post all
    Route::get('post_all', [PostController::class, 'post_all']);
    Route::get('post_detail/{slug}', [PostController::class, 'post_detail']);
    Route::put('delete/{id}', [PostController::class, 'delete']);
    Route::get('thungrac', [PostController::class, 'thungrac']);
});

Route::prefix('page')->group(function () {
    Route::get('index', [PageController::class, 'index']);
    Route::get('show/{id}', [PageController::class, 'show']);
    Route::post('store', [PageController::class, 'store']);
    Route::post('update/{id}', [PageController::class, 'update']);
    Route::delete('destroy/{id}', [PageController::class, 'destroy']);
    Route::get('status/{id}', [PageController::class, 'status']);



    Route::put('delete/{id}', [PageController::class, 'delete']);
    Route::get('thungrac', [PageController::class, 'thungrac']);

    // lấy ra trang đơn
    Route::get('post_page/{slug}', [PageController::class, 'post_page']);
});
Route::prefix('product')->group(function () {
    Route::get('index', [ProductController::class, 'index']);
    Route::get('index1', [ProductController::class, 'index1']);
    Route::get('show/{id}', [ProductController::class, 'show']);
    Route::post('store', [ProductController::class, 'store']);
    Route::get('productnew/{limit}', [ProductController::class, 'productnew']);
    Route::get('product_detail/{slug}', [ProductController::class, 'product_detail']);
    Route::get('productsale/{limit}', [ProductController::class, 'productsale']);
    Route::get('producthotbuy/{limit}', [ProductController::class, 'producthotbuy']);
    Route::get('product_category_home/{id}', [ProductController::class, 'product_category_home']);
    Route::post('update/{id}', [ProductController::class, 'update']);
    Route::delete('destroy/{id}', [ProductController::class, 'destroy']);
});
Route::prefix('topic')->group(function () {
    Route::get('index', [TopicController::class, 'index']);
    Route::get('show/{id}', [TopicController::class, 'show']);
    Route::post('store', [TopicController::class, 'store']);
    Route::post('update/{id}', [TopicController::class, 'update']);
    Route::delete('destroy/{id}', [TopicController::class, 'destroy']);
    Route::get('status/{id}', [TopicController::class, 'status']);
    Route::put('delete/{id}', [TopicController::class, 'delete']);
    Route::get('thungrac', [TopicController::class, 'thungrac']);
});
Route::prefix('user')->group(function () {
    Route::get('index', [UserController::class, 'index']);
    Route::get('show/{id}', [UserController::class, 'show']);
    Route::post('store', [UserController::class, 'store']);
    Route::post('update/{id}', [UserController::class, 'update']);
    Route::delete('destroy/{id}', [UserController::class, 'destroy']);
    Route::get('status/{id}', [UserController::class, 'status']);
    Route::get('/{id}', [UserController::class, 'getUserById']);

    Route::post('login', [UserController::class, 'login']);
    Route::put('delete/{id}', [UserController::class, 'delete']);
    Route::get('thungrac', [UserController::class, 'thungrac']);
});
    // Route::post('register', [UserController::class, 'register']);
// Route::prefix('customer')->group(function () {
//     Route::get('index', [CustomerController::class, 'index']);
//     Route::get('show/{id}', [CustomerController::class, 'show']);
//     Route::post('store', [CustomerController::class, 'store']);
//     Route::post('update/{id}', [CustomerController::class, 'update']);
//     Route::delete('destroy/{id}', [CustomerController::class, 'destroy']);
// });
