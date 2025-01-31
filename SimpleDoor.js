let isOpen = false
let isMoving = false
let currentPosition = 0
let targetPosition = 0

const door = app.get('Door')

const action = app.create('action')
action.label = 'Open'
action.position.set(0,1.1,-1)
action.distance = 3
door.add(action)

action.onTrigger = () => {
    if (isMoving) return
    isMoving = true
    isOpen = !isOpen
    targetPosition = isOpen ? 1 : 0
}

app.on('update', dt => {
    if (!isMoving) return

    const speed = 2
    const movement = speed * dt
    const maxRotation = Math.PI / 2

    if (isOpen) {
        currentPosition = Math.min(currentPosition + movement, 1)
        action.label = 'Open'
    } else {
        currentPosition = Math.max(currentPosition - movement, 0)
        action.label = 'Close'
    }

    const rotation = maxRotation * currentPosition
    door.rotation.y = rotation

    // Check if animation is complete
    if (Math.abs(currentPosition - targetPosition) < 0.001) {
        isMoving = false
        currentPosition = targetPosition
    }
})
