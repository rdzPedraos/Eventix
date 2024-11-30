<?php

namespace App\Policies;

use App\Enums\PermissionEnum;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ActivityPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        if ($user->hasPermissionTo(PermissionEnum::ACTIVITY_CHECK_ALL)) {
            return true;
        }

        return $user->hasPermissionTo(PermissionEnum::ACTIVITY_CHECK);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Activity $activity): bool
    {
        if ($user->hasPermissionTo(PermissionEnum::ACTIVITY_CHECK_ALL)) return true;
        if (!$user->hasPermissionTo(PermissionEnum::ACTIVITY_CHECK)) return false;

        return $activity->authorizedUser($user);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo(PermissionEnum::ACTIVITY_CREATE);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Activity $activity): bool
    {
        if ($user->hasPermissionTo(PermissionEnum::ACTIVITY_EDIT_ALL)) return true;
        if (!$user->hasPermissionTo(PermissionEnum::ACTIVITY_EDIT)) return false;

        return $activity->authorizedUser($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Activity $activity): bool
    {
        if ($user->hasPermissionTo(PermissionEnum::ACTIVITY_REMOVE_ALL)) {
            return true;
        }

        return $user->hasPermissionTo(PermissionEnum::ACTIVITY_REMOVE)
            && $activity->authorizedUser($user, true);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Activity $activity): bool
    {
        if ($user->hasPermissionTo(PermissionEnum::ACTIVITY_REMOVE_ALL)) {
            return true;
        }

        return $user->hasPermissionTo(PermissionEnum::ACTIVITY_REMOVE)
            && $activity->authorizedUser($user, true);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    /*public function forceDelete(User $user, Activity $activity): bool
    {
        //
    }*/

    public function downloadReport(User $user, Activity $activity): bool
    {
        if (!$user->hasPermissionTo(PermissionEnum::ATTENDANCE_REPORT)) return false;
        if ($user->hasPermissionTo(PermissionEnum::ACTIVITY_CHECK_ALL)) return true;

        return $activity->authorizedUser($user);
    }
}
