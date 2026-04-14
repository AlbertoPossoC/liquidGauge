import * as d3 from "d3";

export function loadLiquidFillGauge(
    element: any,
    value: number,
    config: any
) {
    const width = element.clientWidth || 200;
    const height = element.clientHeight || 200;
    const radius = Math.min(width, height) / 2;

    const fillPercent = Math.max(0, Math.min(100, value)) / 100;

    const circleThickness = 0.05 * radius;
    const fillCircleRadius = radius - circleThickness;

    const waveHeight = fillCircleRadius * config.waveHeight;

    const svg = d3.select(element)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // fondo
    svg.append("circle")
        .attr("r", radius)
        .style("fill", config.fillColor);

    // texto
    if (config.showText) {
        svg.append("text")
            .text((value || 0).toFixed(0) + "%")
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .style("font-size", (radius / 2.5) + "px")
            .style("fill", config.textColor);
    }

    const waveData = [];
    for (let i = 0; i <= 40; i++) {
        waveData.push({ x: i / 40, y: i / 40 });
    }

    const waveClipWidth = fillCircleRadius * 2;

    const wave = d3.area<any>()
        .x(d => d.x * waveClipWidth - waveClipWidth / 2)
        .y0(d => Math.sin(d.y * 2 * Math.PI) * waveHeight)
        .y1(fillCircleRadius * 2);

    const clipId = "clipWave" + Math.random();

    const clipArea = svg.append("defs")
        .append("clipPath")
        .attr("id", clipId);

    const waveGroup = clipArea.append("path")
        .datum(waveData)
        .attr("d", wave);

    svg.append("circle")
        .attr("r", fillCircleRadius)
        .attr("clip-path", `url(#${clipId})`)
        .style("fill", config.waveColor);

    function animateWave() {
        waveGroup
            .attr("transform", `translate(0, ${fillCircleRadius * (1 - fillPercent)})`)
            .transition()
            .duration(config.waveSpeed)
            .ease(d3.easeLinear)
            .attr("transform", `translate(${waveClipWidth}, ${fillCircleRadius * (1 - fillPercent)})`)
            .on("end", animateWave);
    }

    animateWave();
}