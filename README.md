
<p align="center">
  <img src="assets/banner.png" alt="Gesture-Canvas Banner">
</p>

<h1 align="center">Gesture-Canvas</h1>

<p align="center">
  Draw in the air using your hand gestures and webcam.
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
