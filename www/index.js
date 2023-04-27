let endpoint = "http://localhost:3000";
var xhttp;
var dataFeed;
$(document).ready(function () {
  xhttp = new XMLHttpRequest();
  renderTable();
});

const renderTable = () => {
  xhttp.open("GET", `${endpoint}/get_item`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = "";
      dataFeed = JSON.parse(this.responseText);
      for (let i = 0; i < dataFeed.data.length; i++) {
        var dataSt = JSON.stringify(dataFeed.data[i]);
        trHTML += "<tr>";
        trHTML += "<td>" + (i + 1) + "</td>";
        trHTML += "<td>" + dataFeed.data[i].name + "</td>";
        trHTML += "<td>" + dataFeed.data[i].price + "</td>";
        trHTML += "<td>" + dataFeed.data[i].quantity + "</td>";
        trHTML += "<td>" + dataFeed.data[i].description + "</td>";
        trHTML += "<td>";
        trHTML +=
          '<button type="button" class="btn btn-success" onclick="showModal(\'' +
          dataFeed.data[i]._id +
          "')\">View</button>&nbsp;";
        trHTML +=
          '<button type="button" class="btn btn-warning" onclick="showItemEditModel(\'' +
          dataFeed.data[i]._id +
          "')\">Edit</button>";
        trHTML += "</td>";
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
};

function showModal(id) {
  document.getElementById("contentData").innerHTML = "<p>Loading...</p>";
  $("#showModal").modal("show");
  xhttp.open("GET", `${endpoint}/get_item_by_id/${id}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      var pHTML = "";
      pHTML += `<p><strong>Name : </strong>${objects.data.name}</p>`;
      pHTML += `<p><strong>Price : </strong>${objects.data.price}</p>`;
      pHTML += `<p><strong>Quantity : </strong>${objects.data.quantity}</p>`;
      pHTML += `<p><strong>Description : </strong>${objects.data.description}</p>`;
      //   $("#contentData").append(pHTML);
      document.getElementById("contentData").innerHTML = pHTML;
    }
  };
}
function closef() {
  $("#showModal").modal("hide");
  $("#addDataModal").modal("hide");
}

function addDataModal() {
  $("#btnSaveAndUpdate").empty();
  $("#btnSaveAndUpdate").append(
    `<button type="submit" class="btn btn-primary" onclick="saveData()">Add</button>`
  );
  $("#inputName").val("");
  $("#inputPrice").val("");
  $("#inputQuantity").val("");
  $("#inputDescription").val("");
  $("#addDataModal").modal("show");
}

function saveData(id) {
  $("#errorForm").empty();
  var dataName = $("#inputName").val();
  var dataPrice = $("#inputPrice").val();
  var dataQuantity = $("#inputQuantity").val();
  var dataDescription = $("#inputDescription").val();

  if (
    dataName != "" &&
    dataPrice != "" &&
    dataDescription != "" &&
    dataQuantity != ""
  ) {
    if (id == undefined) {
      xhttp.open("POST", `${endpoint}/insert_item`);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(
        JSON.stringify({
          name: dataName,
          price: dataPrice,
          quantity: dataQuantity,
          description: dataDescription,
        })
      );
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const objects = JSON.parse(this.responseText);
          renderTable();
          closef();
        }
      };
    } else {
      xhttp.open("POST", `${endpoint}/update_item`);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(
        JSON.stringify({
          id: id,
          name: dataName,
          price: dataPrice,
          quantity: dataQuantity,
          description: dataDescription,
        })
      );
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const objects = JSON.parse(this.responseText);
          renderTable();
          closef();
        }
      };
    }
  } else {
    $("#errorForm").append(
      '<div class="alert alert-danger" role="alert">Please complete the information.</div>'
    );
  }
}

function showItemEditModel(id) {
  $("#btnSaveAndUpdate").empty();
  $("#btnSaveAndUpdate").append(
    '<button type="submit" class="btn btn-warning" onclick="saveData(\'' +
      id +
      "')\">Update</button>"
  );
  $("#errorForm").empty();
  var find = dataFeed.data.find((element) => element._id == id);
  $("#inputName").val(find != undefined ? find.name : "");
  $("#inputPrice").val(find != undefined ? find.price : "");
  $("#inputQuantity").val(find != undefined ? find.quantity : "");
  $("#inputDescription").val(find != undefined ? find.description : "");
  $("#addDataModal").modal("show");
}
