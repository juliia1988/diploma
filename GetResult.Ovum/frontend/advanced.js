document.addEventListener("DOMContentLoaded", function () {
    console.log("Advanced form script loaded!");

    const advancedForm = document.getElementById("advancedForm");

    if (advancedForm) {
        console.log("Advanced form found, adding event listener...");

        advancedForm.addEventListener("submit", async function (e) {
            e.preventDefault(); // Зупиняємо оновлення сторінки
            console.log("Advanced form submitted!");

            const submitButton = document.querySelector("#advancedForm button[type='submit']");
            const loadingSpinner = document.getElementById("loadingAdvanced");
            const resultDiv = document.getElementById("resultAdvanced");

            if (!submitButton || !loadingSpinner || !resultDiv) {
                console.error("❌ Не знайдені потрібні елементи для обробки!");
                return;
            }

            // Отримуємо значення з форми
            const data = {
                I_beta_HCG_mIU_mL: parseFloat(document.getElementById("I_beta_HCG_mIU_mL").value),
                Age_yrs: parseInt(document.getElementById("Age_yrs").value),
                BMI: parseFloat(document.getElementById("BMI").value),
                Cycle_length_days: parseInt(document.getElementById("Cycle_length_days").value),
                Cycle_R_I: parseInt(document.getElementById("Cycle_R_I").value),
                Fast_food_Y_N: parseInt(document.getElementById("Fast_food_Y_N").value),
                Hair_loss_Y_N: parseInt(document.getElementById("Hair_loss_Y_N").value),
                Hb_g_dl: parseFloat(document.getElementById("Hb_g_dl").value),
                Height_Cm: parseFloat(document.getElementById("Height_Cm").value),
                Hip_inch: parseFloat(document.getElementById("Hip_inch").value),
                Marraige_Status_Yrs: parseInt(document.getElementById("Marraige_Status_Yrs").value),
                PRG_ng_mL: parseFloat(document.getElementById("PRG_ng_mL").value),
                Pimples_Y_N: parseInt(document.getElementById("Pimples_Y_N").value),
                Pulse_rate_bpm: parseFloat(document.getElementById("Pulse_rate_bpm").value),
                RBS_mg_dl: parseFloat(document.getElementById("RBS_mg_dl").value),
                Reg_Exercise_Y_N: parseInt(document.getElementById("Reg_Exercise_Y_N").value),
                Skin_darkening_Y_N: parseInt(document.getElementById("Skin_darkening_Y_N").value),
                Vit_D3_ng_mL: parseFloat(document.getElementById("Vit_D3_ng_mL").value),
                Waist_inch: parseFloat(document.getElementById("Waist_inch").value),
                Weight_Kg: parseFloat(document.getElementById("Weight_Kg").value),
                Weight_gain_Y_N: parseInt(document.getElementById("weightGain").value),
                Hair_growth_Y_N: parseInt(document.getElementById("hairGrowth").value),
            };

            console.log("📩 Надсилаємо дані у правильному форматі:", JSON.stringify(data, null, 2));

            try {
                loadingSpinner.classList.remove("d-none");
                submitButton.disabled = true;
                resultDiv.classList.add("d-none");

                console.log("🚀 Відправляємо запит до API...");

                const response = await fetch("http://localhost:5233/api/classification/advanced", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                const textResponse = await response.text();
                console.log("🔄 Відповідь API:", textResponse);

                if (!response.ok) {
                    throw new Error(`HTTP Error ${response.status}: ${textResponse}`);
                }

                const resultData = JSON.parse(textResponse);
                console.log("✅ Отримана відповідь від сервера:", resultData);

                loadingSpinner.classList.add("d-none");
                submitButton.disabled = false;
                resultDiv.classList.remove("d-none", "alert-danger", "alert-success");

                let resultText = "";
                let alertClass = "";

                if (resultData.group === 1) {
                    alertClass = "alert-success";
                    resultText = `
                        <strong>🟢 Висока ймовірність якісної яйцеклітини!</strong><br>
                        Всі показники в нормі. Ваш гормональний баланс підходить для забору яйцеклітини.
                    `;
                } else {
                    alertClass = "alert-danger";
                    resultText = `
                        <strong>🔴 Недостатня якість яйцеклітини.</strong><br>
                        Ваші показники свідчать про можливі гормональні порушення.
                    `;
                }

                resultDiv.classList.add(alertClass);
                resultDiv.innerHTML = resultText;

            } catch (error) {
                console.error("❌ Error:", error);
                loadingSpinner.classList.add("d-none");
                submitButton.disabled = false;
                resultDiv.classList.remove("d-none", "alert-success");
                resultDiv.classList.add("alert-danger");
                resultDiv.innerHTML = `⚠️ Error: ${error.message}`;
            }
        });
    } else {
        console.error("❌ Advanced form not found!");
    }
});
