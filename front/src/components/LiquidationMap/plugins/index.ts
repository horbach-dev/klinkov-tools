export const formatNumber = (num) => {
    if (!num) return num
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M';
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
}

export const drawLabelWithBox = (context, text, x, y, fontSize, fontColor, boxColor) => {
    context.save();
    context.font = `${fontSize}px Arial`;
    const textWidth = context.measureText(text.toString()).width;
    const textHeight = fontSize; // Примерная высота текста
    const padding = 6;
    const borderRadius = 4;

    // Рисуем скругленную рамку
    context.fillStyle = boxColor;
    context.beginPath();
    context.moveTo(x - textWidth / 2 - padding + borderRadius, y - textHeight / 2 - padding);
    context.lineTo(x + textWidth / 2 + padding - borderRadius, y - textHeight / 2 - padding);
    context.quadraticCurveTo(x + textWidth / 2 + padding, y - textHeight / 2 - padding, x + textWidth / 2 + padding, y - textHeight / 2 - padding + borderRadius);
    context.lineTo(x + textWidth / 2 + padding, y + textHeight / 2 + padding - borderRadius);
    context.quadraticCurveTo(x + textWidth / 2 + padding, y + textHeight / 2 + padding, x + textWidth / 2 + padding - borderRadius, y + textHeight / 2 + padding);
    context.lineTo(x - textWidth / 2 - padding + borderRadius, y + textHeight / 2 + padding);
    context.quadraticCurveTo(x - textWidth / 2 - padding, y + textHeight / 2 + padding, x - textWidth / 2 - padding, y + textHeight / 2 + padding - borderRadius);
    context.lineTo(x - textWidth / 2 - padding, y - textHeight / 2 - padding + borderRadius);
    context.quadraticCurveTo(x - textWidth / 2 - padding, y - textHeight / 2 - padding, x - textWidth / 2 - padding + borderRadius, y - textHeight / 2 - padding);
    context.closePath();
    context.fill();

    // Рисуем текст
    context.fillStyle = fontColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, x, y);
    context.restore();

    return {
        left: x - textWidth / 2 - padding,
        right: x + textWidth / 2 + padding,
        top: y - textHeight / 2 - padding,
        bottom: y + textHeight / 2 + padding,
    }
}

export const customTicksPlugin = {
    beforeDraw: (chart) => {
        const yScale = chart.scales.y;
        const y1Scale = chart.scales.y1;
        const xScale = chart.scales.x;
        const ctx = chart.ctx;

        y1Scale.ticks.forEach((tick, index) => {
            const y = y1Scale.getPixelForTick(index);
            drawLabelWithBox(ctx, formatNumber(tick.value), y1Scale.right + 20, y, 12, '#ffffff', 'rgba(21, 21, 20, 1)');
        });

        yScale.ticks.forEach((tick, index) => {
            const y = yScale.getPixelForTick(index);
            drawLabelWithBox(ctx, formatNumber(tick.value), yScale.left - 20, y, 12, '#ffffff', 'rgba(21, 21, 20, 1)');
        });

        xScale.ticks.forEach((tick, index) => {
            const x = xScale.getPixelForTick(index);
            drawLabelWithBox(ctx, tick.label, x + 25, xScale.top + 20, 12, '#ffffff', 'rgba(21, 21, 20, 1)');
        });
    }
}

