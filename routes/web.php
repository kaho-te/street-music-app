<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostLikeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::resource('/posts', PostController::class);
    Route::get('/post/{id}', [PostController::class, 'show'])->name('post.show');
    Route::post('/post/{id}', [PostController::class, 'destroy'])->name('post.destroy');
    Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');
    Route::post('/comment/{id}', [CommentController::class, 'destroy'])->name('comment.destroy');
    Route::get('/account', [AccountController::class, 'show'])->name('account.show');
    Route::get('/favoritelist', [PostLikeController::class, 'show'])->name('like.show');
    Route::post('/posts/{post}/like', [PostLikeController::class, 'store'])->name('like.store');
    Route::post('/posts/{post}/dislike', [PostLikeController::class, 'destroy'])->name('like.destroy');
});

require __DIR__.'/auth.php';
