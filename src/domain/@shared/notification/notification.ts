export type NotificationErrorProps = {
  message: string
  context: string
}

export class Notification {
  readonly errors: NotificationErrorProps[] = []

  addError(error: NotificationErrorProps) {
    this.errors.push(error)
  }

  messages(): string {
    return this.errors
      .map(error => `${error.context}: ${error.message}`)
      .join(', ')
  }

  hasErrors(): boolean {
    return this.errors.length > 0
  }
}
