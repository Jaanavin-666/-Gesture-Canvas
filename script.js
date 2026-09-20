// =====================================
// GESTURE CANVAS - ACCURATE TRACKING
// =====================================

const video = document.getElementById("video");

const drawCanvas =
    document.getElementById("drawCanvas");

const handCanvas =
    document.getElementById("handCanvas");

const drawCtx =
    drawCanvas.getContext("2d");

const handCtx =
    handCanvas.getContext("2d");


// =====================================
// UI ELEMENTS
// =====================================

const cameraBtn =
    document.getElementById("cameraBtn");

const stopBtn =
    document.getElementById("stopBtn");

const cameraStatus =
    document.getElementById("cameraStatus");

const handStatus =
    document.getElementById("handStatus");

const clearBtn =
    document.getElementById("clearBtn");

const undoBtn =
    document.getElementById("undoBtn");

const eraseBtn =
    document.getElementById("eraseBtn");

const saveBtn =
    document.getElementById("saveBtn");

const colorButtons =
    document.querySelectorAll(".color-btn");

const gestureButtons =
    document.querySelectorAll(".gesture-btn");

const selectedStatus =
    document.getElementById("selectedStatus");

const saveModal =
    document.getElementById("saveModal");

const drawingPreview =
    document.getElementById("drawingPreview");

const yesSave =
    document.getElementById("yesSave");

const noSave =
    document.getElementById("noSave");


// =====================================
// VARIABLES
// =====================================

let cameraStarted = false;

let currentColor = "#ffffff";

let brushSize = 10;

let eraserMode = false;

let history = [];


// =====================================
// DRAWING POSITION
// =====================================

let lastX = null;
let lastY = null;

let smoothX = null;
let smoothY = null;


// =====================================
// TRACKING SETTINGS
// =====================================

// Higher = smoother
// Lower = faster response

const SMOOTHING = 0.72;


// Maximum distance allowed between
// two tracking points before drawing
// is considered a jump.

const MAX_JUMP = 90;


// =====================================
// HOLD SYSTEM
// =====================================

let hoveredControl = null;

let holdStartTime = 0;

let holdCompleted = false;

const HOLD_TIME = 500;


// =====================================
// RESIZE CANVAS
// =====================================

function resizeCanvas() {

    drawCanvas.width =
        window.innerWidth;

    drawCanvas.height =
        window.innerHeight;

    handCanvas.width =
        window.innerWidth;

    handCanvas.height =
        window.innerHeight;
}

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


// =====================================
// SAVE HISTORY
// =====================================

function saveHistory() {

    history.push(
        drawCtx.getImageData(
            0,
            0,
            drawCanvas.width,
            drawCanvas.height
        )
    );

    if (history.length > 20) {

        history.shift();
    }
}


// =====================================
// RESET TRACKING
// =====================================

function resetTracking() {

    lastX = null;

    lastY = null;

    smoothX = null;

    smoothY = null;
}


// =====================================
// DISTANCE
// =====================================

function distance(
    x1,
    y1,
    x2,
    y2
) {

    return Math.sqrt(
        Math.pow(x2 - x1, 2) +
        Math.pow(y2 - y1, 2)
    );
}


// =====================================
// ACCURATE SMOOTH POSITION
// =====================================

function getSmoothPosition(
    targetX,
    targetY
) {

    if (
        smoothX === null ||
        smoothY === null
    ) {

        smoothX = targetX;

        smoothY = targetY;

        return {
            x: smoothX,
            y: smoothY
        };
    }


    smoothX =
        smoothX +
        (
            targetX - smoothX
        ) * SMOOTHING;


    smoothY =
        smoothY +
        (
            targetY - smoothY
        ) * SMOOTHING;


    return {
        x: smoothX,
        y: smoothY
    };
}


// =====================================
// DRAW SMOOTH LINE
// =====================================

function drawLine(
    x,
    y
) {

    // First point

    if (
        lastX === null ||
        lastY === null
    ) {

        lastX = x;

        lastY = y;

        return;
    }


    // Check for sudden jump

    const gap =
        distance(
            lastX,
            lastY,
            x,
            y
        );


    if (gap > MAX_JUMP) {

        lastX = x;

        lastY = y;

        return;
    }


    // =================================
    // DRAW
    // =================================

    drawCtx.beginPath();

    drawCtx.moveTo(
        lastX,
        lastY
    );

    drawCtx.lineTo(
        x,
        y
    );


    drawCtx.lineWidth =
        brushSize;

    drawCtx.lineCap =
        "round";

    drawCtx.lineJoin =
        "round";


    if (eraserMode) {

        drawCtx.globalCompositeOperation =
            "destination-out";

    } else {

        drawCtx.globalCompositeOperation =
            "source-over";

        drawCtx.strokeStyle =
            currentColor;
    }


    drawCtx.stroke();


    drawCtx.globalCompositeOperation =
        "source-over";


    lastX = x;

    lastY = y;
}


// =====================================
// CLEAR
// =====================================

