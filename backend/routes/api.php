<?php

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SnippetController;


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


Route::get('/', function () {
    return response()->json(['data' => 'hello world']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/register', [AuthController::class, 'register']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users/{user_id}/snippets/', [SnippetController::class, 'index']);
    Route::post('/users/{user_id}/snippets', [SnippetController::class, 'store']);
    Route::delete('/users/{user}/snippets/{snippet}', [SnippetController::class, 'delete']);
    Route::put('/users/{user}/snippets/{snippet}', [SnippetController::class, 'update']);
});
