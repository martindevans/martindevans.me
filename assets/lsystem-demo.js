var string = "X";
    var rules = {
        "X" : "F-[[X]+X]+F[+FX]-X",
        "F" : "FF"
    };
    
    function produce(input) {
        var output = "";
        for (var i = 0; i < input.length; i++) {
            var rule = rules[input[i]];
            if (rule) {
                output += rule;
            } else {
                output += input[i];
            }
        }
        return output;
    }
    
    var canvas = document.getElementById("lsystem");
    var context = canvas.getContext("2d");
    
    function draw(input) {
        context.clearRect(0, 0, canvas.width, canvas.height);   //Doesn't work!
        canvas.width = canvas.width;
        context.strokeStyle = "green";
        
        var stack = [];
        var state = {
            X: canvas.offsetWidth / 2,
            Y: canvas.offsetHeight,
            Angle: -Math.PI / 2,
        }
        
        function drawForward() {
            context.moveTo(state.X, state.Y);
            state.X = state.X + Math.cos(state.Angle) * 3;
            state.Y = state.Y + Math.sin(state.Angle) * 3;
            context.lineTo(state.X, state.Y);
            context.stroke();
        }
        
        for (var i = 0; i < input.length; i++) {
            var c = input[i];
            if (c == 'F') {
                drawForward();
            } else if (c == '-') {
                state.Angle -= 1 * (0.2 + Math.random() * 0.8);   //Turn left 25 degrees
            } else if (c == '+') {
                state.Angle += 1 * (0.2 + Math.random() * 0.8);   //Turn right 25 degrees
            } else if (c == '[') {
                stack.push({
                    X: state.X,
                    Y: state.Y,
                    Angle: state.Angle
                });
            } else if (c == ']') {
                state = stack.pop();
            }
        }
    }
    
    setInterval(function()
    {
        var str = string;
        for (var i = 0; i < 5; i++) {
            str = produce(str);
        }
        draw(str);
    }, 1000);