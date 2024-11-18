<?php

namespace App\Dto;

use App\Models\FollowUp;
use Carbon\Carbon;

class FollowUpResponseDto {
  public int $id;
  public string $status; 
  public string $scheduled_date;
  public bool $isDeleted;

  public function __construct(FollowUp $followUp) {
    $this->id = $followUp->id;
    $this->status = $followUp->status;
    $this->scheduled_date = Carbon::parse($followUp->scheduled_at)->toIso8601String();
    $this->isDeleted =  $followUp->is_deleted == 0 ? false : true;

  }

  public function toArray(): array
  {
    return [
      'id' => $this->id,
      'scheduled_at' => $this->scheduled_date,
      'isDeleted' => $this->isDeleted,
    ];
  }
}