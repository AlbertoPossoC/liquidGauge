import * as d3 from "d3";

export function loadLiquidFillGauge(element: any, value: number, config: any) {

    const width = element.clientWidth || 200;
    const height = element.clientHeight || 200;
    const radius = Math.min(width, height) / 2;

    const maxValue = config.maxValue || 100;
    const percent = Math.max(0, Math.min(maxValue, value)) / maxValue;

    const fillRadius = radius * 0.9;

    const svg = d3.select(element)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // ========================
    // DEFINICIONES
    // ========================
    const defs = svg.append("defs");

    // CLIP CIRCULAR (CLAVE)
    const clipId = "clipCircle";

    defs.append("clipPath")
        .attr("id", clipId)
        .append("circle")
        .attr("r", fillRadius);

    // Gradiente fondo
    const bgGradient = defs.append("radialGradient")
        .attr("id", "bgGradient");

    bgGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ffffff");

    bgGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", config.fillColor);

    // Gradiente líquido
    const liquidGradient = defs.append("linearGradient")
        .attr("id", "liquidGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

    liquidGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d3.color(config.waveColor)?.brighter(0.7)?.toString());

    liquidGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", config.waveColor);

    // ========================
    // CÍRCULO BASE
    // ========================
    svg.append("circle")
        .attr("r", radius)
        .style("fill", "url(#bgGradient)")
        .style("stroke", config.borderColor)
        .style("stroke-width", config.borderWidth);

    // ========================
    // FORMA DEL LÍQUIDO (SUAVE)
    // ========================
    const level = fillRadius * (1 - percent * 2);

    const data = d3.range(200).map(i => ({
        x: i / 100,
        y: Math.sin(i / 100 * Math.PI)
    }));

    const area = d3.area<any>()
        .x(d => (d.x - 0.5) * fillRadius * 2)
        .y0(d => level + Math.sin(d.x * Math.PI * 2) * (radius * 0.02))
        .y1(fillRadius);

    svg.append("path")
        .datum(data)
        .attr("d", area)
        .attr("clip-path", `url(#${clipId})`) // 🔥 CLAVE
        .style("fill", "url(#liquidGradient)");

    // ========================
    // REFLEJO INDUSTRIAL
    // ========================
    svg.append("ellipse")
        .attr("cx", -radius * 0.2)
        .attr("cy", -radius * 0.3)
        .attr("rx", radius * 0.5)
        .attr("ry", radius * 0.2)
        .style("fill", "white")
        .style("opacity", 0.15);

    // ========================
    // TEXTO DINÁMICO
    // ========================
    if (config.showText) {

        // 🔥 tamaño automático basado en el radio
        const autoFontSize = radius / 2.8;

        // 🔥 si el usuario define tamaño, usa ese
        const finalFontSize = config.fontSize && config.fontSize > 0
            ? config.fontSize
            : autoFontSize;

        svg.append("text")
            .text(
                config.showPercentage
                    ? ((percent * 100).toFixed(0) + "%")
                    : value.toFixed(0)
            )
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .style("font-size", finalFontSize + "px")
            .style("fill", config.textColor)
            .style("font-family", config.fontFamily || "Segoe UI")
            .style("font-weight", config.fontWeight ? "bold" : "normal");
    }
}