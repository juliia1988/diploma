using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using GetResult.Ovum.backend.Models;
using GetResult.Ovum.backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GetResult.Ovum.backend.Controllers;

[ApiController]
[Route("api/classification")]
public class ClassificationController : ControllerBase
{
    private readonly EggQualityClassifier _classifier;
    private readonly HttpClient _httpClient;

    public ClassificationController(HttpClient httpClient)
    {
        _classifier = new EggQualityClassifier();
        _httpClient = httpClient;
    }

    [HttpPost("basic")]
    public IActionResult ClassifyExtended([FromBody] BasicRequestModel request)
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

        return Ok(new { Group = group });
    }
    
    /// 🔹 **2. ДРУГИЙ ЕТАП**: ML API (22 параметри) якщо група = -1
    [HttpPost("advanced")]
    public async Task<IActionResult> ClassifyAdvanced([FromBody] AdvancedRequestModel request)
    {

        var jsonRequest = JsonSerializer.Serialize(request);

        var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

        try
        {
            var response = await _httpClient.PostAsync("http://127.0.0.1:8000/predict", content);
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();

            var mlResponse = JsonSerializer.Deserialize<MlResponseModel>(jsonResponse, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return Ok(new { Group = mlResponse?.Prediction });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Deserialization error", Details = ex.Message });
        }
    }
}

public class MlResponseModel
{
    [JsonPropertyName("prediction")]
    public int Prediction { get; set; }
}
