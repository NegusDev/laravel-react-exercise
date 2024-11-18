<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'email' => ['required', 'string', 'email', 'unique:users'],
                'password' => ['required', 'min:8'],
                'role' => ['required', 'string'],
            ]
        );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
            ]);

            $token = $user->createToken('AuthToken')->plainTextToken;
            $headers = [
                "Authorization" => "Bearer $token",
            ];
            return response()->json([
                'message' => 'User Account Created Successfully',
                'token' => $token
            ], 201, $headers);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'email' => ['required', 'string', 'email'],
                'password' => ['required', 'min:8'],
            ]
        );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        try {

            $user = User::where('email', $request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Invalid Credentials'
                ], 401);
            }
            $token = $user->createToken('AuthToken')->plainTextToken;
            $headers = [
                "Authorization" => "Bearer $token",
            ];
            return response()->json([
                'message' => 'Logged in Created Successfully',
                'data' => [
                    'email' => $user->email,
                    'role' => $user->role,
                    'token' => $token,
                ],
            ], 200, $headers);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
