// State variables to track door status
let isOpen = false        // Tracks if the door is currently open
let isMoving = false      // Tracks if the door is in motion
let currentPosition = 0   // Current position value (0 = closed, 1 = fully open)
let targetPosition = 0    // Target position the door is moving towards

// Get the 3D door model from the scene
const door = app.get('Door')

// Create an interactive action (button) for the door
const action = app.create('action')
action.label = 'Open'     // Initial button label
action.position.set(0, 1.1, -1)  // Position the button in 3D space
action.distance = 3       // Maximum distance from which players can interact
door.add(action)         // Attach the button to the door object

// Handle when player clicks the door button
action.onTrigger = () => {
    if (isMoving) return  // Prevent multiple triggers while door is moving
    isMoving = true
    isOpen = !isOpen      // Toggle door state
    targetPosition = isOpen ? 1 : 0  // Set target based on desired state
}

// Update loop - runs every frame to animate the door
app.on('update', dt => {
    if (!isMoving) return  // Skip if door isn't moving

    const speed = 2        // Door movement speed
    const movement = speed * dt  // Calculate movement this frame (speed * delta time)
    const maxRotation = Math.PI / 2  // 90 degrees in radians

    // Update door position and button label based on movement direction
    if (isOpen) {
        currentPosition = Math.min(currentPosition + movement, 1)
        action.label = 'Open'
    } else {
        currentPosition = Math.max(currentPosition - movement, 0)
        action.label = 'Close'
    }

    // Apply rotation to the door model
    const rotation = maxRotation * currentPosition
    door.rotation.y = rotation

    // Check if door has reached its target position
    if (Math.abs(currentPosition - targetPosition) < 0.001) {
        isMoving = false
        currentPosition = targetPosition
    }
})
