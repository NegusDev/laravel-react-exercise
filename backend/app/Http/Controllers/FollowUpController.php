<?php

namespace App\Http\Controllers;

use App\Dto\FollowUpResponseDto;
use App\Models\FollowUp;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FollowUpController extends Controller
{

    public function index(Request $request)
    {
        $lead_id = $request->id;
        
       
        $followups = FollowUp::where('lead_id', $lead_id)->orderBy('id', 'desc')->get();

        $results = [];
        foreach ($followups as $followup) {
            $results[] = new FollowUpResponseDto($followup);
        }
        

        return response()->json([
            'message' => 'Success',
            'data' => $results,
        ], 200);
    }


    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'lead_id' => ['required', 'int'],
                'scheduledAt' => ['required', 'date'],
            ]
        );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $scheduled_date = Carbon::parse($request->scheduledAt);

        if (!$scheduled_date->isFuture()) {
            return response()->json(['errors' => "Schedule date has to be a future date"], 422);
        }

        try {
            FollowUp::create([
                'lead_id' => $request->lead_id,
                'scheduled_at' => $request->scheduledAt,
            ]);

            return response()->json([
                'message' => 'Follow Up Created Successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateFollowUp(Request $request)
    {
        $followup_id = $request->id;

        $validator = Validator::make($request->all(), [
            'status' => ['required', 'string'],
            'role' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $follow_up = FollowUp::findOrFail($followup_id);

            $follow_up->status = $request->status;

            $follow_up->save();

            return response()->json([
                'message' => 'Follow Up Status Updated Successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
