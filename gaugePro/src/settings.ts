"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

class GaugeSettingsCard extends FormattingSettingsCard {

    fillColor = new formattingSettings.ColorPicker({
        name: "fillColor",
        displayName: "Color fondo",
        value: { value: "#178BCA" }
    });

    waveColor = new formattingSettings.ColorPicker({
        name: "waveColor",
        displayName: "Color ola",
        value: { value: "#0E5A8A" }
    });

    textColor = new formattingSettings.ColorPicker({
        name: "textColor",
        displayName: "Color texto",
        value: { value: "#FFFFFF" }
    });

    borderColor = new formattingSettings.ColorPicker({
        name: "borderColor",
        displayName: "Color borde",
        value: { value: "#000000" }
    });

    borderWidth = new formattingSettings.NumUpDown({
        name: "borderWidth",
        displayName: "Grosor borde",
        value: 3
    });

    waveHeight = new formattingSettings.NumUpDown({
        name: "waveHeight",
        displayName: "Altura ola",
        value: 0.05
    });

    waveSpeed = new formattingSettings.NumUpDown({
        name: "waveSpeed",
        displayName: "Velocidad",
        value: 2000
    });

    showText = new formattingSettings.ToggleSwitch({
        name: "showText",
        displayName: "Mostrar texto",
        value: true
    });

    showPercentage = new formattingSettings.ToggleSwitch({
        name: "showPercentage",
        displayName: "Mostrar como %",
        value: true
    });

    maxValue = new formattingSettings.NumUpDown({
        name: "maxValue",
        displayName: "Valor máximo",
        value: 100
    });

    fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Tamaño texto",
        value: 0
    });

    fontFamily = new formattingSettings.TextInput({
        name: "fontFamily",
        displayName: "Fuente",
        value: "Segoe UI",
        placeholder: "Ej: Segoe UI, Arial, Roboto"
    });
    
    fontWeight = new formattingSettings.ToggleSwitch({
        name: "fontWeight",
        displayName: "Negrita",
        value: true
    });

    name = "gaugeSettings";
    displayName = "Gauge PRO TEST";

    slices: Array<FormattingSettingsSlice> = [
        this.fillColor,
        this.waveColor,
        this.textColor,
        this.borderColor,
        this.borderWidth,
        this.waveHeight,
        this.waveSpeed,
        this.showText,
        this.showPercentage,
        this.fontSize,
        this.fontFamily,
        this.fontWeight,
        this.maxValue
    ];
}

export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    gaugeSettings = new GaugeSettingsCard();
    cards = [this.gaugeSettings];
}