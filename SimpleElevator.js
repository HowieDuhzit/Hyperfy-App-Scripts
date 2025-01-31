// elevator.js
// elevators in hyperfy

// Default configuration
const ELEVATOR_SPEED = 2.0  // Units per second
const MIN_HEIGHT = 0        // Ground level

// State variables to track elevator status
let isMoving = false      // Tracks if elevator is in motion
let currentPosition = 0   // Current position value (0 = ground, 1 = top)
let targetPosition = 0    // Target position elevator is moving towards
let isAtTop = false      // Tracks if elevator is at the top

// Get the 3D elevator model from the scene
const elevator = app.get('Elevator')

// Create an interactive action (button) for the elevator
const action = app.create('action')
action.label = 'Up'       // Initial button label
action.position.set(0.6, 1.4, 0)  // Position the button in 3D space
action.distance = 3       // Maximum distance from which players can interact
elevator.add(action)      // Attach the button to the elevator object

// Handle when player clicks the elevator button
action.onTrigger = () => {
	if (isMoving) return  // Prevent multiple triggers while elevator is moving
	isMoving = true
	isAtTop = !isAtTop    // Toggle elevator state
	targetPosition = isAtTop ? 1 : 0  // Set target based on desired state
}

// Update loop - runs every frame to animate the elevator
app.on('update', dt => {
	if (!isMoving) return  // Skip if elevator isn't moving

	const speed = 2        // Elevator movement speed
	const movement = speed * dt  // Calculate movement this frame (speed * delta time)
	const maxHeight = 10   // Maximum height elevator can reach

	// Update elevator position and button label based on movement direction
	if (isAtTop) {
		currentPosition = Math.min(currentPosition + movement, 1)
		action.label = 'Down'
	} else {
		currentPosition = Math.max(currentPosition - movement, 0)
		action.label = 'Up'
	}

	// Apply position to the elevator model
	elevator.position.y = currentPosition * maxHeight

	// Check if elevator has reached its target position
	if (Math.abs(currentPosition - targetPosition) < 0.001) {
		isMoving = false
		currentPosition = targetPosition
	}
})

// Configure UI
app.configure(() => {
	return [
		{
			key: 'elevator',
			type: 'section',
			label: 'Elevator Settings',
		},
		{
			key: 'maxHeight',
			type: 'text',
			label: 'Maximum Height',
			defaultValue: '10',
		},
		{
			key: 'speed',
			type: 'text',
			label: 'Speed',
			defaultValue: '2',
		}
	]
}) 