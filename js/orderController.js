import { clearCart } from "./cart.js";
import { modalDeliveryContainer, modalDeliveryForm } from "./elements.js";

export const orderController = (getCart) => {
  const checkDelivery = () => {
    if (modalDeliveryForm.format.value === 'pickup') {
      modalDeliveryForm['address-info'].classList.add('modal-delivery__fieldset-input_hide');
    }

    if (modalDeliveryForm.format.value === 'delivery') {
      modalDeliveryForm['address-info'].classList.remove('modal-delivery__fieldset-input_hide');
    }
  };

  modalDeliveryForm.addEventListener('change', checkDelivery);

  modalDeliveryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(modalDeliveryForm);
    const data = Object.fromEntries(formData);
    data.order = getCart();
    console.log(data);
    fetch('https://reqres.in/api/users', {
      method: 'post',
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(response => {
        clearCart();
        // modalDeliveryForm.reset();
        // checkDelivery();

        modalDeliveryContainer.innerHTML = `
          <h2>Спасибо большое за заказ</h2>
          <h3>Ваш номер заказа ${response.id}</h3>
          <p>С вами в ближайшее время свяжется наш менеджер ${response.manager}</p>
          <p>Ваш заказ:</p>
        `;

        const ul = document.createElement('ul');
        data.order.forEach((item) => {
          ul.insertAdjacentHTML('beforeend', `<li>${item.id}</li>`);
        })

        modalDeliveryContainer.insertAdjacentElement('beforeend', ul);
      });
  });
};