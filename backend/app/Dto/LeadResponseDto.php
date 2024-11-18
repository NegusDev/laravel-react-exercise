<?php

namespace App\Dto;

use App\Models\Lead;
use Carbon\Carbon;
use DateTime;

class LeadResponseDto
{
  public int $id;
  public string $name;
  public string $email;
  public string $phone;
  public string $createdAt;
  public bool $isDeleted;

  public function __construct(Lead $result)
  {
    $this->id = (int) $result->id;
    $this->name = $result->name;
    $this->email =  $result->email;
    $this->phone =  $result->phone;
    $this->createdAt =  Carbon::parse($result->created_at)->toIso8601String();
    $this->isDeleted =  $result->is_deleted == 0 ? false : true;
  }

  public function toArray(): array
  {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'email' => $this->email,
      'phone' => $this->phone,
      'createdAt' => $this->createdAt,
      'isDeleted' => $this->isDeleted,
    ];
  }
}
