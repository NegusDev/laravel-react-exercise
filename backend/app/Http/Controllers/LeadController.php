<?php

namespace App\Http\Controllers;

use App\Dto\LeadResponseDto;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LeadController extends Controller
{
    public function index()
    {
        $results = [];
        $leads = Lead::orderBy('id', 'desc')->get();

        foreach ($leads as $lead) {
            $results[] = new LeadResponseDto($lead);
        }

        return response()->json([
            'message' => 'Success',
            'data' => $results
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => ['required', 'string', 'min:4', 'max:50'],
                'email' => ['required', 'string', 'email', 'unique:leads'],
                'phone' => ['required', 'string', 'min:10', 'max:13'],
            ]
        );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            Lead::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);

            return response()->json([
                'message' => 'Lead Created Successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
