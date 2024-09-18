export interface Country {
  // relations
  document_types: DocumentType[]
}

export interface DocumentType {
  // columns
  code: string
  name: string
  regex: string
}

export interface User {
  // columns
  id: number
  name: string
  last_name: string
  email: string
  phone: string
  email_verified_at: string|null
  password?: string
  remember_token?: string|null
  created_at: string|null
  updated_at: string|null
  document_type_code: string
  document_number: string
  // relations
  notifications: DatabaseNotification[]
}

