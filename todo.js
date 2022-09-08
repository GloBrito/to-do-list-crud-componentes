var app = new Vue({
  el: "#app",
  data: {
    message: "Olá Vue!",
    tasks: [],
    modoAdicionar: false,
    modoEditar: false,
    att: 0,
    criacao: {
      user: "",
      dueTo: null,
      project: "",
      title: "",
    },
  },
  methods: {
    getTasks() {
      fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((tarefasJson) => {
          console.log(tarefasJson);
          this.tasks = tarefasJson;
        });
    },
    excluir(id) {
      console.log(id);
      fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" }).then(
        () => {
          this.getTasks();
        }
      );
    },
    criarNovaTask() {
      if (this.modoAdicionar == false) {
        this.modoAdicionar = true;
      } else {
        this.modoAdicionar = false;
      }
    },
    salvar() {
      fetch(
        `http://localhost:3000/tasks/`,
        {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(this.criacao),
        },
        (this.modoAdicionar = false)
      ).then(() => {
        this.getTasks();
      });
    },
    abrirEditar(id) {
      this.att = id;
      if (this.modoEditar == false) {
        this.modoEditar = true;
      } else {
        this.modoEditar = false;
        // this.modoEditar = !this.modoEditar;
      }
    },
    salvarEditar() {
      fetch(
        `http://localhost:3000/tasks/${this.att}`,
        {
          method: "PATCH",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(this.criacao),
        },
        (this.modoEditar = false)
      ).then(() => {
        this.getTasks();
      });
      // this.modoEditar = false;
    },
  },
  created() {
    console.log("created");
    this.getTasks();
  },
  mounted() {
    console.log("montend");
  },
});
