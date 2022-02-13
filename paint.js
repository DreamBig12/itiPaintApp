
        var canvas = document.getElementById('canvas');
        var artArea = canvas.getContext('2d');
        var toolbar = document.getElementById('options');
        let drawB = document.getElementById('draw');
        let line = document.getElementById('line');
        let rect = document.getElementById('rect');
        let circ = document.getElementById('circ');
        let eras = document.getElementById('eras');




        let currentTool;

        var circFlag = false;
        var rectFlag = false;
        let ispainting = false;

        var width;
        var height;
        // Colors
        toolbar.addEventListener('change', e => {
            if (e.target.id === 'stroke') {
                artArea.strokeStyle = e.target.value;
            }
            if (e.target.id === 'fill-color') {
                artArea.fillColor = e.target.value;
            }
        });



        var drawFlag = false;
        draw.addEventListener("click", () => {

            currentTool = "draw";
            artArea.strokeStyle = "black";
            artArea.lineWidth = 2;
        });

        line.addEventListener("click", () => {
            currentTool = "line";
            artArea.strokeStyle = "black";
            artArea.lineWidth = 2;
        })

        circ.addEventListener("click", (e) => {

            currentTool = "circle";
            artArea.strokeStyle = "black";
            artArea.lineWidth = 2;
            
        });

        rect.addEventListener("click", (e) => {

            currentTool = "rectangle";
            artArea.strokeStyle = "black";
            artArea.lineWidth = 2;
            var canvasOffset = canvas.getBoundingClientRect();
            var offsetX = canvasOffset.left;
            var offsetY = canvasOffset.top;

            // this flage is true when the user is dragging the mouse
            var isDown = false;

            // these vars will hold the starting mouse position
            var startX;
            var startY;

            // var x1 = null
            // var x2 = null
            // var y1 = null
            // var y2 = null

            function handleMouseDown(e) {
                console.log('handleMouseDown')
                console.log(e)
                e.preventDefault();
                e.stopPropagation();

                // save the starting x/y of the rectangle
                startX = parseInt(e.clientX - offsetX);
                startY = parseInt(e.clientY - offsetY);

                // set a flag indicating the drag has begun
                isDown = true;
            }

            function handleMouseUp(e) {
                console.log('handleMouseUp')
                console.log(e)
                e.preventDefault();
                e.stopPropagation();

                // the drag is over, clear the dragging flag
                isDown = false;
                // console.log(x1, x2, y1, y2)

                artArea.strokeRect(startX, startY, width, height);
            }

            function handleMouseOut(e) {
                console.log('handleMouseOut')
                console.log(e)
                e.preventDefault();
                e.stopPropagation();

                // the drag is over, clear the dragging flag
                isDown = false;
            }

            function handleMouseMove(e) {
                console.log('handleMouseMove')
                console.log(e)
                e.preventDefault();
                e.stopPropagation();

                // if we're not dragging, just return
                if (!isDown) {
                    return;
                }

                // get the current mouse position
                mouseX = parseInt(e.clientX - offsetX);
                mouseY = parseInt(e.clientY - offsetY);

                // Put your mousemove stuff here

                // clear the canvas
                // artArea.clearRect(0, 0, canvas.width, canvas.height);

                // calculate the rectangle width/height based
                // on starting vs current mouse position
                width = mouseX - startX;
                height = mouseY - startY;

                // draw a new rect from the start position 
                // to the current mouse position

            }
            canvas.addEventListener('mousedown', (e) => {
                if (currentTool == "rectangle") {
                    handleMouseDown(e);
                }

            })

            document.getElementById('canvas').addEventListener('mousemove', function (e) {

                if (currentTool == "rectangle") {
                    handleMouseMove(e);
                }
            });
            document.getElementById('canvas').addEventListener('mouseup', function (e) {

                if (currentTool == "rectangle") {
                    handleMouseUp(e);;
                }
            });
            document.getElementById('canvas').addEventListener('mouseout', function (e) {

                if (currentTool == "rectangle") {
                    handleMouseOut(e);
                }
            });
        });

        eras.addEventListener("click", () => {

           currentTool = "draw";
           artArea.strokeStyle = "white";
            artArea.lineWidth = 5;
          
        })


        canvas.addEventListener('mousedown', (e) => {
            if (currentTool == "circle") {

                artArea.beginPath()
                artArea.arc(e.offsetX, e.offsetY, 40, 0, 2 * Math.PI)
                artArea.stroke()
            }

            else if (currentTool == "draw") {
                artArea.moveTo(e.offsetX, e.offsetY);
                drawFlag = true
            }
            else if (currentTool == "line") {
                artArea.moveTo(e.offsetX, e.offsetY);
                drawFlag = false
            }

        })


        canvas.addEventListener('mouseup', function (e) {
            if (currentTool == "draw") {
                drawFlag = false;
            }

            else if (currentTool == "line") {
                artArea.lineTo(e.offsetX, e.offsetY);

                artArea.stroke();
            }

        });
        canvas.addEventListener('mousemove', function (e) {
            if (currentTool == "draw") {
                if (drawFlag) {
                    
                    artArea.lineTo(e.offsetX, e.offsetY);
                    
                    artArea.stroke();
                }
            }

        });


       

            // canvas.addEventListener('mousedown', function (e) {

            //     artArea.moveTo(e.offsetX, e.offsetY);
            //     drawFlag2 = true;
            // });
            // canvas.addEventListener('mouseup', function (e) {
            //     drawFlag2 = false;

            // });
            // canvas.addEventListener('mousemove', function (e) {
            //     if (drawFlag2) {
            //         artArea.lineTo(e.offsetX, e.offsetY);
            //         artArea.stroke();
            //     }
            // });


    