function clearDrawing() {

    saveHistory();

    drawCtx.clearRect(
        0,
        0,
        drawCanvas.width,
        drawCanvas.height
    );

    resetTracking();

    selectedStatus.textContent =
        "Clear Selected";
}


// =====================================
// UNDO
// =====================================

function undoDrawing() {

    if (
        history.length === 0
    ) {

        return;
    }


    const previous =
        history.pop();


    drawCtx.putImageData(
        previous,
        0,
        0
    );


    resetTracking();


    selectedStatus.textContent =
        "Undo Selected";
}


// =====================================
// ERASE
// =====================================

function toggleEraser() {

    eraserMode =
        !eraserMode;


    if (eraserMode) {

        eraseBtn.textContent =
            "🖊 Draw Mode";

        selectedStatus.textContent =
            "Erase Selected";

    } else {

        eraseBtn.textContent =
            "🧽 Erase";

        selectedStatus.textContent =
            "Draw Selected";
    }


    resetTracking();
}


// =====================================
// SELECT COLOR
// =====================================

function selectColor(button) {

    currentColor =
        button.dataset.color;


    eraserMode = false;


    eraseBtn.textContent =
        "🧽 Erase";


    selectedStatus.textContent =
        button.dataset.name +
        " Selected";


    resetTracking();
}


// =====================================
// SAVE PREVIEW
// =====================================

function showSavePreview() {

    drawingPreview.src =
        drawCanvas.toDataURL(
            "image/png"
        );


    saveModal.style.display =
        "flex";


    selectedStatus.textContent =
        "Save Selected";


    resetTracking();
}


// =====================================
// DOWNLOAD
// =====================================

function downloadDrawing() {

    const link =
        document.createElement("a");


    link.download =
        "gesture-drawing.png";


    link.href =
        drawCanvas.toDataURL(
            "image/png"
        );


    link.click();


    saveModal.style.display =
        "none";
}


// =====================================
// CLOSE SAVE
// =====================================

function closeSavePreview() {

    saveModal.style.display =
        "none";
}


// =====================================
// NORMAL MOUSE SUPPORT
// =====================================

clearBtn.addEventListener(
    "click",
    clearDrawing
);

undoBtn.addEventListener(
    "click",
    undoDrawing
);

eraseBtn.addEventListener(
    "click",
    toggleEraser
);

saveBtn.addEventListener(
    "click",
    showSavePreview
);


yesSave.addEventListener(
    "click",
    downloadDrawing
);

noSave.addEventListener(
    "click",
    closeSavePreview
);


// =====================================
// COLOR BUTTONS
// =====================================

colorButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                selectColor(button);
            }
        );
    }
);


// =====================================
// MEDIAPIPE HANDS
// =====================================

const hands =
    new Hands({

        locateFile:
            function(file) {

                return (
                    "https://cdn.jsdelivr.net/npm/" +
                    " @mediapipe/hands/" +
                    file
                ).replace(" ", "");
            }
    });


hands.setOptions({

    maxNumHands: 1,

    modelComplexity: 1,

    minDetectionConfidence: 0.65,

    minTrackingConfidence: 0.65
});


// =====================================
// FIND CONTROL
// =====================================

function findControl(
    x,
    y
) {

    const elements =
        document.elementsFromPoint(
            x,
            y
        );


    for (
        const element of elements
    ) {

        if (
            element.classList.contains(
                "gesture-btn"
            )
        ) {

            return element;
        }


        if (
            element.classList.contains(
                "color-btn"
            )
        ) {

            return element;
        }
    }


    return null;
}


// =====================================
// REMOVE HIGHLIGHTS
// =====================================

function removeHighlights() {

    gestureButtons.forEach(
        function(button) {

            button.classList.remove(
                "highlight"
            );

            button.classList.remove(
                "holding"
            );
        }
    );


    colorButtons.forEach(
        function(button) {

            button.classList.remove(
                "highlight"
            );

            button.classList.remove(
                "holding"
            );
        }
    );
}


// =====================================
// ACTIVATE CONTROL
// =====================================

function activateControl(
    control
) {

    if (!control) {

        return;
    }


    if (
        control.id === "clearBtn"
    ) {

        clearDrawing();

        return;
    }


    if (
        control.id === "undoBtn"
    ) {

        undoDrawing();

        return;
    }


    if (
        control.id === "eraseBtn"
    ) {

        toggleEraser();

        return;
    }


    if (
        control.id === "saveBtn"
    ) {

        showSavePreview();

        return;
    }


    if (
        control.classList.contains(
            "color-btn"
        )
    ) {

        selectColor(control);
    }
}


// =====================================
// HAND RESULTS
// =====================================

