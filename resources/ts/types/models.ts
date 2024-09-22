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
  // relations
  activity: Activity
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

