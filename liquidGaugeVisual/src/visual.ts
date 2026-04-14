import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";

import { loadLiquidFillGauge } from "./liquidGauge";

import IVisual = powerbi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

export class Visual implements IVisual {
    private target: HTMLElement;

    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
    }

    public update(options: VisualUpdateOptions) {

        const dataView = options.dataViews?.[0];

        const value =
            dataView?.categorical?.values?.[0]?.values?.[0] ?? 50;

        const objects: any = dataView?.metadata?.objects;

        const config = {
            fillColor: objects?.gaugeSettings?.fillColor?.solid?.color || "#178BCA",
            waveColor: objects?.gaugeSettings?.waveColor?.solid?.color || "#0E5A8A",
            textColor: objects?.gaugeSettings?.textColor?.solid?.color || "#FFFFFF",
            waveHeight: objects?.gaugeSettings?.waveHeight ?? 0.05,
            waveSpeed: objects?.gaugeSettings?.waveSpeed ?? 2000,
            showText: objects?.gaugeSettings?.showText ?? true
        };

        this.target.innerHTML = "";

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", options.viewport.width.toString());
        svg.setAttribute("height", options.viewport.height.toString());

        this.target.appendChild(svg);

        loadLiquidFillGauge(svg, Number(value), config);
    }
}