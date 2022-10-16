<?php

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SnippetController;
use App\Http\Controllers\EmailVerificationController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/register', [AuthController::class, 'register']);


Route::middleware(['email.verified'])->group(
    function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/resend-email', [EmailVerificationController::class, 'send']);
        Route::post('/verify-email', [EmailVerificationController::class, 'verify']);
    }
);

Route::middleware(['email.verified', 'auth:sanctum',])->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/users/me', [UserController::class, 'index']);
    Route::post('/snippets', [SnippetController::class, 'store']);
    Route::get('/snippets', [SnippetController::class, 'index']);
    Route::delete('/snippets/{snippet}', [SnippetController::class, 'delete']);
    Route::put('/snippets/{snippet}', [SnippetController::class, 'update']);
});
