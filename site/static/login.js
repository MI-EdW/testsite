// async function submitForm(event) {
//     event.preventDefault();
//     const login = document.getElementById("login").value;
//     const password = document.getElementById("password").value;
//     const formType = document.getElementById("modalForm").getAttribute("data-form-type");

//     const route = formType === "register" ? "/register" : "/login";

//     try {
//         const response = await fetch(route, {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({ login, password })
//         });
//         const result = await response.json();
//         alert(result.message);
//     } catch (error) {
//         alert("Ошибка: " + error.message);
//     }
// }

async function submitForm(event) {
    event.preventDefault();
    const login = document.getElementById("login-input").value;
    const password = document.getElementById("password-input").value;
    const formType = document.getElementById("modalForm").getAttribute("data-form-type");
    const PResultLogin = document.getElementById('invalid-login-message');

    const route = formType === "register" ? "/register" : "/login";

    const response = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password })
    });

    const result = await response.json(); // Парсим JSON-ответ

    if (result.status === "success") {
        // Выполняем код для успешного входа
        alert(result.message);
        console.log("Данные пользователя:", result.user_data);
        // Например, перенаправляем пользователя:
        window.location.href = "/";
    }
    
    else if (result.status === "error") {
        // Выполняем код для ошибки
        PResultLogin.textContent = result.message;
        PResultLogin.style.paddingTop = "5px";
    }
}