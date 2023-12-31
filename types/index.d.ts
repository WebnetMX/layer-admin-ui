import type { Avatar, Link as ULink } from "#ui/types"

export interface Link extends ULink {
  label: string
  description?: string
  class?: string
  disabled?: boolean
  icon?: string
  iconClass?: string
  avatar?: Avatar
  badge?: string
  children?: Link[]
  click?: Function
}
