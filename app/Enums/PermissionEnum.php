<?php

namespace App\Enums;

enum PermissionEnum: string
{
    case ACTIVITY_REGISTER = 'activity.register';
    case ACTIVITY_CHECK = 'activity.check';
    case ACTIVITY_CREATE = 'activity.create';
    case ACTIVITY_ADD_EDITOR = 'activity.add_editor';
    case ACTIVITY_EDIT = 'activity.edit';
    case ACTIVITY_EDIT_ALL = 'activity.edit_all';
    case ACTIVITY_REMOVE = 'activity.remove';
    case ACTIVITY_REMOVE_ALL = 'activity.remove_all';
    case ACTIVITY_PUBLISH = 'activity.publish';

    case SURVEY_ANSWER = 'survey.answer';
    case SURVEY_CHECK = 'survey.check';
    case SURVEY_CREATE = 'survey.create';
    case SURVEY_EDIT = 'survey.edit';
    case SURVEY_EDIT_ALL = 'survey.edit_all';
    case SURVEY_REMOVE = 'survey.remove';
    case SURVEY_REMOVE_ALL = 'survey.remove_all';
    case SURVEY_PUBLISH = 'survey.publish';

    case ATTENDANCE_CHECK = 'attendance.check';
    case ATTENDANCE_REPORT = 'attendance.report';

    case PLACES_SHOW = 'places.show';
    case PLACES_CREATE = 'places.create';
    case PLACES_EDIT = 'places.edit';
    case PLACES_DELETE = 'places.delete';

    case ACADEMIC_ROLES_LIST_REQUEST = 'academic_roles.list_request';
    case ACADEMIC_ROLES_APPROVE = 'academic_roles.approve';

    case SYSTEM_ROLES_LIST = 'system_roles.list';
    case SYSTEM_ROLES_CREATE = 'system_roles.create';
    case SYSTEM_ROLES_EDIT = 'system_roles.edit';

    public function label(): string
    {
        return __("permissions.{$this->value}");
    }
}