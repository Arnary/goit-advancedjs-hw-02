import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
form.addEventListener("submit", handlerSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function handlerSubmit(event) {
  event.preventDefault();

  const firstDelay = Number(form.elements.delay.value);
  const delayStep = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + delayStep * i;
    createPromise(position, delay).then(({ position, delay }) => {
    iziToast.success({
      position: "topRight",
      message: `Fulfilled promise ${position} in ${delay}ms`,
    });
    }).catch(({ position, delay }) => {
      iziToast.error({
        position: "topRight",
        message: `Rejected promise ${position} in ${delay}ms`,
      });
    });
  };
  form.reset();
};
