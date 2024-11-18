<?php

namespace App\Listeners;

use App\Events\FollowUpStatusChanged;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendNotificationWhenFollowUpIsMissed implements ShouldQueue
{

    use InteractsWithQueue;
    /**
     * Handle the event.
     */
    public function handle(FollowUpStatusChanged $event): void
    {
        $follow_up = $event->followUp;
        
        if ($follow_up->status === 'Missed') {
            Log::info("Follow-up missed", ['follow_up_id' => $follow_up->id]);
            echo  "A followup  for has been missed";
        }
    }
}
