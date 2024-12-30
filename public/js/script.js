/**
 * @license Apache-2.0
 * @copyright 2024 seniordevforch
 */

'use strict';

(function () {

  /**
   * counter
   */
  const /** {HTMLElement} */ $decrementBtn = document.querySelector('[data-decrement-btn]');
  const /** {HTMLElement} */ $incrementBtn = document.querySelector('[data-increment-btn]');
  const /** {HTMLElement} */ $counterField = document.querySelector('[data-counter-field]');
  const /** {HTMLElement} */ $total = document.querySelector('[data-total]');
  const /** {Number} */ minValue = 1;
  const /** {Number} */ maxValue = 999;


  /**
   * increment 
   */
  $incrementBtn.addEventListener('click', function () {
    const currentValue = $counterField.value;
    if (currentValue < maxValue) $counterField.value = Number(currentValue) + 1;
    updateTotal.call($counterField);
  });


  /**
   * decrement
   */
  $decrementBtn.addEventListener('click', function () {
    const currentValue = $counterField.value;
    $counterField.value = currentValue > minValue ? Number(currentValue) - 1 : currentValue;
    updateTotal.call($counterField);
  });


  const updateTotal = function () {
    $total.textContent = this.value;
  }

  $counterField.addEventListener('input', updateTotal.bind($counterField));


  /**
   * contribute form
   */

  const contributeForm = document.querySelector('[data-contribute-form]');
  const submitBtn = document.querySelector('[data-submit-btn]');

  contributeForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {

      submitBtn.setAttribute('disabled', '');

      const formFields = document.querySelectorAll('[data-form-field]');

      const formData = {}

      formFields.forEach(item => {
        formData[item.getAttribute('name')] = item.value.trim();
      });

      const response = await fetch(window.location.origin + '/checkout', {
        method: 'POST',
        body: new URLSearchParams(formData).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        window.location.href = responseData.result.url;
      } else {
        console.error('Form submission failed:', response.statusText);
      }

    } catch (error) {

      console.error(error);
      throw error;

    } finally {

      submitBtn.removeAttribute('disabled');

    }
  });

})();