export const crosshairPlugin = {
    afterInit(chart) {
        const canvas = chart.canvas;
        const crosshair = { x: null, y: null, label: null };
        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            const { chartArea: area } = chart;
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            // crosshair.x = x
            // crosshair.y = y

            if (!(area.left >= x - 5 || area.right <= x + 10 || area.top >= y - 5 || area.bottom <= y + 5) ) {
                crosshair.x = x
                crosshair.y = y
            } else {
                crosshair.x = null;
                crosshair.y = null;
                crosshair.label = null
            }
            // chart.draw();
        });
        canvas.addEventListener('mouseleave', () => {
            crosshair.x = null;
            crosshair.y = null;
            // chart.draw();
        });
        chart.crosshair = crosshair;
    },
    afterDraw(chart) {
        const { ctx, crosshair, chartArea: area, scales } = chart;
        if (crosshair.x === null || crosshair.y === null) return;

        ctx.save();
        ctx.strokeStyle = 'rgba(219, 180, 102, 1)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);

        // Ensure the crosshair stays within the chart area
        const x = Math.max(area.left, Math.min(crosshair.x, area.right));
        const y = Math.max(area.top, Math.min(crosshair.y, area.bottom));

        // Draw vertical line
        ctx.beginPath();
        ctx.moveTo(x, area. bottom);
        ctx.lineTo(x, y); // Draw up to 10px before the end
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, area.top);
        ctx.lineTo(x, y); // Draw up to 10px before the end
        ctx.stroke();

        // Draw horizontal line
        ctx.beginPath();
        ctx.moveTo(area.left + 35, y);
        ctx.lineTo(x - 10, y); // Draw up to 10px before the end
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(area.right, y);
        ctx.lineTo(x - 10, y); // Draw up to 10px before the end
        ctx.stroke();

        // // Draw circles at the end of lines
        // ctx.setLineDash([]);
        // ctx.beginPath();
        // ctx.arc(x, y, 3, 0, Math.PI * 2); // Circle at the intersection
        // ctx.fillStyle = 'rgba(219, 180, 102, 1)';
        // ctx.fill();

        // Convert pixel position to data values
        const xValue = scales.x.getValueForPixel(x);
        const yValue = scales.y.getValueForPixel(y);
        const y1Value = scales.y1.getValueForPixel(y);
        const labels = chart.data.labels;
        chart.crosshair.label = labels[xValue]
        // Draw x value at the bottom of the vertical line
        const xPosition = drawLabelWithBox(ctx, labels[xValue], x, area.bottom + 20, 12, 'rgba(219, 180, 102, 1)', 'rgba(6, 6, 4, 1)')
        // ctx.fillText(`${xValue}` , area.bottom + 20);

        // Draw y value at the left of the horizontal line
        const yPosition = drawLabelWithBox(ctx, parseFloat(yValue).toFixed(2), area.left - 10, y, 12, 'rgba(219, 180, 102, 1)', 'rgba(6, 6, 4, 1)')

        const y1Position = drawLabelWithBox(ctx, parseFloat(y1Value).toFixed(2), area.right + 10, y, 12, 'rgba(219, 180, 102, 1)', 'rgba(6, 6, 4, 1)')

        // Draw circles at the ends with values
        ctx.beginPath();
        ctx.arc(x, area.bottom, 3, 0, Math.PI * 2); // Circle at the bottom of the vertical line
        ctx.fillStyle = 'rgba(219, 180, 102, 1)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(yPosition.right, y, 3, 0, Math.PI * 2); // Circle at the left of the horizontal line
        ctx.fillStyle = 'rgba(219, 180, 102, 1)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(y1Position.left, y, 3, 0, Math.PI * 2); // Circle at the left of the horizontal line
        ctx.fillStyle = 'rgba(219, 180, 102, 1)';
        ctx.fill();

        ctx.arc(x, area.top, 3, 0, Math.PI * 2); // Circle at the bottom of the vertical line
        ctx.fillStyle = 'rgba(219, 180, 102, 1)';
        ctx.fill();

        ctx.restore();
    }
};

