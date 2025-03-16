namespace GetResult.Ovum.backend.Models;

public class ExtendedRequestModel
{
    // Параметри для бізнес-логіки
    public double Amh { get; set; }
    public double Fsh { get; set; }
    public double LhFsh { get; set; }
    public int Pcos { get; set; }
    public double Estradiol { get; set; }
    public int Afc { get; set; }
    public double Prl { get; set; }
    public double Glucose { get; set; }
    public int Age { get; set; }
    
    // Параметри для ML-моделі
    public double I_beta_HCG_mIU_mL { get; set; }
    public int Age_yrs { get; set; }
    public double BMI { get; set; }
    public int Cycle_length_days { get; set; }
    public int Cycle_R_I { get; set; }
    public int Fast_food_Y_N { get; set; }
    public int Hair_loss_Y_N { get; set; }
    public double Hb_g_dl { get; set; }
    public double Height_Cm { get; set; }
    public double Hip_inch { get; set; }
    public int Marraige_Status_Yrs { get; set; }
    public double PRG_ng_mL { get; set; }
    public int Pimples_Y_N { get; set; }
    public double Pulse_rate_bpm { get; set; }
    public double RBS_mg_dl { get; set; }
    public int Reg_Exercise_Y_N { get; set; }
    public int Skin_darkening_Y_N { get; set; }
    public double Vit_D3_ng_mL { get; set; }
    public double Waist_inch { get; set; }
    public double Weight_Kg { get; set; }
    public int Weight_gain_Y_N { get; set; }
    public int Hair_growth_Y_N { get; set; }
}
