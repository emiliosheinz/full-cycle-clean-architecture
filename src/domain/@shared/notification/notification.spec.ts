import { Notification } from './notification'

describe('Notifications', () => {
  it('should create an error', () => {
    const notification = new Notification()

    const error = {
      message: 'Error message',
      context: 'customer',
    }
    notification.addError(error)
    expect(notification.messages()).toEqual('customer: Error message')

    const error2 = {
      message: 'Error message 2',
      context: 'product',
    }
    notification.addError(error2)
    expect(notification.messages()).toEqual(
      'customer: Error message, product: Error message 2'
    )
  })

  it('should check if notification has at least one error', () => {
    const notification = new Notification()
    expect(notification.hasErrors()).toBe(false)

    const error = {
      message: 'Error message',
      context: 'customer',
    }
    notification.addError(error)
    expect(notification.hasErrors()).toBe(true)
  })

  it('should get all errors', () => {
    const notification = new Notification()

    const error = {
      message: 'Error message',
      context: 'customer',
    }
    notification.addError(error)

    const error2 = {
      message: 'Error message 2',
      context: 'customer',
    }
    notification.addError(error2)

    expect(notification.errors).toEqual([error, error2])
  })
})
