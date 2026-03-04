async function loadMaterials() {
  const grade = "Grade 12";
  const subject = "Science";

  const res = await fetch(`/api/materials/${grade}/${subject}`);
  const data = await res.json();

  const container = document.getElementById("materialsContainer");
  container.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>Type: ${item.type}</p>
      <a href="/uploads/${item.file}" target="_blank">Open</a>
      <hr>
    `;

    container.appendChild(div);
  });
}

loadMaterials();
