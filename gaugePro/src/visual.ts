"use strict";

import powerbi from "powerbi-visuals-api";
import { loadLiquidFillGauge } from "./liquidGauge";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {

    private target: HTMLElement;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;

    constructor(options: VisualConstructorOptions) {
        this.formattingSettingsService = new FormattingSettingsService();
        this.target = options.element;
    }

    public update(options: VisualUpdateOptions) {

        if (!options.dataViews || !options.dataViews[0]) return;

        this.formattingSettings =
            this.formattingSettingsService.populateFormattingSettingsModel(
                VisualFormattingSettingsModel,
                options.dataViews[0]
            );

        const settings = this.formattingSettings.gaugeSettings;

        const value =
            options.dataViews[0]?.categorical?.values?.[0]?.values?.[0] ?? 0;

        const config = {
            fillColor: settings.fillColor.value.value,
            waveColor: settings.waveColor.value.value,
            textColor: settings.textColor.value.value,
            borderColor: settings.borderColor.value.value,
            borderWidth: settings.borderWidth.value,
            showText: settings.showText.value,
            showPercentage: settings.showPercentage.value,
            fontSize: settings.fontSize.value,
            fontFamily: settings.fontFamily.value,
            fontWeight: settings.fontWeight.value,
            maxValue: settings.maxValue.value
        };

        this.target.innerHTML = "";

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", options.viewport.width.toString());
        svg.setAttribute("height", options.viewport.height.toString());

        this.target.appendChild(svg);

        loadLiquidFillGauge(svg, Number(value), config);
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}