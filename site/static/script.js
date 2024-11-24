// document.querySelectorAll('.custom-button').forEach(button => {
//     button.addEventListener('click', function() {
//       const url = this.getAttribute('data-url');  // Получаем URL из атрибута data-url
  
//       fetch(url)
//         .then(response => response.json())  // Получаем ответ в формате JSON
//         .then(data => {
//           const randomNumberElement = document.getElementById('randomNumber');
//           randomNumberElement.textContent = `Случайное число: ${data.random_number}`;
//         })
//         .catch(error => {
//           console.error('Ошибка при получении числа:', error);
//         });
//     });
//   });

// const openModalButton = document.getElementById("openModalButton");
// const modal = document.getElementById("modal");
// const closeButton = document.querySelector(".close-button");

// // Открываем модальное окно при нажатии на кнопку
// openModalButton.addEventListener("click", () => {
//   modal.classList.add("show"); // Добавляем класс "show" для плавного отображения
// });

// // Закрываем модальное окно при нажатии на "×"
// closeButton.addEventListener("click", () => {
//   modal.classList.remove("show"); // Убираем класс "show" для плавного исчезновения
// });

const modal = document.getElementById("modal");
// const closeButton = document.querySelector(".close-button");
const modalTitle = document.querySelector(".login-title");
const modalForm = document.getElementById("modalForm");
const EnterLogin = document.querySelector('.enter-login')
const PasswordInput = document.getElementById('password-input')
const SwitchLoginButton = document.getElementById('switch-login-button')
const PLoginResult = document.getElementById('invalid-login-message');

// document.getElementById("openLoginModalButton").addEventListener("click", () => {
//     // modalTitle.textContent = "Вход";
//     // PasswordInput.setAttribute("type", "password-show");
//     // EnterLogin.textContent = 'Войти'
//     // modalForm.setAttribute("data-form-type", "login");
//     modal.classList.add("show");
// });

modal.classList.add("show")
setTimeout(() => {
      modal.classList.remove("show");  
  }, 200)

function clear_PResultLogin(PLoginResult) {
  PLoginResult.textContent = ''
  PLoginResult.style.paddingTop = "0px";
}

SwitchLoginButton.addEventListener("click", () => {
    modal.classList.add("show");

    setTimeout(() => {
      if (SwitchLoginButton.textContent === "Зарегистрироваться") {
        clear_PResultLogin(PLoginResult);
        modalForm.setAttribute("data-form-type", "register");
        modalTitle.textContent = "Регистрация";
        PasswordInput.setAttribute("type", "password-show");
        EnterLogin.textContent = 'Зарегистрироваться'
        SwitchLoginButton.textContent = "Войти"
      }
  
      else {
        modalForm.setAttribute("data-form-type", "login");
        modalTitle.textContent = "Вход";
        PasswordInput.setAttribute("type", "password");
        EnterLogin.textContent = 'Войти'
        SwitchLoginButton.textContent = "Зарегистрироваться"
      }

      modal.classList.remove("show");  
  }, 180)
});

// window.addEventListener("click", (event) => {
//   if (event.target == modal) {
//     modal.classList.remove("show"); // Убираем класс "show" при клике вне модального окна
//   }
// });

let isMouseDownOutside = false;

window.addEventListener("mousedown", (event) => {
  // Проверяем, начат ли клик вне модального окна
  if (event.target === modal) {
    isMouseDownOutside = true;
  } else {
    isMouseDownOutside = false;
  }
});

window.addEventListener("mouseup", (event) => {
  // Проверяем, завершён ли клик вне модального окна
  if (isMouseDownOutside && event.target === modal) {
    modal.classList.remove("show"); // Убираем класс "show"
  }
  isMouseDownOutside = false; // Сбрасываем флаг
});

// function resizeButtonText(button) {
//   const maxWidth = button.offsetWidth;
//   let fontSize = 16;  // начальный размер шрифта

//   // Уменьшаем размер шрифта до тех пор, пока текст не поместится
//   while (button.scrollWidth > maxWidth && fontSize > 10) {
//     fontSize--;
//     button.style.fontSize = `${fontSize}px`;
//   }
// }
