let pointCount = 2; // Initial points count

const createPoint = (labelText, leftPosition) => {
    const point = document.createElement('div');
    point.classList.add('point');
    point.style.left = '290px'; // Initial position	
    point.setAttribute('data-index', pointCount);

    const labelContainer = document.createElement('div');
    labelContainer.classList.add('label-container');

    const label = document.createElement('div');
    label.classList.add('label');
    label.textContent = labelText;

    const verticalLine = document.createElement('div');
    verticalLine.classList.add('line');

    labelContainer.appendChild(label);
    labelContainer.appendChild(verticalLine);
    point.appendChild(labelContainer);
    lineContainer.appendChild(point);
    makeDraggable(point);
    adjustOverlappingPoints(point) ;
    pointCount++;
};

const makeDraggable = (point) => {
    const index = parseInt(point.getAttribute('data-index'), 10);
    if (index === 0 || index === 100) return;


    let isDragging = false;
    let dragTimer;

    point.addEventListener('mousedown', (e) => {
        const onMouseMove = (e) => {              

            const rect = lineContainer.getBoundingClientRect();
            let newLeft = e.clientX - rect.left;
            newLeft = Math.max(0, Math.min(newLeft, rect.width));
            point.style.left = `${newLeft}px`;
        };

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener('mouseup', () => {
           
                document.removeEventListener('mousemove', onMouseMove);
                adjustOverlappingPoints(point); // Adjust overlapping points after mouseup
            
        }, { once: true });
    });
};

const adjustOverlappingPoints = (draggedPoint, direction = null) => {
    const allPoints = Array.from(document.querySelectorAll('.point'));
    const shiftAmount = 50; // Amount to shift the points
    const rectLineContainer = lineContainer.getBoundingClientRect();
    const checked = new Set();

    // print chekced points data-index

    const adjustRecursive = (currentPoint, direction) => {
     
        
        // if (checked.has(currentPoint)) return;
        // checked.add(currentPoint);

        const currentRect = currentPoint.getBoundingClientRect();

        allPoints.forEach((otherPoint) => {
            
            if (currentPoint !== otherPoint && !checked.has(otherPoint)) {                 
                const otherRect = otherPoint.getBoundingClientRect();

                if (Math.abs(currentRect.left - otherRect.left) < 20) { // If points overlap (assuming point width is 20px)
                    const currentIndex = parseInt(currentPoint.getAttribute('data-index'), 10);
                    const otherIndex = parseInt(otherPoint.getAttribute('data-index'), 10);
                          
                    if (otherIndex === 0) { // Start point
                        // Shift current point to the right
                        currentPoint.style.transition = 'left 0.3s';
                        currentPoint.style.left = `${Math.min(parseFloat(currentPoint.style.left) + shiftAmount, rectLineContainer.width)}px`;
                        adjustLabelOverlap(currentPoint, otherPoint);

                        setTimeout(() => {
                            currentPoint.style.transition = '';
                            adjustRecursive(currentPoint, 'right');
                        }, 300);
                    } else if (otherIndex === 100) { // End point
                        // Shift current point to the left
                        currentPoint.style.transition = 'left 0.3s';
                        currentPoint.style.left = `${Math.max(parseFloat(currentPoint.style.left) - shiftAmount, 0)}px`;
                        adjustLabelOverlap(currentPoint, otherPoint);

                        setTimeout(() => {
                            currentPoint.style.transition = '';
                            adjustRecursive(currentPoint, 'left');
                        }, 300);
                    } else if (direction) { // Continue shifting other point in the same direction
                        if (direction === 'left') {
                            otherPoint.style.transition = 'left 0.3s';
                            otherPoint.style.left = `${Math.max(parseFloat(otherPoint.style.left) - shiftAmount, 0)}px`;
                            adjustLabelOverlap(otherPoint, currentPoint);

                            setTimeout(() => {
                                otherPoint.style.transition = '';
                                adjustRecursive(otherPoint, 'left');
                            }, 300);
                        } else if (direction === 'right') {
                                
                            otherPoint.style.transition = 'left 0.3s';
                            otherPoint.style.left = `${Math.min(parseFloat(otherPoint.style.left) + shiftAmount, rectLineContainer.width)}px`;
                            adjustLabelOverlap(otherPoint, currentPoint);

                            setTimeout(() => {
                                otherPoint.style.transition = '';
                                adjustRecursive(otherPoint, 'right');
                            }, 300);
                        }
                    } else {
                        // Shift both points in opposite directions
                        currentPoint.style.transition = 'left 0.3s';
                        otherPoint.style.transition = 'left 0.3s';
                        currentPoint.style.left = `${parseFloat(currentPoint.style.left) - shiftAmount}px`;
                        otherPoint.style.left = `${parseFloat(otherPoint.style.left) + shiftAmount}px`;
                       
                        adjustLabelOverlap(otherPoint, currentPoint);

                        setTimeout(() => {
                            otherPoint.style.transition = '';
                            currentPoint.style.transition = '';
                            adjustRecursive(currentPoint, 'left');
                            adjustRecursive(otherPoint, 'right');
                        }, 300);
                       
                         // Add the other point to the recursive check
                        

                    }

                    // Remove transition after animation
                    setTimeout(() => {
                        currentPoint.style.transition = '';
                    }, 300);
                }
            }
        });
    };

    adjustRecursive(draggedPoint, );
};

const adjustLabelOverlap = (currentPoint, otherPoint) => {
    // Adjust vertical line length to avoid label overlapping
    const currentLabelContainer = currentPoint.querySelector('.label-container');
    const currentLine = currentLabelContainer.querySelector('.line');
    const otherLabelContainer = otherPoint.querySelector('.label-container');
    const otherLine = otherLabelContainer.querySelector('.line');

    // Apply smooth transition for height change
    currentLine.style.transition = 'height 0.29s';

    const currentHeight = Math.ceil(parseFloat(getComputedStyle(currentLine).height));
    const otherHeight = Math.ceil(parseFloat(getComputedStyle(otherLine).height));

    //console.log('currnetHeight',currentHeight, otherHeight);

    if(Math.abs(currentHeight - otherHeight) < 5) 
        if(currentHeight === 50) 
            currentLine.style.height = '100px';
        else 
            currentLine.style.height = '50px';
        

    // Remove transition after animation
    setTimeout(() => {
        currentLine.style.transition = '';
        otherLine.style.transition = '';
    }, 300);
};
