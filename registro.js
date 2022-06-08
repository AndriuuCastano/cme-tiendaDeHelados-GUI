const { dinero, toFormat } = window.dinero.js;
const { COP } = window["@dinero.js/currencies"];

const checkEmpty = async () => {
  if (localStorage.salesRecords === undefined) {
    localStorage.setItem("salesRecords", JSON.stringify([]));
    console.log(localStorage.salesRecords);
  }
};

export const record = async (value, obs) => {

  let localLocale = moment();
  localLocale.locale("es");
  const transformer = ({ amount, currency }) => `$${amount} ${currency.code}`;
  const valueWithCurrency = dinero({ amount: value, currency: COP, scale: 0 });

  checkEmpty();
  console.log(localStorage.salesRecords);

  const newRecordArray = await JSON.parse(localStorage.salesRecords);
  newRecordArray.push({

    date: localLocale.format("DD MMM YY hh:mm a"),
    value: toFormat(valueWithCurrency, transformer),
    obs,

  });

  console.log(newRecordArray);

  localStorage.setItem("salesRecords", JSON.stringify(newRecordArray));

  showRecords();

};

const showRecords = async () => {

  let salesRecordsTable = document.getElementById("salesRecords");
  let recordsHTML = `
    <table class = "table table-striped w-auto">
        <thead>
            <th>Fecha</th>
            <th>Valor</th>
            <th>Descripcion</th>
        </thead>
        <tbody>
  `;

  
  console.log(localStorage.salesRecords);
  
  console.log(await JSON.parse(localStorage.salesRecords));

  if (localStorage.salesRecords) {

    (await JSON.parse(localStorage.getItem("salesRecords"))).forEach(
      (record) => {

        recordsHTML += `
                <tr         
                    data-bs-toggle = "tooltip" 
                    data-bs-placement = "bottom"
                    title = "${"error" }">

                    <td>${record.date}</td>

                    <td>${record.value}</td>

                    <td>${record.obs}</td>
                </tr>
            `;
      }
    );
    recordsHTML += `
            </tbody>
        </table>
    `;
    salesRecordsTable.innerHTML = recordsHTML;
  } else {
    salesRecordsTable.innerHTML = `<p class = "m-3">No hay registros</p>`;
  }
};

showRecords();

// Andres Fabian Castaño - Daniel Palma Ramirez