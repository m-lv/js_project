function getUserInput() {
    let elem = document.getElementById("fn-input");
    let text = elem.value;
    return text;
}


function parseFunction(text) {
    return function (x) {
        return eval(text);
    }
}


function generateData(func, x0, x1, dx) {
    let xs = ['x'];
    let ys = ['y'];

    for (let x = x0; x <= x1; x += dx) {
        let y = func(x);
        xs.push (x);
        ys.push (y);
    }

    return [xs, ys];
}


function buildChart(data) {
    let chart = c3.generate({
        bindto: '#chart',
        data: {
            x: 'x',
            columns: data,
            types: {
                y: 'line'
            }
        },
        axis: {
            x: {
                label: {
                    text: 'x',
                    position: 'outer-middle'
                },
                tick: {
                    format: d3.format("0.2f")
                }
            },
            y: {
                label: {
                    text: 'f(x)',
                    position: 'outer-middle'
                },
                tick: {
                    format: d3.format("0.2f")
                }
            }
        },
        grid: {
            x: {
                show: true
            },
            y: {
                show: true
            }
        }
    });
}


function go() {
    try {
        let text = getUserInput();
        let func = parseFunction(text);    
        let data = generateData(func, -10, 10, 0.1);
        buildChart(data);
    } catch (er) {
        alert (er);
    }
}
