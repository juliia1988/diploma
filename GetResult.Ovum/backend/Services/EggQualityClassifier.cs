namespace GetResult.Ovum.backend.Services;

public class EggQualityClassifier
{
    public int Classify(double amh, double fsh, double lhFshRatio, int pcos, double estradiol, int afc, double prolactin, double glucose, int age)
    {
        // Група 0: СПКЯ або інші проблеми
        if (pcos == 1 || prolactin > 25 || glucose > 100)
        {
            return 0;
        }

        // Група 1: всі умови виконані
        if (amh > 1.5 && fsh >= 3 && fsh <= 10 && lhFshRatio < 2 && estradiol >= 50 && estradiol <= 200 && afc >= 5 && afc <= 10)
        {
            return 1;
        }

        // Група -1: невизначено
        if (amh <= 1.5 || age > 35)
        {
            return -1;
        }

        // Інші випадки належать до -1
        return -1;
    }
}
