/*using System.Text;
using System.Text.Json;
using GetResult.Ovum.backend.Models;
using GetResult.Ovum.backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GetResult.Ovum.backend.Controllers;

[ApiController]
[Route("api/classification")]
public class ClassificationController_old : ControllerBase
{
    private readonly EggQualityClassifier _classifier;
    private readonly HttpClient _httpClient;

    public ClassificationController_old(HttpClient httpClient)
    {
        _classifier = new EggQualityClassifier();
        _httpClient = httpClient;
    }

    [HttpPost("basic")]
    public async Task<IActionResult> ClassifyExtended([FromBody] ExtendedRequestModel request)
    {
        var group = _classifier.Classify(
            request.Amh,
            request.Fsh,
            request.LhFsh,
            request.Pcos,
            request.Estradiol,
            request.Afc,
            request.Prl,
            request.Glucose,
            request.Age
        );

        // Якщо бізнес-логіка визначає -1, то не звертаємось до ML-моделі
        if (group == -1)
        {
            return Ok(new { Group = -1 });
        }

        // Якщо визначено як 0 або 1, передаємо вхідні параметри у ML-сервіс
        var mlRequest = new MlRequestModel(request);
        var jsonRequest = JsonSerializer.Serialize(mlRequest);
        var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

        try
        {
            var response = await _httpClient.PostAsync("http://127.0.0.1:8000/predict", content);
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var mlResponse = JsonSerializer.Deserialize<MlResponseModel>(jsonResponse);

            return Ok(new { Group = mlResponse.Prediction });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "ML service error", Details = ex.Message });
        }
    }
}

public class MlResponseModel
{
    public int Prediction { get; set; }
}*/