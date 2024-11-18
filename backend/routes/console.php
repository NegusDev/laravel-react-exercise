<?php

use App\Jobs\MarkMissedFollowUps;
use App\Models\FollowUp;
use Carbon\Carbon;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schedule;

// Artisan::command('inspire', function () {
//     $this->comment(Inspiring::quote());
// })->purpose('Display an inspiring quote')->hourly();


Schedule::job(new MarkMissedFollowUps())->everyMinute();
