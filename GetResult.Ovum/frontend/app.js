document.getElementById("predictionForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = document.querySelector("#predictionForm button[type='submit']");
    const loadingSpinner = document.getElementById("loading");
    const resultDiv = document.getElementById("result");

    const Amh = parseFloat(document.getElementById("amh").value);
    const Fsh = parseFloat(document.getElementById("fsh").value);
    const Pcos = parseInt(document.getElementById("pcos").value);
    
    const LhFsh = parseFloat(document.getElementById("lh_fsh").value) || 0;
    const Estradiol = parseFloat(document.getElementById("estradiol").value) || 0;
    const Afc = parseInt(document.getElementById("afc").value) || 0;
    const Prl = parseFloat(document.getElementById("prl").value) || 0;
    const Glucose = parseFloat(document.getElementById("glucose").value) || 0;
    const Age = parseInt(document.getElementById("age").value) || 0;

    if (isNaN(Amh) || isNaN(Fsh) || isNaN(Pcos)) {
        alert("AMH, FSH та PCOS є обов'язковими полями!");
        return;
    }

    const data = { Amh, Fsh, Pcos, LhFsh, Estradiol, Afc, Prl, Glucose, Age };

    try {
        loadingSpinner.classList.remove("d-none");
        submitButton.disabled = true;
        resultDiv.classList.add("d-none");

        const response = await fetch("http://localhost:5233/api/classification/basic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const textResponse = await response.text();
        console.log("Raw response:", textResponse);

        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${textResponse}`);
        }

        const resultData = JSON.parse(textResponse);

        loadingSpinner.classList.add("d-none");
        submitButton.disabled = false;
        resultDiv.classList.remove("d-none", "alert-danger", "alert-warning", "alert-success");

        let resultText = "";
        let alertClass = "";

        // 🔹 Група 1 (якісна яйцеклітина)
        if (resultData.group === 1) {
            alertClass = "alert-success";
            resultText = `
                <strong>🟢 Висока ймовірність якісної яйцеклітини!</strong><br>
                Всі показники в нормі. Ваш гормональний баланс підходить для забору яйцеклітини.
            `;
        }
        // 🔹 Група 0 (низька якість)
        else if (resultData.group === 0) {
            alertClass = "alert-danger";
            resultText = `
                <strong>🔴 Низька якість яйцеклітини.</strong><br>
                Ваші показники свідчать про можливі гормональні порушення. Рекомендується консультація з лікарем.
            `;
        }
        // 🔹 Група -1 (невизначено)
        else {
            alertClass = "alert-warning";
            resultText = `
                <strong>🟡 Неможливо визначити якість яйцеклітини.</strong><br>
                Деякі показники виходять за межі очікуваних значень. Можливо, потрібно додаткове тестування.<br>
                <button id="advancedTestButton" class="btn btn-outline-primary mt-2">🔎 Додаткове тестування</button>
            `;
        }

        resultDiv.classList.add(alertClass);
        resultDiv.innerHTML = resultText;

        // 🔹 Додаємо слухача подій для кнопки "Додаткове тестування"
        setTimeout(() => {
            const advancedTestButton = document.getElementById("advancedTestButton");
            if (advancedTestButton) {
                advancedTestButton.addEventListener("click", () => {
                    window.location.href = "advanced.html"; // 🔹 Перенаправлення на Advanced форму
                });
            }
        }, 100);

    } catch (error) {
        console.error("Error:", error);
        loadingSpinner.classList.add("d-none");
        submitButton.disabled = false;
        resultDiv.classList.remove("d-none", "alert-success", "alert-warning");
        resultDiv.classList.add("alert-danger");
        resultDiv.innerHTML = `⚠️ Error: ${error.message}`;
    }
});

// Обробник для форми Advanced
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Loaded, script running...");

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

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            console.log("📩 Надсилаємо дані:", data);

            // Перетворюємо всі числові значення
            Object.keys(data).forEach(key => {
                if (!isNaN(data[key])) {
                    data[key] = parseFloat(data[key]);
                }
            });

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


