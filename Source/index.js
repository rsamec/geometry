import { Runtime } from "https://unpkg.com/@observablehq/notebook-runtime?module";

const main = document.getElementById("Result");
document.getElementById("SubmitButton").addEventListener('click', (e) => {

  e.preventDefault();
  const inputs = document.getElementById("ExamCodeInput").value.split("|");
  console.log(document.getElementById("ExamCodeInput").value,inputs);

  import(`https://api.observablehq.com/@rsamec/${inputs[0]}.js`)
    .then((module) => {
      const notebook = module.default;
      const resultEl = document.getElementById("Result");
      resultEl.innerHTML = "";
      const cells = inputs.slice(1);
      Runtime.load(notebook, (variable) => {
        var cellOrder = cells.indexOf(variable.name);
        if (cellOrder !== -1) return {
          fulfilled: (value) => {
            value.style.order = cellOrder;
            resultEl.appendChild(value)
          }
        };
      });
    })
    .catch((err) => {
      main.textContent = err.message;
    });

});  