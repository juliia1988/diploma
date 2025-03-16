namespace GetResult.Ovum.backend.Models;

public class MlRequestModel
{
    public MlRequestModel(ExtendedRequestModel request)
    {
        BetaHcg = request.I_beta_HCG_mIU_mL;
        Age = request.Age_yrs;
        Bmi = request.BMI;
        CycleLength = request.Cycle_length_days;
        CycleRi = request.Cycle_R_I;
        FastFood = request.Fast_food_Y_N;
        HairLoss = request.Hair_loss_Y_N;
        Hb = request.Hb_g_dl;
        Height = request.Height_Cm;
        Hip = request.Hip_inch;
        MarriageYears = request.Marraige_Status_Yrs;
        Prg = request.PRG_ng_mL;
        Pimples = request.Pimples_Y_N;
        PulseRate = request.Pulse_rate_bpm;
        Rbs = request.RBS_mg_dl;
        RegExercise = request.Reg_Exercise_Y_N;
        SkinDarkening = request.Skin_darkening_Y_N;
        VitD3 = request.Vit_D3_ng_mL;
        Waist = request.Waist_inch;
        Weight = request.Weight_Kg;
        WeightGain = request.Weight_gain_Y_N;
        HairGrowth = request.Hair_growth_Y_N;
    }

    public double BetaHcg { get; set; }
    public int Age { get; set; }
    public double Bmi { get; set; }
    public int CycleLength { get; set; }
    public int CycleRi { get; set; }
    public int FastFood { get; set; }
    public int HairLoss { get; set; }
    public double Hb { get; set; }
    public double Height { get; set; }
    public double Hip { get; set; }
    public int MarriageYears { get; set; }
    public double Prg { get; set; }
    public int Pimples { get; set; }
    public double PulseRate { get; set; }
    public double Rbs { get; set; }
    public int RegExercise { get; set; }
    public int SkinDarkening { get; set; }
    public double VitD3 { get; set; }
    public double Waist { get; set; }
    public double Weight { get; set; }
    public int WeightGain { get; set; }
    public int HairGrowth { get; set; }
}
