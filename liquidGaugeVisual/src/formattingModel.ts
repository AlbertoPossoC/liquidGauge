import powerbi from "powerbi-visuals-api";

export function getGaugeSettings(dataView: any) {

    const objects = dataView?.metadata?.objects || {};

    return {
        fillColor: objects?.gaugeSettings?.fillColor?.solid?.color || "#178BCA",
        waveColor: objects?.gaugeSettings?.waveColor?.solid?.color || "#0E5A8A",
        textColor: objects?.gaugeSettings?.textColor?.solid?.color || "#FFFFFF",
        waveHeight: objects?.gaugeSettings?.waveHeight ?? 0.05,
        waveSpeed: objects?.gaugeSettings?.waveSpeed ?? 2000,
        showText: objects?.gaugeSettings?.showText ?? true
    };
}