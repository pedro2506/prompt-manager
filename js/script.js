// Seletores principais
const titleInput = document.getElementById("promptTitle");
const textArea = document.getElementById("promptText");
const saveBtn = document.getElementById("savePromptBtn");
const copyBtn = document.getElementById("copyPromptBtn");
const newBtn = document.getElementById("newPromptBtn");
const removeBtn = document.getElementById("removePromptBtn");
const promptList = document.getElementById("promptList");

let prompts = JSON.parse(localStorage.getItem("prompts")) || [];
let currentIndex = null;

// Carregar lista ao abrir
renderPrompts();

// Criar novo
newBtn.addEventListener("click", () => {
  titleInput.value = "";
  textArea.value = "";
  currentIndex = null;
});

// Salvar
saveBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const text = textArea.value.trim();

  if (!title || !text) {
    alert("⚠️ Preencha título e texto antes de salvar!");
    return;
  }

  const newPrompt = { title, text };

  if (currentIndex !== null) {
    prompts[currentIndex] = newPrompt;
  } else {
    prompts.push(newPrompt);
  }

  localStorage.setItem("prompts", JSON.stringify(prompts));
  renderPrompts();
  alert("✅ Prompt salvo com sucesso!");
});

// Copiar
copyBtn.addEventListener("click", () => {
  const text = textArea.value.trim();
  if (!text) {
    alert("⚠️ Nada para copiar!");
    return;
  }
  navigator.clipboard.writeText(text);
  alert("📋 Prompt copiado!");
});

// Remover
removeBtn.addEventListener("click", () => {
  if (currentIndex === null) {
    alert("⚠️ Selecione um prompt para remover!");
    return;
  }

  const confirmDel = confirm("🗑️ Deseja realmente excluir este prompt?");
  if (!confirmDel) return;

  prompts.splice(currentIndex, 1);
  localStorage.setItem("prompts", JSON.stringify(prompts));
  renderPrompts();
  titleInput.value = "";
  textArea.value = "";
  currentIndex = null;
  alert("🗑️ Prompt removido!");
});

// Renderizar lista
function renderPrompts() {
  promptList.innerHTML = "";
  prompts.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = p.title;
    li.addEventListener("click", () => {
      titleInput.value = p.title;
      textArea.value = p.text;
      currentIndex = i;
    });
    promptList.appendChild(li);
  });
}
