
<p align="center">
  <img src="Gesture-Canvas-banner.png" alt="Gesture-Canvas Banner" width="100%">
</p>

# 🎨 Gesture-Canvas — Air Drawing

---

## ✨ About The Project

**Gesture-Canvas** is an interactive air-drawing web application built using **HTML, CSS, and JavaScript**.

Instead of using a traditional mouse or drawing tool, the application uses a webcam to detect the user's hand and track the **index finger**.

The movement of the index finger is converted into a drawing path on the digital canvas.

The main idea behind this project is to explore how **computer vision + hand tracking + web technologies** can be combined to create a fun and interactive user experience.

---

## 🚀 Features

### 🖐️ Hand Gesture Drawing
Draw on the canvas by moving your index finger in front of the webcam.

### 🎥 Real-Time Hand Tracking
The application detects and tracks the user's hand using webcam input.

### ✏️ Air Drawing
No physical mouse or drawing tablet is required.

Simply move your finger in the air and create your drawing digitally.

### 🎨 Multiple Colors
Choose different colors for your drawing.

### 🧽 Eraser
Switch to eraser mode and remove parts of your drawing.

### ↩️ Undo
Undo your previous drawing actions.

### 🗑️ Clear Canvas
Clear the entire canvas and start a new drawing.

### 💾 Save Drawing
Save your artwork as a PNG image.

### 🎯 Gesture-Based Controls
Move your finger over controls and hold it for a short time to activate them.

### ⚡ Smooth Finger Tracking
The project uses position smoothing to make the drawing movement more natural and reduce sudden jumps.

### 📱 Responsive Interface
The interface is designed to work across different screen sizes.

---

## 🧠 How It Works

The application follows this basic process:

```text
        Webcam
           │
           ▼
    Hand Detection
           │
           ▼
   Hand Landmarks
           │
           ▼
   Index Finger Tip
           │
           ▼
 Coordinate Conversion
           │
           ▼
   Smooth Position
           │
           ▼
      Canvas Drawing
🎨 4. Multiple Colors

Users can select different colors for their artwork.

Example colors:

🔴 Red
🟠 Orange
🟡 Yellow
🟢 Green
🔵 Blue
🟣 Purple
⚫ Black
⚪ White
🩷 Pink
🩵 Cyan
🟤 Brown
🩶 Gray

The selected color is applied to new drawing strokes.

🎨 UI/UX Design

The user interface was designed to look more like a modern creative application rather than a basic HTML project.

The design focuses on:

✨ Visual Hierarchy

Important controls are clearly separated from secondary controls.

🎨 Color Feedback

Selected tools and colors provide visual feedback.

🧭 Easy Navigation

The control panel keeps important options accessible.

🟢 Selection Feedback

When an option is selected, the interface provides a visual indication.

📱 Responsive Layout

The interface is designed to adapt to different screen sizes.


📄 index.html

The HTML file provides the main structure of the application.

It contains:

Main application container
Drawing canvas
Hand tracking canvas
Controls
Color options
Drawing tools
Eraser
Undo
Clear
Save
Camera controls
Status indicators
🎨 style.css

The CSS file controls the visual appearance of the application.

It manages:

Layout
Colors
Buttons
Panels
Typography
Spacing
Borders
Shadows
Animations
Responsive behaviour
⚙️ script.js

JavaScript controls the complete application logic.

It manages:

Canvas drawing
Hand tracking
Finger coordinates
Color selection
Brush size
Eraser
Undo
Clear
Save
Gesture interaction
Camera communication
