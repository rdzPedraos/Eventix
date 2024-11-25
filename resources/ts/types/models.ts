export interface Activity {
  // columns
  id: number
  name: string
  description: string|null
  image: string|null
  color: ColorEnum
  published_at: string|null
  created_by: number
  created_at: string|null
  updated_at: string|null
  deleted_at: string|null
  // mutators
  is_published: unknown
  // relations
  owner: User
  schedulers: Scheduler[]
  surveys: Survey[]
  enrollments: User[]
}

export interface Answer {
  // columns
  survey_id: number
  user_id: number
  answers: string[]
  filled_at: string
}

export interface DocumentType {
  // columns
  code: string
  name: string
  regex: string
}

export interface Inscription {
  // columns
  activity_id: number
  user_id: number
  registered_at: string
  // relations
  user: User
  activity: Activity
}

export interface Question {
  // columns
  id: string
  survey_id: number
  label: string
  type: QuestionTypesEnum
  is_required: boolean
  options: string[]|null
  // relations
  survey: Survey
}

export interface Role {
  // columns
  id: number
  name: string
  guard_name: string
  created_at: string|null
  updated_at: string|null
  // relations
  permissions: Permission[]
  users: User[]
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
  editable: boolean
  published_trigger: SurveyTriggerEnum
  trigger_date: string|null
  published_at: string|null
  created_at: string|null
  updated_at: string|null
  deleted_at: string|null
  // mutators
  is_published: unknown
  blocked: unknown
  // relations
  activity: Activity
  questions: Question[]
  answers: Answer[]
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
  // mutators
  full_name: string
  // relations
  activities: Activity[]
  enrolled_activities: Activity[]
  surveys: Survey[]
  notifications: DatabaseNotification[]
  roles: Role[]
  permissions: Permission[]
}

const ColorEnum = {
  YELLOW: '#FBBA13',
  ORANGE: '#FF6500',
  PINK: '#E60E8A',
  PURPLE: '#9500C9',
  SKY: '#42ACD4',
  SEA_WATER: '#24A88E',
  GREEN: '#80BD41',
} as const;

export type ColorEnum = typeof ColorEnum[keyof typeof ColorEnum]

const QuestionTypesEnum = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  SELECT: 'select',
} as const;

export type QuestionTypesEnum = typeof QuestionTypesEnum[keyof typeof QuestionTypesEnum]

const SurveyTriggerEnum = {
  CUSTOM: 'custom',
  TO_START: 'to_start',
  TO_END: 'to_end',
} as const;

export type SurveyTriggerEnum = typeof SurveyTriggerEnum[keyof typeof SurveyTriggerEnum]

