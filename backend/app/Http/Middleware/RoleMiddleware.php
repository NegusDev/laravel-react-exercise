<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $nextroles): Response
    {
        $roles = ["Admin", "Sales Manager"];
        if (!$request->role || !in_array($request->role, $roles)) {
            return response()->json(['message' => 'Acccess Denied to make this request'], Response::HTTP_FORBIDDEN);
        }
        return $nextroles($request);
    }
}