hands.onResults(
    function(results) {

        // Clear pointer layer

        handCtx.clearRect(
            0,
            0,
            handCanvas.width,
            handCanvas.height
        );


        // =================================
        // NO HAND
        // =================================

        if (
            !results.multiHandLandmarks ||
            results.multiHandLandmarks.length === 0
        ) {

            handStatus.textContent =
                "Show your hand";


            resetTracking();


            hoveredControl = null;

            holdStartTime = 0;

            holdCompleted = false;


            removeHighlights();

            return;
        }


        // =================================
        // LANDMARKS
        // =================================

        const landmarks =
            results.multiHandLandmarks[0];


        // Index finger

        const indexTip =
            landmarks[8];

        const indexPIP =
            landmarks[6];

        const indexMCP =
            landmarks[5];


        // =================================
        // INDEX FINGER DETECTION
        // =================================

        const indexOpen =
            indexTip.y <
            indexPIP.y &&
            indexPIP.y <
            indexMCP.y;


        // =================================
        // RAW SCREEN POSITION
        // =================================

        let rawX =
            (1 - indexTip.x) *
            window.innerWidth;


        let rawY =
            indexTip.y *
            window.innerHeight;


        // Keep point inside screen

        rawX =
            Math.max(
                0,
                Math.min(
                    window.innerWidth,
                    rawX
                )
            );


        rawY =
            Math.max(
                0,
                Math.min(
                    window.innerHeight,
                    rawY
                )
            );


        // =================================
        // SMOOTH POSITION
        // =================================

        const point =
            getSmoothPosition(
                rawX,
                rawY
            );


        const x =
            point.x;

        const y =
            point.y;


        // =================================
        // CONTROL DETECTION
        // =================================

        const control =
            findControl(
                x,
                y
            );


        // =================================
        // CONTROL MODE
        // =================================

        if (
            control &&
            indexOpen
        ) {

            resetTracking();


            if (
                hoveredControl !==
                control
            ) {

                hoveredControl =
                    control;

                holdStartTime =
                    Date.now();

                holdCompleted =
                    false;
            }


            control.classList.add(
                "highlight"
            );


            const holdTime =
                Date.now() -
                holdStartTime;


            if (
                holdTime >=
                HOLD_TIME
            ) {

                control.classList.add(
                    "holding"
                );


                if (
                    !holdCompleted
                ) {

                    holdCompleted =
                        true;


                    activateControl(
                        control
                    );
                }
            }


            if (
                !holdCompleted
            ) {

                handStatus.textContent =
                    "Hold 2.5 seconds";

            } else {

                handStatus.textContent =
                    "Selected";
            }


            return;
        }


        // =================================
        // NO CONTROL
        // =================================

        hoveredControl = null;

        holdStartTime = 0;

        holdCompleted = false;

        removeHighlights();


        // =================================
        // DRAWING
        // =================================

        if (
            indexOpen
        ) {

            handStatus.textContent =
                eraserMode
                    ? "Erasing"
                    : "Drawing";


            // =================================
            // ACCURATE FINGER DOT
            // =================================

            handCtx.beginPath();


            handCtx.arc(
                x,
                y,
                7,
                0,
                Math.PI * 2
            );


            handCtx.fillStyle =
                eraserMode
                    ? "#ff4444"
                    : "#22c55e";


            handCtx.shadowColor =
                eraserMode
                    ? "#ff4444"
                    : "#22c55e";


            handCtx.shadowBlur = 12;


            handCtx.fill();


            handCtx.shadowBlur = 0;


            // =================================
            // DRAW
            // =================================

            if (
                cameraStarted
            ) {

                drawLine(
                    x,
                    y
                );
            }

        } else {

            // Finger closed = STOP

            handStatus.textContent =
                "Drawing OFF";


            resetTracking();
        }

    }
);


// =====================================
// CAMERA
// =====================================

const camera =
    new Camera(
        video,
        {

            onFrame:
                async function() {

                    if (
                        cameraStarted
                    ) {

                        await hands.send({
                            image: video
                        });
                    }
                },

            width: 1280,

            height: 720
        }
    );


// =====================================
// START CAMERA
// =====================================

cameraBtn.addEventListener(
    "click",
    async function() {

        try {

            await navigator
                .mediaDevices
                .getUserMedia({
                    video: true
                });


            cameraStarted =
                true;


            cameraStatus.textContent =
                "Camera Online";


            handStatus.textContent =
                "Show your hand";


            cameraBtn.textContent =
                "✓ Camera Active";


            cameraBtn.disabled =
                true;


            stopBtn.disabled =
                false;


            camera.start();

        }

        catch(error) {

            console.error(error);


            alert(
                "Please allow camera permission."
            );
        }
    }
);


// =====================================
// STOP CAMERA
// =====================================

stopBtn.addEventListener(
    "click",
    function() {

        cameraStarted =
            false;


        cameraStatus.textContent =
            "Camera Stopped";


        handStatus.textContent =
            "Camera stopped";


        cameraBtn.disabled =
            false;


        cameraBtn.textContent =
            "Start Camera";


        stopBtn.disabled =
            true;


        resetTracking();


        hoveredControl = null;

        holdStartTime = 0;

        holdCompleted = false;


        removeHighlights();


        handCtx.clearRect(
            0,
            0,
            handCanvas.width,
            handCanvas.height
        );
    }
);