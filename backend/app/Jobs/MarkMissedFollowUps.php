<?php

namespace App\Jobs;

use App\Events\FollowUpStatusChanged;
use App\Models\FollowUp;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class MarkMissedFollowUps implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        Log::info("MarkMissedFollowUps");
        $over_due_followups = FollowUp::where('scheduled_at', '<', now())
            ->where('status', 'pending')->get();

        foreach ($over_due_followups as $followup) {
            $followup->update(['status' => 'Missed']);
            event(new FollowUpStatusChanged($followup));
        }
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //
    }
}
