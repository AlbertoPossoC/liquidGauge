import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
declare class GaugeSettingsCard extends FormattingSettingsCard {
    fillColor: formattingSettings.ColorPicker;
    waveColor: formattingSettings.ColorPicker;
    textColor: formattingSettings.ColorPicker;
    borderColor: formattingSettings.ColorPicker;
    borderWidth: formattingSettings.NumUpDown;
    waveHeight: formattingSettings.NumUpDown;
    waveSpeed: formattingSettings.NumUpDown;
    showText: formattingSettings.ToggleSwitch;
    showPercentage: formattingSettings.ToggleSwitch;
    maxValue: formattingSettings.NumUpDown;
    fontSize: formattingSettings.NumUpDown;
    fontFamily: formattingSettings.TextInput;
    fontWeight: formattingSettings.ToggleSwitch;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class VisualFormattingSettingsModel extends FormattingSettingsModel {
    gaugeSettings: GaugeSettingsCard;
    cards: GaugeSettingsCard[];
}
export {};
