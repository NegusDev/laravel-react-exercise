<?php

namespace App\Events;

use App\Models\FollowUp;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class FollowUpStatusChanged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    /**
     * Create a new event instance.
     */
    public function __construct(public FollowUp $followUp)
    {
        Log::info("Follow Up status changed", ['followUpId' => $followUp->id, 'newStatus' => $followUp->status]);
        $this->followUp = $followUp;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return ['lead-management'];
    }

    public function broadcastAs()
  {
      return 'followup-event';
  }
}