export const rangeZoomPlugin = {
    id: 'customCanvasBackgroundColor',
    afterInit(chart) {
        chart.rangeZoom = {
            isDragging: false,
            draggingRight: false,
            draggingLeft: false,
            circlePositionRight: 0,
            circlePositionLeft: 0,
            rangeMin: 0,
            rangeMax: 0,
        };
    },
    afterDatasetsDraw(chart, args, plugins) {
        const {ctx, chartArea: {left, top, bottom, right, width}} = chart;
        const { circlePositionRight, circlePositionLeft} = chart.rangeZoom

        chart.rangeZoom.circlePositionLeft = circlePositionLeft || left + 24;
        chart.rangeZoom.circlePositionRight = circlePositionRight || right - 25;

        const angle = Math.PI / 180;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(219, 180, 102, .3)';
        ctx.roundRect(left, bottom + 70, width, 10, 10);
        ctx.fill();

        // Left circle
        ctx.beginPath();
        ctx.fillStyle = 'rgba(219, 180, 102, 1)';
        ctx.arc(circlePositionLeft, bottom + 75, 10, 0, 360 * angle, false);
        ctx.fill();

        // Right circle
        ctx.beginPath();
        ctx.fillStyle = 'rgba(219, 180, 102, 1)';
        ctx.arc(circlePositionRight , bottom + 75, 10, 0, 360 * angle, false);
        ctx.fill();
    },
    afterUpdate(chart, args, plugins) {
        const { isDragging, draggingRight, draggingLeft, circlePositionRight, circlePositionLeft, rangeMin, rangeMax} = chart.rangeZoom
        const labels = chart.data.labels
        if (!rangeMax && labels?.length) {
            chart.rangeZoom.rangeMin = 0
            chart.rangeZoom.rangeMax = labels.length
        }

        const {min, max} = chart.scales.x;
        const {
            ctx, canvas, chartArea: {
                left, top, right, bottom, width
            }
        } = chart;
        chart.data.datasets[0].barPercentage = Math.max((chart.boxes[3].max - chart.boxes[3].min)/ 1500, 1)

        if (labels.length > 0 && !isDragging) {
            const valMin = (circlePositionLeft - left) / width * (labels.length - 1);
            const valMax = (circlePositionRight - left) / width * (labels.length - 1);
            chart.rangeZoom.rangeMin = Math.max(0, Math.min(min, max));
            chart.rangeZoom.rangeMax = Math.min(labels.length - 1, Math.max(min, max));

            chart.rangeZoom.circlePositionLeft = chart.rangeZoom.rangeMin / (labels.length - 1) * width + left;
            chart.rangeZoom.circlePositionRight = chart.rangeZoom.rangeMax / (labels.length - 1) * width + left;
        }

        chart.options.scales.x.min = chart.rangeZoom.rangeMin !== undefined ? chart.rangeZoom.rangeMin : min;
        chart.options.scales.x.max = chart.rangeZoom.rangeMax !== undefined ? chart.rangeZoom.rangeMax : max;
    },
    afterEvent(chart, args, plugins) {
        const { isDragging, draggingRight, draggingLeft, circlePositionRight, circlePositionLeft} = chart.rangeZoom
        const labels = chart.data.labels
        const {
            ctx, canvas, chartArea: {
                left, top, right, bottom, width
            }
        } = chart;

        canvas.addEventListener('mousedown', (e) => {
            const xPos = e.clientX - canvas.getBoundingClientRect().left;
            if (Math.abs(xPos - circlePositionLeft) < 10) {
                chart.rangeZoom.isDragging = true;
                chart.rangeZoom.draggingLeft = true;
            } else if (Math.abs(xPos - circlePositionRight) < 10) {
                chart.rangeZoom.isDragging = true;
                chart.rangeZoom.draggingRight = true;
            }
        });

        canvas.addEventListener('mouseup', (e) => {
            chart.rangeZoom.isDragging = false;
            chart.rangeZoom.draggingLeft = false;
            chart.rangeZoom.draggingRight = false;
        });

        if (args.event.type === 'mouseout') {
            chart.rangeZoom.isDragging = false;
            chart.rangeZoom.draggingLeft = false;
            chart.rangeZoom.draggingRight = false;
        }

        if (args.event.type === 'mousemove' && isDragging) {
            const xPos = args.event.x;
            const yPos = args.event.y;

            if (yPos < bottom + 40) {
                chart.rangeZoom.isDragging = false;
                chart.rangeZoom.draggingLeft = false;
                chart.rangeZoom.draggingRight = false;
            }

            if (draggingLeft) {
                chart.rangeZoom.circlePositionLeft = xPos < left ? left : xPos > circlePositionRight - 40 ? circlePositionRight - 40 : xPos;
            } else if (draggingRight) {
                chart.rangeZoom.circlePositionRight = xPos > right ? right : xPos < circlePositionLeft + 40 ? circlePositionLeft + 40 : xPos;
            }

            const valMin = (chart.rangeZoom.circlePositionLeft - left) / width * (labels.length - 1);
            const valMax = (chart.rangeZoom.circlePositionRight - left) / width * (labels.length - 1);
            chart.rangeZoom.rangeMin = Math.max(0, Math.min(valMin, valMax));
            chart.rangeZoom.rangeMax = Math.min(labels.length - 1, Math.max(valMin, valMax));

            args.changed = true;
            chart.update();
        }
    }
};

