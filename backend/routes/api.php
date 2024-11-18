<?php

use App\Http\Controllers\FollowUpController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::controller(UserController::class)->group(function () {
    Route::post('/register',  'register');
    Route::post('/login',  'login');
});

// Route::post('/tokens/create', function (Request $request) {
//     $token = $request->user()->createToken($request->email);

//     return ['token' => $token->plainTextToken];
// });

Route::controller(LeadController::class)->group(function () {
    Route::get('leads', 'index');
    Route::post('leads', 'store');
});

Route::controller(FollowUpController::class)->group(function() {
    Route::get('followups/{id}', 'index');
    Route::post('followups', 'store');
    Route::put('followups/{id}/status', 'updateFollowUp')->middleware('roleAccessMiddleware');
});
