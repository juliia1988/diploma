using System.Text.Json.Serialization;

namespace GetResult.Ovum.backend.Models;

// Для передачі даних в ML-сервіс
public class AdvancedRequestModel
{
    [JsonPropertyName("I_beta_HCG_mIU_mL")]
    public double BetaHCG { get; set; }

    [JsonPropertyName("Age_yrs")]
    public int Age { get; set; }

    [JsonPropertyName("BMI")]
    public double BMI { get; set; }

    [JsonPropertyName("Cycle_length_days")]
    public int CycleLength { get; set; }

    [JsonPropertyName("Cycle_R_I")]
    public int CycleRI { get; set; }

    [JsonPropertyName("Fast_food_Y_N")]
    public int FastFood { get; set; }

    [JsonPropertyName("Hair_loss_Y_N")]
    public int HairLoss { get; set; }

    [JsonPropertyName("Hb_g_dl")]
    public double Hb { get; set; }

    [JsonPropertyName("Height_Cm")]
    public double Height { get; set; }

    [JsonPropertyName("Hip_inch")]
    public double Hip { get; set; }

    [JsonPropertyName("Marraige_Status_Yrs")]
    public int MarriageYears { get; set; }

    [JsonPropertyName("PRG_ng_mL")]
    public double PRG { get; set; }

    [JsonPropertyName("Pimples_Y_N")]
    public int Pimples { get; set; }

    [JsonPropertyName("Pulse_rate_bpm")]
    public double PulseRate { get; set; }

    [JsonPropertyName("RBS_mg_dl")]
    public double RBS { get; set; }

    [JsonPropertyName("Reg_Exercise_Y_N")]
    public int RegularExercise { get; set; }

    [JsonPropertyName("Skin_darkening_Y_N")]
    public int SkinDarkening { get; set; }

    [JsonPropertyName("Vit_D3_ng_mL")]
    public double VitD3 { get; set; }

    [JsonPropertyName("Waist_inch")]
    public double Waist { get; set; }

    [JsonPropertyName("Weight_Kg")]
    public double Weight { get; set; }

    [JsonPropertyName("Weight_gain_Y_N")]
    public int WeightGain { get; set; }

    [JsonPropertyName("Hair_growth_Y_N")]
    public int HairGrowth { get; set; }
}