export const currentPricePlugin = {
    id: 'currentPricePlugin',
    afterInit(chart) {
        // chart.currentPriceIndex = 0;
    },
    afterDraw(chart, args, options) {
        const { ctx, chartArea: area, scales } = chart;
        const x = scales.x.getPixelForValue(options.currentPriceIndex);

        // console.log(options.currentPrice);
        // console.log(x);

        ctx.save();
        ctx.strokeStyle = 'rgba(255, 103, 86, 1)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);

        // Draw the dashed vertical line
        ctx.beginPath();
        ctx.moveTo(x, area.bottom);
        ctx.lineTo(x, area.top - 20); // Adjust the line to leave space for the arrow
        ctx.stroke();

        // Draw the arrow
        ctx.fillStyle = 'rgba(255, 103, 86, 1)';
        ctx.beginPath();
        ctx.moveTo(x, area.top - 25); // Bottom point of the arrow
        ctx.lineTo(x - 5, area.top - 17); // Left point of the arrow
        ctx.lineTo(x + 5, area.top - 17); // Right point of the arrow
        ctx.closePath();
        ctx.fill();

        // Draw the rounded rectangle with text
        const rectWidth = 169;
        const rectHeight = 40;
        const rectX = x - rectWidth / 2;
        const rectY = area.top - rectHeight - 30; // Adjust position above the arrow

        ctx.fillStyle = 'rgba(255, 103, 86, 1)';
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(rectX + 10, rectY); // Top left corner
        ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + rectHeight, 10); // Top right corner
        ctx.arcTo(rectX + rectWidth, rectY + rectHeight, rectX, rectY + rectHeight, 10); // Bottom right corner
        ctx.arcTo(rectX, rectY + rectHeight, rectX, rectY, 10); // Bottom left corner
        ctx.arcTo(rectX, rectY, rectX + rectWidth, rectY, 10); // Top left corner
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = 'rgba(6, 6, 4, 0.5)';
        ctx.fill();

        // // Draw the text in the center of the rectangle
        // ctx.fillStyle = 'white';
        // ctx.textAlign = 'center';
        // ctx.textBaseline = 'middle';
        // ctx.font = '16px Roboto Condensed';
        // const text = `Current Price ${options.currentPrice}`;
        // ctx.fillText(text, x, rectY + rectHeight / 2);

        // Draw the text in the center of the rectangle
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const text1 = 'Current Price';
        const text2 = options.currentPrice;
        const text1Width = ctx.measureText(text1).width;
        const padding = 8;
        // Draw first part of the text
        ctx.font = '16px Roboto Condensed';
        ctx.fillText(text1, x - (text1Width + padding) / 3, rectY + rectHeight / 2);
        // Draw second part of the text
        ctx.font = 'bold 16px Roboto Condensed';
        ctx.fillText(text2, x + (text1Width + padding) / 2, rectY + rectHeight / 2);


        ctx.restore();
    }
};
