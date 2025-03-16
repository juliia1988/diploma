namespace GetResult.Ovum.backend.Models;

public class BasicRequestModel
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
}