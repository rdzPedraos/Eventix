export interface Activity {
  // columns
  id: number
  name: string
  description: string|null
  image: string|null
  status: ActivityStatusEnum
  color: string
  created_by: number
  created_at: string|null
  updated_at: string|null
  // relations
  owner: User
  schedulers: Scheduler[]
  surveys: Survey[]
}

export interface DocumentType {
  // columns
  code: string
  name: string
  regex: string
}

export interface Scheduler {
  // columns
  id: number
  activity_id: number
  start_date: string
  end_date: string
  site_id: number
  // relations
  activity: Activity
}

export interface Sites {
  // columns
  id: number
  name: string
  address: string
  deleted_at: string|null
}

export interface Survey {
  // columns
  id: number
  activity_id: number
  name: string
  description: string|null
  published_trigger: SurveyTriggerEnum
  trigger_date: string|null
  questions: string[]|null
  published_at: string|null
  created_at: string|null
  updated_at: string|null
  deleted_at: string|null
}

export interface User {
  // columns
  id: number
  document_type_code: string
  document_number: string
  name: unknown
  last_name: unknown
  email: string
  phone: string
  password?: string
  remember_token?: string|null
  created_at: string|null
  updated_at: string|null
  // relations
  activities: Activity[]
  notifications: DatabaseNotification[]
  roles: Role[]
  permissions: Permission[]
}

const ActivityStatusEnum = {
  EDITING: 'editing',
  PUBLISHED: 'published',
  CANCELED: 'canceled',
} as const;

export type ActivityStatusEnum = typeof ActivityStatusEnum[keyof typeof ActivityStatusEnum]

const SurveyTriggerEnum = {
  CUSTOM: 'custom',
  TO_START: 'to_start',
  TO_END: 'to_end',
} as const;

export type SurveyTriggerEnum = typeof SurveyTriggerEnum[keyof typeof SurveyTriggerEnum]

