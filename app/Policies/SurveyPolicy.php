<?php

namespace App\Policies;

use App\Enums\PermissionEnum;
use App\Models\Survey;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SurveyPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        if ($user->hasPermissionTo(PermissionEnum::SURVEY_CHECK_ALL)) {
            return true;
        }

        return $user->hasPermissionTo(PermissionEnum::SURVEY_CHECK);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Survey $survey): bool
    {
        if ($user->hasPermissionTo(PermissionEnum::SURVEY_CHECK_ALL)) return true;
        if (!$user->hasPermissionTo(PermissionEnum::SURVEY_CHECK)) return false;

        return $survey->activity->authorizedUser($user);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo(PermissionEnum::SURVEY_CREATE);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Survey $survey): bool
    {
        if ($user->hasPermissionTo(PermissionEnum::SURVEY_EDIT_ALL)) return true;
        if (!$user->hasPermissionTo(PermissionEnum::SURVEY_EDIT)) return false;

        return $survey->activity->authorizedUser($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Survey $survey): bool
    {
        if ($user->hasPermissionTo(PermissionEnum::SURVEY_REMOVE_ALL)) {
            return true;
        }

        return $user->hasPermissionTo(PermissionEnum::SURVEY_REMOVE)
            && $survey->activity->authorizedUser($user, true);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Survey $survey): bool
    {
        if ($user->hasPermissionTo(PermissionEnum::SURVEY_REMOVE_ALL)) {
            return true;
        }

        return $user->hasPermissionTo(PermissionEnum::SURVEY_REMOVE)
            && $survey->activity->authorizedUser($user, true);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    /*public function forceDelete(User $user, Survey $survey): bool
    {
        //
    }*/

    public function downloadReport(User $user, Survey $survey): bool
    {
        if (!$user->hasPermissionTo(PermissionEnum::ATTENDANCE_REPORT)) return false;
        if ($user->hasPermissionTo(PermissionEnum::ACTIVITY_CHECK_ALL)) return true;

        return $survey->activity->authorizedUser($user);
    }
}
